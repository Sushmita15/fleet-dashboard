import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import "leaflet/dist/leaflet.css";
import MapView from "./components/MapView";


const socket = io("http://localhost:3001"); // your backend

function App() {
  const [vehicles, setVehicles] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("telemetry", (data) => {
      // data = { vehicleId, speed, fuel, engineTemp, timestamp }

      setVehicles((prev) => ({
        ...prev,
        [data.vehicleId]: data
      }));

      setHistory((prev) => [...prev.slice(-20), data]); // last 20 points
    });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚗 Fleet Diva Dashboard</h1>

      {/* VEHICLE CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {Object.values(vehicles).map((v) => (
          <div
            key={v.vehicleId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "200px",
              background: "#f9f9f9"
            }}
          >
            <h3>Vehicle {v.vehicleId}</h3>
            <p>Speed: {v.speed} mph</p>
            <p>Fuel: {v.fuel}%</p>
            <p>Temp: {v.engineTemp}°F</p>

            {/* Alert */}
            {v.speed > 90 && <p style={{ color: "red" }}>⚠️ Speeding!</p>}
            {v.fuel < 15 && <p style={{ color: "orange" }}>⛽ Low Fuel</p>}
          </div>
        ))}
      </div>

      {/* CHART */}
      <h2 style={{ marginTop: "40px" }}>Speed Trend</h2>

      <LineChart width={600} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vehicleId" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="speed" />
      </LineChart>

      {/* MAP */}
      <h2 style={{ marginTop: "40px" }}>Vehicle Locations</h2>
      <MapView vehicles={vehicles} />
    </div>
      
  );
}

export default App;