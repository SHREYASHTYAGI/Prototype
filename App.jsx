import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [buses, setBuses] = useState([
    { id: "Bus 1", coords: [28.7041, 77.1025], route: "Route A" },
    { id: "Bus 2", coords: [28.72, 77.11], route: "Route B" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev =>
        prev.map(bus => ({
          ...bus,
          coords: [
            bus.coords[0] + (Math.random() - 0.5) * 0.001,
            bus.coords[1] + (Math.random() - 0.5) * 0.001
          ]
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[28.7041, 77.1025]} zoom={12} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {buses.map(bus => (
        <Marker key={bus.id} position={bus.coords}>
          <Popup>
            <b>{bus.id}</b><br/>Route: {bus.route}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
