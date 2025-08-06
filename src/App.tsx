import React from "react";
import TimelineSlider from "./components/TimelineSlider";
import MapViewer from "./components/MapViewer";
import { useGlobalStore } from "./store/useGlobalStore";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TestMap: React.FC = () => {
  const setSelectedHours = useGlobalStore((state) => state.setSelectedHours);
  return (
    
    <div style={{ height: "500px", width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>S2025 Dashboard</h2>
      

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true} // optional: enable scroll zoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default TestMap;
