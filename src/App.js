import React, { useState, useEffect } from "react";
import KPIHeader from "./components/KPIHeader";
import VehicleTable from "./components/VehicleTable";
import AlertsFeed from "./components/AlertsFeed";
import SpeedChart from "./components/SpeedChart";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [vehicles, setVehicles] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("telemetry", (data) => {
      setVehicles((prev) => ({
        ...prev,
        [data.vehicleId]: data
      }));

      setHistory((prev) => [
        ...prev.slice(-20),
        data
      ]);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 Fleet Management System</h1>

      <KPIHeader vehicles={vehicles} />
      <VehicleTable vehicles={vehicles} />
      <AlertsFeed vehicles={vehicles} />
      <SpeedChart data={history} />
    </div>
  );
}

export default App;