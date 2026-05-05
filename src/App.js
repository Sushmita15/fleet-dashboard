import "./App.css";
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

    const cardStyle = {
    background: "#111827",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    border: "1px solid #1f2937"
  };

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

  return (<div style={{ padding: "20px", background: "#0b1220", minHeight: "100vh" }}>
      <h1>Fleet Dashboard</h1>

      <div style={cardStyle}>
        <KPIHeader vehicles={vehicles} />
      </div>

      <div style={cardStyle}>
        <VehicleTable vehicles={vehicles} />
      </div>

      <div style={cardStyle}>
        <AlertsFeed vehicles={vehicles} />
      </div>

      <div style={cardStyle}>
        <SpeedChart data={history} />
      </div>
    </div>);
}

export default App;