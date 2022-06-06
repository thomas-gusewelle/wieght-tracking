import { useState, useContext, useEffect, FormEvent } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { WeightContext } from "../../providers/weight-context";
import { WeightContextStruct } from "../../interfaces/weightContext";
import FormTextItem from "./formTextItem";
import BtnModalSubmit from "../buttons/btnModalSubmit";
import ConfirmForm from "./confirmForm";

const NameForm = ({ onClose }) => {
  const weightContext = useContext(WeightContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const [firstName, setFirstName] = useState(weightContext.profile.first_name);
  const [firstNameError, setFirstNameError] = useState({
    state: false,
    message: "",
  });

  const [lastName, setLastName] = useState(weightContext.profile.last_name);
  const [lastNameError, setLastNameError] = useState({
    state: false,
    message: "",
  });

  const handleSubmitToConfirm = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleNameConfirm = async (e: FormEvent) => {
    e.preventDefault();
    if (
      firstName == weightContext.profile.first_name &&
      lastName == weightContext.profile.last_name
    ) {
      onClose();
      return;
    }

    const { data, error } = await supabase
      .from("profile")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", weightContext.profile.id);
    if (error) console.error(error);
    weightContext.getUserProfile();
    onClose();
  };

  return (
    <div className=''>
      {!showConfirm ? (
        <form className='flex flex-col' onSubmit={handleSubmitToConfirm}>
          <FormTextItem
            id={"firstName"}
            labelTitle={"First Name"}
            error={firstNameError}
            getter={firstName}
            setter={setFirstName}
          />
          <FormTextItem
            id={"lastName"}
            labelTitle={"Last Name"}
            error={lastNameError}
            getter={lastName}
            setter={setLastName}
          />
          <BtnModalSubmit />
        </form>
      ) : (
        <ConfirmForm
          message={`Are you sure you want to change your name to ${
            firstName + " " + lastName
          }?`}
          btnText={"Confirm"}
          onConfirm={handleNameConfirm}
        />
      )}
    </div>
  );
};

export default NameForm;
