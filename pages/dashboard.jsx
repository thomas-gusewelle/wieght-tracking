import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { WeightContext } from "../src/providers/weight-context";

import { AnimatePresence, motion } from "framer-motion";

import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";

import WeightForm from "./components/forms/weight-form";
import Modal from "./components/modal";
import Alert from "./components/alert";
import LoadingScreen from "./components/loading-screen";
import WeightHistory from "./components/dashboard/weight-history";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  annotationPlugin
);

const Dashboard = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const weightContext = useContext(WeightContext);

  const handleModalOpen = () => {
    if (weightContext.postedToday) {
      if (showAlert) setShowAlert(false);
      setShowAlert(true);
    } else {
      setIsOpen(true);
    }
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  //const targetWeightArrat =

  const data = {
    labels: weightContext.labels,
    datasets: [
      {
        label: "Weight",
        // fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#48bb78",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#48bb78",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#48bb78",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: weightContext.weights,
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
    <div className='wrapper'>
      <AnimatePresence>
        {showAlert && (
          <Alert setShowAlert={setShowAlert}>
            <p className='text-center'>
              You have already logged your weight today. Come back tomorrow to
              keep tracking!
            </p>
          </Alert>
        )}
      </AnimatePresence>

      {weightContext.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className='py-4 mx-auto'>
            {weightContext.profile && (
              <h1 className='text-4xl text-center text-white'>
                {weightContext.weights.length > 1
                  ? "Welcome back"
                  : "Welcome to Weight Tracker"}{" "}
                {weightContext.profile.first_name}!
              </h1>
            )}
            <div className='grid grid-cols-2 gap-4 justify-center mt-6 sm:flex '>
              <div className='min-w-[10rem] bg-stone-900 flex items-center p-2 rounded-xl justify-center text-green-500'>
                <h3 className='text-white text-xl'>
                  Weight:{" "}
                  {weightContext.currentWeight != undefined &&
                    weightContext.currentWeight.toString()}
                </h3>
              </div>
              <div
                className={` min-w-[10rem] flex items-center justify-center py-2 px-4 rounded-xl bg-stone-900 text-green-500`}>
                <h3 className='text-xl text-white'>
                  Goal:{" "}
                  {weightContext.targetWeight != 0 &&
                    weightContext.targetWeight}
                </h3>

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
                className='col-span-2 text-lg text-white font-semibold bg-green-500 py-2 px-6 rounded-md focus:outline-none '
                onClick={handleModalOpen}>
                {" "}
                Log Your Weight
              </button>
            </div>
          </div>
          <Modal open={isOpen} onClose={onModalClose}>
            <WeightForm
              onClose={onModalClose}
              setPostedToday={weightContext.setPostedToday}
              getUserWeights={weightContext.getUserWeights}
              weights={weightContext.weights}
              setWeights={weightContext.setWeights}></WeightForm>
          </Modal>
          <div className='min-w-screen max-w-full flex flex-col items-center mt-1 lg:flex-row lg:w-full'>
            <div className='w-full w-min-[16rem] sm:mt-4'>
              <h2 className='text-white text-center'>
                Your weight over the past {weightContext.numberOfWeightDays}
                {weightContext.weights.length > 1 ? (
                  <span> days</span>
                ) : (
                  <span> day</span>
                )}
              </h2>

              <div className='w-full'>
                <Line
                  data={data}
                  width={400}
                  height={400}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {},
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
                  }}></Line>
              </div>
            </div>
          </div>
        </>
      )}

      {/* These buttons are for testing purposes */}
      {/* <button className="bg-white p-4"
            onClick={() => setPostedToday(!postedToday)}
            >change log state</button> */}
      {/* <button className="bg-white p-4"
            onClick={() => setShowAlert(!postedToday)}
            >change log state</button> */}
    </div>
  );
};

export default Dashboard;
