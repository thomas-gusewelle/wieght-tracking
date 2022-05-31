import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";

import { WeightContext } from "../src/providers/weight-context";

import WeightHistory from "../src/components/dashboard/weight-history";
import { CircularProgress } from "@mui/material";

const History = () => {
  const router = useRouter();
  const weightContext = useContext(WeightContext);

  return (
    <div className='wrapper'>
      {weightContext.isLoading ? (
        <div className='wrapper flex justify-center items-center text-green-500'>
          <CircularProgress color='inherit' />
        </div>
      ) : (
        <WeightHistory
          data={weightContext.reversedUserData}
          getUserWeights={weightContext.getUserWeights}
          setIsLoading={weightContext.setIsLoading}
        />
      )}
      {/* <button 
            className="text-white bg-red-500"
            onClick={() => setIsLoading(!isLoading)}>isLoading</button> */}
    </div>
  );
};

export default History;
