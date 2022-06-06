import { Profile } from "./profile";
import { WeightData } from "./weightData";

export interface WeightContextStruct {
  profile: Profile;
  isLoading: boolean;
  labels: number[];
  numberOfWeightDays: number;
  postedToday: boolean;
  reversedUserData: WeightData[];
  targetWeight: number;
  userData: WeightData[];
  weights: number[];
  setPostedToday: Function;
  getUserWeights: Function;
  currentWeight: number;
  setIsLoading: Function;
  getUserProfile: Function;
}
