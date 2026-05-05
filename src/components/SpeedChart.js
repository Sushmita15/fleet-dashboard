import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function SpeedChart({ data }) {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        label: "Speed",
        data: data.map((d) => d.speed),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return (
    <div
      style={{
        marginTop: "20px",
        textAlign: "center",
      }}
    >
    <h3>Speed Trend</h3>

      <Line data={chartData} />
    </div>
  );
}
