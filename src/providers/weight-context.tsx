import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import { Profile } from "../interfaces/profile";
import { WeightContextStruct } from "../interfaces/weightContext";

export const WeightContext = createContext<WeightContextStruct>({
  profile: {
    id: "",
    first_name: "",
    last_name: "",
    target_weight: null,
    weight_type: "lbs",
    show_target_weight: false,
  },
  isLoading: true,
  labels: [],
  numberOfWeightDays: null,
  postedToday: false,
  reversedUserData: [
    {
      id: null,
      created_at: null,
      weight: null,
      user_id: null,
      weight_type: null,
    },
  ],
  targetWeight: null,
  userData: [
    {
      id: null,
      created_at: null,
      weight: null,
      user_id: null,
      weight_type: null,
    },
  ],
  weights: [],
  setPostedToday: () => {},
  getUserWeights: () => {},
  currentWeight: null,
  setIsLoading: () => {},
  getUserProfile: () => {},
});

const WeightContextProvider = (props: any) => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState<Profile>(undefined);
  const [postedToday, setPostedToday] = useState(false);
  const [userData, setUserData] = useState([]);
  const [reversedUserData, setReversedUserData] = useState([]);

  const [labels, setLabels] = useState([]);
  const [weights, setWeights] = useState([]);
  const [lossPercentage, setLossPercentage] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const [numberOfWeightDays, setNumberOfWeightDays] = useState(1);

  const userWeights = [];

  const listenSession = () => {
    supabase.auth.onAuthStateChange((event, sesson) => {
      console.log(event);
      if (event.toString() == "SIGNED_IN") {
        getUserProfile();
      }
      if (event.toString() == "SIGNED_OUT") {
        router.push("/");
        setProfile(undefined);
        setPostedToday(false);
        setUserData([]);
        setReversedUserData([]);
        setLabels([]);
        setWeights([]);
        setCurrentWeight(0);
        setTargetWeight(0);
        setNumberOfWeightDays(1);
        setIsLoading(true);
      }
    });
  };

  useEffect(() => {
    listenSession();
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    if (supabase.auth.user() === null) {
      router.push("/");
      return;
    }
    const userId = supabase.auth.user().id;
    const user = await supabase.from("profile").select().eq("id", userId);
    setProfile(user.data[0]);
  };

  useEffect(() => {
    if (profile != undefined) {
      setTargetWeight(profile.target_weight);
      getUserWeights();
    }
  }, [profile]);

  const getUserWeights = async () => {
    const labels = [];

    let { data, error } = await supabase
      .from("weight")
      .select()
      .eq("user_id", supabase.auth.user().id);

    data = sortByDate(data);
    setUserData(data);
    let mostRecentPost = data.slice(-1);
    getPostedToday(mostRecentPost);

    data.forEach((log) => {
      let singlePostDate = new Date(log.created_at);
      labels.push(singlePostDate.getDate());
      userWeights.push(log.weight);
    });

    getUserPercentage(userWeights);
    getDaysPast(data);

    setLabels(labels);
    setWeights(userWeights);

    let reversedData = data.reverse();
    setReversedUserData(reversedData);

    setIsLoading(false);
  };

  const sortByDate = (data) => {
    data = data.sort((a, b) => {
      var firstTime = new Date(a.created_at);
      var lastTime = new Date(b.created_at);
      return firstTime.getTime() - lastTime.getTime();
    });
    return data;
  };

  const getPostedToday = async (post) => {
    const postDate = new Date(post[0].created_at);
    const todayDate = new Date();
    if (
      postDate.getDate() === todayDate.getDate() &&
      postDate.getMonth() === todayDate.getMonth() &&
      postDate.getFullYear() === todayDate.getFullYear()
    ) {
      setPostedToday(true);
    } else {
      setPostedToday(false);
    }
  };

  const getDaysPast = (_userWeights) => {
    const firstPost = new Date(_userWeights[0].created_at);
    let [lastPost] = _userWeights.slice(-1);
    lastPost = new Date(lastPost.created_at);

    const firstDate = new Date(
      firstPost.getFullYear(),
      firstPost.getMonth(),
      firstPost.getDate()
    );
    const lastDate = new Date(
      lastPost.getFullYear(),
      lastPost.getMonth(),
      lastPost.getDate()
    );

    const differenceInTime = lastDate.getTime() - firstDate.getTime();
    const numberOfDays = differenceInTime / (1000 * 3600 * 24);

    setNumberOfWeightDays(numberOfDays);
  };

  const getUserPercentage = (_weights: number[]) => {
    let [lastWeight] = _weights.slice(-1);

    const userPercentage = 100 - (profile.target_weight / lastWeight) * 100;
    setLossPercentage(userPercentage);
    setCurrentWeight(lastWeight);
  };

  return (
    <WeightContext.Provider
      value={{
        profile,
        userData,
        reversedUserData,
        postedToday,
        setPostedToday,
        labels,
        weights,
        getUserWeights,
        currentWeight,
        targetWeight,
        numberOfWeightDays,
        isLoading,
        setIsLoading,
        getUserProfile,
      }}>
      {props.children}
    </WeightContext.Provider>
  );
};

export { WeightContextProvider };
