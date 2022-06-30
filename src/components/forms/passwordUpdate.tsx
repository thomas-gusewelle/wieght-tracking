import { useState, useContext, FormEvent } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { WeightContext } from "../../providers/weight-context";
import BtnModalSubmit from "../buttons/btnModalSubmit";

import FormTextItem from "./formTextItem";
import { PasswordField } from "./passwordField";

export default function PasswordEditForm({ onClose }) {
  const context = useContext(WeightContext);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({ state: false, message: "" });
  const [confirmError, setConfirmError] = useState({
    state: false,
    message: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError({
        state: true,
        message: "Passwords Require Greater than 6 Characters",
      });
      return;
    } else {
      setError({ state: false, message: "" });
    }
    if (password != passwordConfirm) {
      setConfirmError({ state: true, message: "Passwords Do Not Match" });
      return;
    } else {
      setConfirmError({ state: false, message: "" });
    }

    const { data, error } = await supabase.auth.update({ password: password });
    if (error) {
      alert(error.message);
      return;
    }
    context.getUserProfile();
    onClose();
  };

  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col'>
        <PasswordField
          id={"password"}
          error={error}
          getter={password}
          setter={setPassword}
          labelTitle={"New Password"}
        />
        <PasswordField
          labelTitle={"Confirm New Password"}
          error={confirmError}
          id={"confirm-password"}
          getter={passwordConfirm}
          setter={setPasswordConfirm}
        />
        <BtnModalSubmit />
      </form>
    </>
  );
}
