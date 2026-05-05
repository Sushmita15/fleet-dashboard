export default function AlertsFeed({ vehicles }) {
  const alerts = Object.values(vehicles).filter(
    v => v.speed > 80 || v.fuel < 15
  );

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Alerts</h3>

      {alerts.map((v, i) => (
        <div key={i}>
          Vehicle {v.vehicleId} →
          {v.speed > 80 && " Speeding "}
          {v.fuel < 15 && " Low Fuel "}
        </div>
      ))}
    </div>
  );
}