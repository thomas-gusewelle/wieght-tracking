import { WeightData } from "../interfaces/weightData";

import { supabase } from "../../utils/supabaseClient";

export async function poundsToKilos(data: WeightData[]) {
  const conversionRate = 0.453;
  data.forEach(async (e) => {
    let convertedWeight = e.weight * conversionRate;
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

export function kilosToPounds(data: WeightData[]) {
  const conversionRate = 2.204;
  data.forEach(async (e) => {
    let convertedWeight = e.weight * conversionRate;
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
