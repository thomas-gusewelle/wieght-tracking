import { useContext } from "react";
import { WeightContext } from "../../providers/weight-context";

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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  annotationPlugin
);

export const LineGraph = () => {
  const weightContext = useContext(WeightContext);

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
    <Line
      data={data as any}
      width={400}
      height={400}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}></Line>
  );
};

export const LineGraphTarget = () => {
  const weightContext = useContext(WeightContext);

  const minValueFromArray = Math.min(...weightContext.weights);
  const minValue = Math.min(minValueFromArray, weightContext.targetWeight);

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
    <Line
      data={data as any}
      width={400}
      height={400}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: Math.ceil(minValue - 10),
          },
        },
        plugins: {
          annotation: {
            annotations: [
              {
                type: "line",
                yMax: weightContext.targetWeight,
                yMin: weightContext.targetWeight,
                borderColor: "red",
                label: {
                  enabled: true,
                  // content: "Target Weight",
                },
              },
            ],
          },
        },
      }}></Line>
  );
};
