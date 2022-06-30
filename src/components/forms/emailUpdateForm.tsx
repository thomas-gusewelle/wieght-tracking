import { FormEvent, useState, useContext } from "react";
import { supabase } from "../../../utils/supabaseClient";

import BtnModalSubmit from "../buttons/btnModalSubmit";
import FormEmailItem from "./formEmailItem";
import Alert from "../alert";

const EmailUpdateForm = ({ onClose, setShowAlert, setAlertMessage }) => {
  const [email, setEmail] = useState("");
  const [emailConfrim, setEmailConfrim] = useState("");
  const [emailError, setEmailError] = useState({ state: false, message: "" });
  const [emailConfirmError, setEmailConfirmError] = useState({
    state: false,
    message: "",
  });

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let check = checkError();
    if (check) return;
    const { user, error } = await supabase.auth.update({ email: email });
    if (error) {
      console.log(error.message);
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }
    onClose();
  };

  const checkError = () => {
    console.log("here");
    if (!email.match(mailFormat)) {
      setEmailError({ state: true, message: "Please Enter a Valid Email" });
      return true;
    } else {
      setEmailError({ state: false, message: "" });
    }
    if (email != emailConfrim) {
      setEmailConfirmError({
        state: true,
        message: "Emails Do Not Match",
      });
      return true;
    } else {
      setEmailConfirmError({ state: false, message: "" });
    }
    return false;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <FormEmailItem
          id={"email"}
          error={emailError}
          getter={email}
          setter={setEmail}
          labelTitle={"Email"}
        />
        <FormEmailItem
          labelTitle={"Confirm Email"}
          error={emailConfirmError}
          id={"confirm-email"}
          getter={emailConfrim}
          setter={setEmailConfrim}
        />
        <BtnModalSubmit />
      </form>
    </>
  );
};

export default EmailUpdateForm;
