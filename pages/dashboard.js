import { useEffect } from "react"
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient"


import ClipLoader from "react-spinners/ClipLoader"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'

import WeightForm from "./components/weight-form";
import Modal from "./components/modal";
import Alert from "./components/alert"


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const Dashboard = () => {
    const router = useRouter();

    const [isLoadingForm, setisLoadingForm] = useState(true);
    const [isLoadingChart, setIsLoadingChart] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    

    const [profile, setProfile] = useState({});
    const [postedToday, setPostedToday] = useState(false);

    const [labels, setLabels] = useState([]);
    const [weights, setWeights] = useState([]);

    useEffect(() =>  {
        const getUserProfile = async () => {
            if (supabase.auth.user() === null) router.push('/signin');
            const userId = supabase.auth.user().id;
            const user = await supabase.from('profile').select().eq('id', userId);
            setProfile(user.data[0])   
        }
        const getPostedToday = async () => {
            const mostRecentPost = await supabase.from('weight').select().eq('user', supabase.auth.user().id);
            mostRecentPost = mostRecentPost.data.reverse();
            console.log(mostRecentPost)
            const postDate = new Date(mostRecentPost[0].created_at)
            const todayDate = new Date();
            
           if (postDate.getDate() === todayDate.getDate() && postDate.getMonth() === todayDate.getMonth() && postDate.getFullYear() === todayDate.getFullYear()) {
            setPostedToday(true);
            setisLoadingForm(false);
           } else {
            setPostedToday(false);
            setisLoadingForm(false);
           }   
        }



        getUserProfile();
        getPostedToday();
        getUserWeights();
    }, []);

    const getUserWeights = async () => {
        const labels = []
        const weights = []
        const { data, error } = await supabase.from('weight').select().eq('user', supabase.auth.user().id).limit(30);
        data.forEach(log => {
            let singlePostDate = new Date(log.created_at);
            labels.push(singlePostDate.getDate());
            weights.push(log.weight);
        })
        setLabels(labels);
        setWeights(weights);
        setIsLoadingChart(false);
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
            label: '',
            fill: false,
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
        ]
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
                <div className="flex gap-4 justify-center mt-6">
                    <div className="w-48 h-12 bg-red-500"></div>
                    <div className="w-48 h-12 bg-red-500"></div>
                    <button 
                      className="text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none "
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