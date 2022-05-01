import { useEffect } from "react"
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient"

import {AnimatePresence, motion} from "framer-motion"

import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js'

import WeightForm from "./components/forms/weight-form";
import Modal from "./components/modal";
import Alert from "./components/alert"
import LoadingScreen from "./components/loading-screen";
import WeightHistory from "./components/dashboard/weight-history";



ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, annotationPlugin);


const Dashboard = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    

    const [profile, setProfile] = useState({});
    const [postedToday, setPostedToday] = useState(false);
    const [userData, setUserData] = useState([]);

    //const [showTargetLine, setShowTargetLine] = useState(false);

    const [labels, setLabels] = useState([]);
    const [weights, setWeights] = useState([]);
    const [lossPercentage, setLossPercentage] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [targetWeight, setTargetWeight] = useState(0);
    const [numberOfWeightDays, setNumberOfWeightDays] = useState(1);

    const userWeights = [];

    useEffect(() =>  {
        getUserProfile();
        

        
    }, []);

    const getUserProfile = async () => {
        if (supabase.auth.user() === null) {
            router.push('/signin');
            return 
    }
        const userId = supabase.auth.user().id;
        const user = await supabase.from('profile').select().eq('id', userId);
        setProfile(user.data[0])  
        
    }

    useEffect(() => {
        if(profile != undefined){
            setTargetWeight(profile.target_weight)
            getUserWeights();
        }
        
    },[profile])

    const getUserWeights = async () => {
        const labels = []

        const { data, error } = await supabase.from('weight').select().eq('user_id', supabase.auth.user().id);
 History-Feature
        setUserData(data);

        
main
        let mostRecentPost = data.slice(-1);
        getPostedToday(mostRecentPost);
        
        data.forEach(log => {
            let singlePostDate = new Date(log.created_at);
            labels.push(singlePostDate.getDate());
            userWeights.push(log.weight);
        })
        
        getUserPercentage(userWeights);
        getDaysPast(data);


        setLabels(labels);
        setWeights(userWeights);

        setIsLoading(false);
        

    }

    const getPostedToday = async (post) => {
        const postDate = new Date(post[0].created_at)
        const todayDate = new Date();
       if (postDate.getDate() === todayDate.getDate() && postDate.getMonth() === todayDate.getMonth() && postDate.getFullYear() === todayDate.getFullYear()) {
        setPostedToday(true);
       } else {
        setPostedToday(false);
       }  
       
    }

    const getDaysPast = (_userWeights) => {
        const firstPost = new Date(_userWeights[0].created_at);
        const [lastPost] = _userWeights.slice(-1)
        lastPost = new Date(lastPost.created_at);

        const firstDate = new Date(firstPost.getFullYear(), firstPost.getMonth(), firstPost.getDate());
        const lastDate = new Date(lastPost.getFullYear(), lastPost.getMonth(), lastPost.getDate());

        const differenceInTime = lastDate - firstDate;
        const numberOfDays = differenceInTime / (1000 * 3600 * 24);
        
        setNumberOfWeightDays(numberOfDays);
    }

    const getUserPercentage = (_weights) => {
        let [lastWeight] = _weights.slice(-1);
        const userPercentage = parseInt(100 - ((profile.target_weight / lastWeight) * 100));
        setLossPercentage(userPercentage);
        setCurrentWeight(lastWeight);        

    }
    

    const handleModalOpen = () => {
        if (postedToday){
            if (showAlert) setShowAlert(false);
            setShowAlert(true);
        } else {
            setIsOpen(true);
        }
        
    }

    const onModalClose = () => {
        setIsOpen(false);
        
    }

    //const targetWeightArrat = 

    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Weight',
            // fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#48bb78',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#48bb78',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#48bb78',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: weights,
          },
        //   {
        //       label: "Target",
        //       lineTension: 0.1,
        //       backgroundColor: 'rgba(75,192,192,0.4)',
        //       borderColor: '#48bb78',
        //       borderCapStyle: 'butt',
        //       borderDash: [],
        //       borderDashOffset: 0.0,
        //       borderJoinStyle: 'miter',
        //       pointBorderColor: 'rgba(75,192,192,1)',
        //       pointBackgroundColor: '#48bb78',
        //       pointBorderWidth: 1,
        //       pointHoverRadius: 5,
        //       pointHoverBackgroundColor: '#48bb78',
        //       pointHoverBorderColor: 'rgba(220,220,220,1)',
        //       pointHoverBorderWidth: 2,
        //       pointRadius: 5,
        //       pointHitRadius: 10,
        //       data: [targetWeight]
        //   },
        ],

      };


        return (
            <>
            {isLoading ? <div className="wrapper"><LoadingScreen></LoadingScreen></div>
             :<div className="wrapper">

                <AnimatePresence>       
                    {showAlert && 
                    <Alert 
                    setShowAlert={setShowAlert}>
                        <p className="text-center">You have already logged your weight today. Come back tomorrow to keep tracking!</p>
                    </Alert>
                    }
                    </AnimatePresence>     
    
                <div className="py-4 mx-auto">
      
                    {profile && <h1 className="text-4xl text-center text-white">{weights.length > 1 ? "Welcome back" : "Welcome to Weight Tracker"} {profile.first_name}!</h1>}
                    <div className="grid grid-cols-2 gap-4 justify-center mt-6 sm:flex ">
                        <div className="min-w-[10rem] bg-stone-900 flex items-center p-2 rounded-xl justify-center text-green-500">
                            <h3 className="text-white text-xl">Weight: {currentWeight != undefined && currentWeight.toString()}</h3>
                        </div>
                        <div className={` min-w-[10rem] flex items-center justify-center py-2 px-4 rounded-xl bg-stone-900 text-green-500`}>
                            <h3 className="text-xl text-white">Goal: {targetWeight != 0 && targetWeight}</h3>
                            
                                {/* {lossPercentage != undefined && <div className="relative w-min h-[50px] ml-auto text-green-500">
                                    <CircularProgress
                                        variant="determinate" 
                                        size={50} 
                                        value={lossPercentage}
                                        color={"inherit"} 
                                    />
                                    <p 
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm">
                                        {lossPercentage.toString()}%
                                    </p>
                                </div>} */}  
                            
                        </div>
                        <button 
                          className="col-span-2 text-lg text-white font-semibold bg-green-500 py-2 px-6 rounded-md focus:outline-none "
                            onClick={handleModalOpen}
                            > Log Your Weight
                        </button>
                    </div>
    
                    
                </div>
                <Modal open={isOpen} onClose={onModalClose}>
                 <WeightForm 
                 onClose={onModalClose} 
                 setPostedToday={setPostedToday}
                 getUserWeights={getUserWeights}
                 weights={weights}
                 setWeights={setWeights}
                 >
    
                 </WeightForm>
                 
                </Modal>
                
History-Feature
            </div>
            <Modal open={isOpen} onClose={onModalClose}>
             <WeightForm 
             onClose={onModalClose} 
             setPostedToday={setPostedToday}
             getUserWeights={getUserWeights}
             weights={weights}
             setWeights={setWeights}
             >

             </WeightForm>
             
            </Modal>
            
            <div className="min-w-screen max-w-full flex flex-col items-center mt-1 lg:flex-row lg:w-full">
                 <div className="w-full w-min-[16rem] sm:mt-4">
                    <h2 
                        className="text-white text-center">
                        Your weight over the past {numberOfWeightDays} 
                        {weights.length > 1 ? <span> days</span> : <span> day</span>}
                    </h2>

                <div className="min-w-screen max-w-full flex flex-col items-center mt-1 lg:flex-row lg:w-full">
                     <div className="w-full w-min-[16rem] sm:mt-4">
                        <h2 
                            className="text-white text-center">
                            Your weight over the past {numberOfWeightDays} 
                            {weights.length > 1 ? <span>days</span> : <span>day</span>}
                        </h2>
                        
main
                    
                    <div className="w-full">
                    <Line 
                        data={data} 
                        width={400} 
                        height={400} 
                        options={
                            {
                            responsive: true, 
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    
                                }
                            },
                            plugins: {
                                // annotation: {
                                //     annotations: [
                                //         {
                                //             type: "line",
                                //             yMax:targetWeight,
                                //             yMin:targetWeight, 
                                //             borderColor: "red",
                                //             label: {
                                //                 enabled: true,
                                //                 content: "Target Weight"
                                //             }
                                                
                                //         }
                                //     ]
                                // }
                            },
    
                            }
                            }>
    
                    </Line>
                    </div>
                    </div>
                    
                    
                </div>
                {/* These buttons are for testing purposes */}
                {/* <button className="bg-white p-4"
                onClick={() => setPostedToday(!postedToday)}
                >change log state</button> */}
                {/* <button className="bg-white p-4"
                onClick={() => setShowAlert(!postedToday)}
                >change log state</button> */}
            </div>
History-Feature
            {/* These buttons are for testing purposes */}
            {/* <button className="bg-white p-4"
            onClick={() => setPostedToday(!postedToday)}
            >change log state</button> */}
            {/* <button className="bg-white p-4"
            onClick={() => setShowAlert(!postedToday)}
            >change log state</button> */}


        </div>
    )
}

            }
            </>
        )
    }
    


main

export default Dashboard 