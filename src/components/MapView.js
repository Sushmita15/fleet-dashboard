import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView({ vehicles }) {
  // default center (Albany / NY area as example)
  const defaultCenter = [42.6526, -73.7562];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "500px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.values(vehicles)
      .filter(v => v.lat && v.lon)
      .map((v) => (
        <Marker
          key={v.vehicleId}
          position={[v.lat, v.lon]}
        >
          <Popup>
            <div>
              <b>Vehicle {v.vehicleId}</b>
              <br />
              Speed: {v.speed}
              <br />
              Fuel: {v.fuel}%
              <br />
              Temp: {v.engineTemp}
             
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;