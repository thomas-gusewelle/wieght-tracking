import { useContext } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { WeightContext } from "../../providers/weight-context";
import { YesNoForm } from "./yesNoForm";

export const ShowTargetForm = ({ onClose }) => {
  const context = useContext(WeightContext);

  const handleYes = async () => {
    //early return for same value in database
    if (context.profile.show_target_weight) return;
    const { data, error } = await supabase
      .from("profile")
      .update({ show_target_weight: true })
      .eq("id", context.profile.id);
    if (error) {
      alert(error.message);
      return;
    }
    context.getUserProfile();
    onClose();
  };

  const handleNo = async () => {
    // early return for same value in database
    if (!context.profile.show_target_weight) return;
    const { data, error } = await supabase
      .from("profile")
      .update({ show_target_weight: false })
      .eq("id", context.profile.id);
    if (error) {
      alert(error.message);
      return;
    }
    context.getUserProfile();
    onClose();
  };
  return (
    <>
      <YesNoForm
        onConfirm={handleYes}
        onDecline={handleNo}
        message={"Would You Like to show your target weight on the graph?"}
        btnText={"Yes"}
      />
    </>
  );
};
