export default function VehicleTable({ vehicles }) {
  return (
    <table style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Speed</th>
          <th>Fuel</th>
          <th>Temp</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {Object.values(vehicles).map(v => (
          <tr key={v.vehicleId}>
            <td>{v.vehicleId}</td>
            <td>{v.speed}</td>
            <td>{v.fuel}%</td>
            <td>{v.engineTemp}</td>

            <td style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {v.speed > 80
                ? "🔴 Speeding"
                : v.fuel < 15
                ? "🟠 Low Fuel"
                : "🟢 OK"}
                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}