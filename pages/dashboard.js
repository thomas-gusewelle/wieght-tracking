import { useEffect } from "react"
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient"


import ClipLoader from "react-spinners/ClipLoader"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'
import { CircularProgress } from '@mui/material';

import WeightForm from "./components/weight-form";
import Modal from "./components/modal";
import Alert from "./components/alert"


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const Dashboard = () => {
    const router = useRouter();

    const [isLoadingForm, setisLoadingForm] = useState(true);
    const [isLoadingChart, setIsLoadingChart] = useState(true);
    const [isLoadingWeight, setIsLoadingWeight] = useState(true);
    const [isLoadingGoal, setIsLoadingGoal] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    

    const [profile, setProfile] = useState({});
    const [postedToday, setPostedToday] = useState(false);

    const [labels, setLabels] = useState([]);
    const [weights, setWeights] = useState([]);
    const [lossPercentage, setLossPercentage] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [targetWeight, setTargetWeight] = useState(0);

    useEffect(() =>  {
        getUserProfile();
        getUserWeights();

        
    }, []);

    const getUserProfile = async () => {
        if (supabase.auth.user() === null) router.push('/signin');
        const userId = supabase.auth.user().id;
        const user = await supabase.from('profile').select().eq('id', userId);
        setProfile(user.data[0])  
        
    }

    useEffect(() => {
        if(profile != undefined){
            setTargetWeight(profile.target_weight)
        }
        
    },[profile])

    const getPostedToday = async (post) => {
        // const mostRecentPost = await supabase.from('weight').select().eq('user', supabase.auth.user().id);
        // mostRecentPost = mostRecentPost.data.reverse();
        const postDate = new Date(post.created_at)
        const todayDate = new Date();
        
       if (postDate.getDate() === todayDate.getDate() && postDate.getMonth() === todayDate.getMonth() && postDate.getFullYear() === todayDate.getFullYear()) {
        setPostedToday(true);
        setisLoadingForm(false);
       } else {
        setPostedToday(false);
        setisLoadingForm(false);
       }  
       
    }

    const getUserWeights = async () => {
        const labels = []
        const weights = []
        const { data, error } = await supabase.from('weight').select().eq('user', supabase.auth.user().id);
        let mostRecentPost = data.slice(-1);
        getPostedToday(mostRecentPost);
        data.forEach(log => {
            let singlePostDate = new Date(log.created_at);
            labels.push(singlePostDate.getDate());
            weights.push(log.weight);
        })
        setLabels(labels);
        setWeights(weights);
        setIsLoadingChart(false);
        setIsLoadingGoal(false);
        setIsLoadingWeight(false);
    }

    useEffect(() => {
        getUserPercentage();
    }, [weights])

    const getUserPercentage = () => {
        const [lastWeight] = weights.slice(-1);
        setCurrentWeight(lastWeight);
        const userPercentage = parseInt(100 - ((profile.target_weight / lastWeight) * 100));
        setLossPercentage(userPercentage);
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

    const data = {
        labels: labels,
        datasets: [
          {
            //  label: '',
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
          }
        ],
        options: {
            plugins: {
                tooltip: {
                    enabled: true
                }
            }
        }
      };



    return (
        <div className="wrapper">
            
            
                {showAlert && 
                <Alert setShowAlert={setShowAlert}>
                    <p className="text-center">You have already logged your weight today. Come back tomorrow to keep tracking!</p>
                </Alert>
                }
               
           

            
            <div className="py-4 mx-auto">
  
                {profile && <h1 className="text-4xl text-center text-white">Welcome back {profile.first_name}!</h1>}
                <div className="grid grid-cols-2 gap-4 justify-center mt-6 sm:flex ">
                    <div className="min-w-[12rem] bg-stone-900 flex items-center p-2 rounded-xl justify-center text-green-500">
                        { isLoadingWeight
                            ? <CircularProgress color={"inherit"}/>
                            : <h3 className="text-white text-xl">Weight: {currentWeight != undefined && currentWeight.toString()}</h3>
                        }
                    </div>
                    <div className={` min-w-[12rem] flex items-center ${isLoadingGoal && 'justify-center'} py-2 px-4 rounded-xl bg-stone-900 text-green-500`}>
                        { isLoadingGoal
                            ? <CircularProgress color="inherit"/>
                            :<>
                                <h3 className="text-xl text-white">Goal: {targetWeight != 0 && targetWeight}</h3>
                        
                            <div className="relative w-min h-[50px] ml-auto text-green-500">
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
                            </div>
                        </>
                        }
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
             getUserWeights={getUserWeights}>

             </WeightForm>
             
            </Modal>
            
            <div className="min-w-screen max-w-full flex flex-col items-center mt-1 lg:flex-row lg:w-full">
                {isLoadingChart 
                 ? <div className="w-full flex items-center justify-center sm:h-64">
                <ClipLoader loading={isLoadingChart} color={"#ffffff"}></ClipLoader>
                </div>
                : <div className="w-full w-min-[16rem] sm:mt-4">
                {weights.length > 0 
                    ? <h2 className="text-white text-center">Your weight over the past {weights.length} {weights.length > 1 ? <span>days</span> : <span>day</span>
                    }</h2>
                    : <h2 className="text-white text-center">Please submit your weight to begin tracking</h2>
                }
                <div className="w-full">
                <Line data={data} width={400} height={400} options={{responsive: true, maintainAspectRatio: false, }}></Line>
                </div>
                </div>
                } 
                
            </div>

            {/* These buttons are for testing purposes */}
            {/* <button className="bg-white p-4"
            onClick={() => setPostedToday(!postedToday)}
            >change log state</button> */}
        </div>
    )
}

export default Dashboard 