import { useState, useContext, FormEvent, useEffect } from "react";
import { WeightContext } from "../../providers/weight-context";
import { supabase } from "../../../utils/supabaseClient";

export const WeightGoalForm = ({ onClose }) => {
  const weightContext = useContext(WeightContext);
  const [weight, setWeight] = useState<any>(
    weightContext.profile.target_weight
  );
  const [weightError, setWeightError] = useState({ state: false, message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (weight == weightContext.profile.target_weight) {
      onClose();
      return;
    }

    if (weight == 0 || isNaN(weight)) {
      setWeightError({ state: true, message: "Please Enter A Target Weight" });
      return;
    } else {
      setWeightError({ state: false, message: "" });
    }

    const { data, error } = await supabase
      .from("profile")
      .update({ target_weight: weight })
      .eq("id", weightContext.profile.id);

    if (error) {
      alert(error.message);
      return;
    }
    weightContext.getUserProfile();
    onClose();
  };

  return (
    <div>
      <h3 className='text-center text-white text-3xl mb-4'>
        {"Update Your Weight"}
      </h3>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label className='text-gray-200'>Weight</label>
        <input
          className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
            weightError.state && "border-red-500 border-2"
          }`}
          type='number'
          id='weight'
          step={0.01}
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
        <span className='text-red-500'>
          {weightError.state && weightError.message}
        </span>
        <button
          className='mt-6 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2'
          type='submit'>
          Sumbit
        </button>
      </form>
      <button
        onClick={onClose}
        className='w-full mt-4 text-lg text-white font-semibold bg-red-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2'>
        {" "}
        Cancel
      </button>
    </div>
  );
};
