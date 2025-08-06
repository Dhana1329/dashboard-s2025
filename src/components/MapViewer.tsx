import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useGlobalStore } from "../store/useGlobalStore";

const MapViewer: React.FC = () => {
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const selectedHours = useGlobalStore((state) => state.selectedHours);

  const onCreated = (e: L.DrawEvents.Created) => {
    const layer = e.layer;
    if (featureGroupRef.current) {
      featureGroupRef.current.addLayer(layer);
      console.log("Layer added:", layer);
    }
  };

  // Update polygon colors when selectedHours changes
  useEffect(() => {
    if (!featureGroupRef.current) return;

    featureGroupRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        const diff = selectedHours[1] - selectedHours[0];
        let color = "blue";
        if (diff < 10) color = "green";
        else if (diff < 20) color = "orange";
        else color = "red";

        layer.setStyle({ color });
      }
    });
  }, [selectedHours]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629] as L.LatLngExpression}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
       <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              polygon: true,
              rectangle: false,
              polyline: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            edit={{
              remove: true,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapViewer;
