import { FormEvent, useState, useContext } from "react";
import WeightTypeSwitch from "../switches/weight-type-switch";
import BtnConfirm from "../buttons/btnConfirm";
import { YesNoForm } from "./yesNoForm";
import { WeightContext } from "../../providers/weight-context";
import {
  convertProfile,
  kilosToPounds,
  poundsToKilos,
} from "../../services/convertWeight";
import { supabase } from "../../../utils/supabaseClient";

export const WeightTypeChange = ({ onClose }) => {
  const weightContext = useContext(WeightContext);
  const [weightType, setWeightType] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const switchConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (weightType == weightContext.profile.weight_type) {
      onClose();
      return;
    }
    setShowConfirm(true);
  };

  const onConfirm = async () => {
    if (weightType == "kgs") {
      await poundsToKilos(weightContext.userData);
      await convertProfile(weightType, weightContext.profile);
      weightContext.getUserProfile();
      onClose();
      return;
    }
    if (weightType == "lbs") {
      await kilosToPounds(weightContext.userData);
      await convertProfile(weightType, weightContext.profile);
      weightContext.getUserProfile();
      onClose();
      return;
    }
  };

  const onDecline = async () => {
    const { data, error } = await supabase
      .from("profile")
      .update({ weight_type: weightType })
      .eq("id", weightContext.profile.id);
    weightContext.getUserProfile();
    onClose();
  };

  return (
    <>
      {!showConfirm ? (
        <div>
          <label className='text-white'>Weight Type</label>
          <WeightTypeSwitch
            setWeightType={setWeightType}
            weightType={weightContext.profile.weight_type}
          />
          <BtnConfirm onConfirm={switchConfirm} text={"Submit"} />
        </div>
      ) : (
        <YesNoForm
          onConfirm={onConfirm}
          onDecline={onDecline}
          message={`Would you like to convert all of your exisitng weights to ${
            weightType == "lbs" ? "pounds?" : "kilograms? "
          }`}
          btnText={"Yes"}
        />
      )}
    </>
  );
};
