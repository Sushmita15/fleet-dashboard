export default function KPIHeader({ vehicles }) {
  const total = Object.keys(vehicles).length;

  const avgSpeed =
    total === 0
      ? 0
      : Object.values(vehicles).reduce((a, v) => a + v.speed, 0) / total;

  const alerts = Object.values(vehicles).filter(
    v => v.speed > 80 || v.fuel < 15
  ).length;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div>🚗 Vehicles: {total}</div>
      <div>⚡ Avg Speed: {avgSpeed.toFixed(1)}</div>
      <div>🚨 Alerts: {alerts}</div>
    </div>
  );
}