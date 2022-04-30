import { supabase } from "../utils/supabaseClient"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";

import WeightHistory from "./components/dashboard/weight-history"
import { CircularProgress } from "@mui/material";

const History = () => {
    const router = useRouter();
    

    const [userData, setUserData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);



const getUserWeights = async () => {
    const {data, error} = await supabase
    .from('weight')
    .select()
    .eq('user_id', supabase.auth.user().id);

    data = data.reverse();

    setUserData(data);
    setIsLoading(false);
}

useEffect(() => {
    const user = supabase.auth.user();
    if (!user){
        router.push('/signin');
    }

    getUserWeights()
},[])

    return (
        <div className="wrapper">
            {isLoading
            ? <div className="wrapper flex justify-center items-center text-green-500">

                <CircularProgress color="inherit"/>
            </div>
            : <WeightHistory
                data={userData}
                getUserWeights={getUserWeights}
                setIsLoading={setIsLoading}
            />
            }
            {/* <button 
            className="text-white bg-red-500"
            onClick={() => setIsLoading(!isLoading)}>isLoading</button> */}
        </div>
    )
}

export default History