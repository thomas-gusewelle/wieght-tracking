import { useState, useContext, useEffect, FormEvent } from "react";
import { WeightContext } from "../../providers/weight-context";
import { WeightContextStruct } from "../../interfaces/weightContext";
import FormTextItem from "./formTextItem";
import BtnModalSubmit from "../buttons/btnModalSubmit";

const NameForm = ({}) => {
  const weightContext = useContext(WeightContext);

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
  };

  return (
    <div>
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
    </div>
  );
};

export default NameForm;
