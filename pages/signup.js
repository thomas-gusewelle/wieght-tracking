import { useRouter } from "next/router";
import { useState } from 'react';
import { supabase } from "../utils/supabaseClient";
import EmailPassword from "./components/signup/email-password";

import NameSignup from "./components/signup/name"
import StepCounter from "./components/signup/step-couter";
import Weight from "./components/signup/weight"

const SignUp = () => {
  const router = useRouter();

  const [signUpState, setSignUpState] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentWeight, setCurrentWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);

  const handleSubmit = async () => {
   
   
   const { user, error } = await supabase.auth.signUp({
       email,
       password,
   });
   console.log(user);
   if (error){
       alert(JSON.stringify(error));
       return
   } else {
   const setProfile = await supabase
    .from('profile')
    .insert([
      { id: user.id, first_name: firstName, last_name: lastName, target_weight: targetWeight }
    ])

    const setFirstWeight = await supabase
      .from('weight')
      .insert([
        {weight: currentWeight, user: user.id}
      ])
      router.push('/signin')

    }
  };

  const signUpStateUp = () => {
    
    setSignUpState(signUpState + 1); 
    
  }
  const signUpStateDown = (e) => {
    e.preventDefault();
  setSignUpState(signUpState -1);
  }
  
    switch (signUpState) {
      case 1: 
        return (
          <div className="wrapper">
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
            <div className="wrapper">
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
              <div className="wrapper">
                <StepCounter signUpState={signUpState}></StepCounter>
                <Weight
                  handleSubmit={handleSubmit}
                  signUpStateDown={signUpStateDown}
                  currentWeight={currentWeight}
                  setCurrentWeight={setCurrentWeight}
                  targetWeight={targetWeight}
                  setTargetWeight={setTargetWeight}
                />
              </div>
            );
          

          default: 
            return(
              <div></div>
            );
    }
    

  
}

export default SignUp