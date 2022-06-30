import { WeightData } from "../interfaces/weightData";
import { supabase } from "../../utils/supabaseClient";
import { Profile } from "../interfaces/profile";

export async function poundsToKilos(data: WeightData[]) {
  const conversionRate = 0.453;
  data.forEach(async (e) => {
    let convertedWeight = parseFloat((e.weight * conversionRate).toFixed(1));
    const { data, error } = await supabase
      .from("weight")
      .update({ weight: convertedWeight, weight_type: "kgs" })
      .match({ id: e.id, weight_type: "lbs" });
    if (error) {
      alert(`${error.message} Please try again`);
      return;
    }
  });
}

export async function kilosToPounds(data: WeightData[]) {
  const conversionRate = 2.204;
  data.forEach(async (e) => {
    let convertedWeight = parseFloat((e.weight * conversionRate).toFixed(1));
    const { data, error } = await supabase
      .from("weight")
      .update({ weight: convertedWeight, weight_type: "lbs" })
      .match({ id: e.id, weight_type: "kgs" });
    if (error) {
      alert(`${error.message} Please try again`);
      return;
    }
  });
}

export async function convertProfile(weightType: string, profile: Profile) {
  if (weightType == "lbs") {
    const conversionRate = 2.204;
    let convertedWeight = Math.round(profile.target_weight * conversionRate);
    console.log(convertedWeight);
    const { data, error } = await supabase
      .from("profile")
      .update({ target_weight: convertedWeight, weight_type: weightType })
      .eq("id", profile.id);
    if (error) {
      alert(error.message);
    }
    return;
  }
  if (weightType == "kgs") {
    const conversionRate = 0.453;
    let convertedWeight = Math.round(profile.target_weight * conversionRate);
    console.log(convertedWeight);
    const { data, error } = await supabase
      .from("profile")
      .update({ target_weight: convertedWeight, weight_type: weightType })
      .eq("id", profile.id);
    if (error) {
      alert(error.message);
    }
  }
  return;
}
