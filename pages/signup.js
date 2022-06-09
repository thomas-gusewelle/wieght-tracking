import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import EmailPassword from "../src/components/signup/email-password";

import NameSignup from "../src/components/signup/name";
import StepCounter from "../src/components/signup/step-couter";
import Weight from "../src/components/signup/weight";

const SignUp = () => {
  const router = useRouter();

  const [signUpState, setSignUpState] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentWeight, setCurrentWeight] = useState();
  const [targetWeight, setTargetWeight] = useState();
  const [weightType, setWeightType] = useState("lbs");

  useEffect(() => {
    console.log(weightType);
  }, [weightType]);

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(JSON.stringify(error));
      return;
    } else {
      const setProfile = await supabase.from("profile").insert([
        {
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          target_weight: targetWeight,
          weight_type: weightType,
        },
      ]);

      const setFirstWeight = await supabase
        .from("weight")
        .insert([{ weight: currentWeight, user_id: user.id }]);

      router.push("/dashboard");
    }
  };

  const signUpStateUp = () => {
    setSignUpState(signUpState + 1);
  };
  const signUpStateDown = (e) => {
    e.preventDefault();
    setSignUpState(signUpState - 1);
  };

  switch (signUpState) {
    case 1:
      return (
        <div className='wrapper'>
          <StepCounter signUpState={signUpState}></StepCounter>
          <NameSignup
            signUpStateUp={signUpStateUp}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
          />
        </div>
      );

    case 2:
      return (
        <div className='wrapper'>
          <StepCounter signUpState={signUpState}></StepCounter>
          <EmailPassword
            signUpStateUp={signUpStateUp}
            signUpStateDown={signUpStateDown}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      );

    case 3:
      return (
        <div className='wrapper'>
          <StepCounter signUpState={signUpState}></StepCounter>
          <Weight
            handleSubmit={handleSubmit}
            signUpStateDown={signUpStateDown}
            currentWeight={currentWeight}
            setCurrentWeight={setCurrentWeight}
            targetWeight={targetWeight}
            setTargetWeight={setTargetWeight}
            setWeightType={setWeightType}
          />
        </div>
      );

    default:
      return <div></div>;
  }
};

export default SignUp;
