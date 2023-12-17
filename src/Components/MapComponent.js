import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./mapComponent.css";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";

const customIcon = new L.Icon({
  iconUrl: "path/to/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const MapComponent = ({ tollResult }) => {
  console.log(tollResult)
  const [routePolyline, setRoutePolyline] = useState([]);
  useEffect(() => {
    if (tollResult) {
      // Extract polyline from the tollResult (modify this based on your API response structure)
      const routePolyline = tollResult?.map((route) => route.polyline);
      setRoutePolyline(routePolyline);
    }
  }, [tollResult]);
  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routePolyline.map((polyline, index) => (
        <Polyline
          key={index}
          pathOptions={{ color: "blue" }}
          positions={L.Polyline.fromEncoded(polyline).getLatLngs()}
        />
      ))}
      {/* {tollResult &&
        tollResult.map((route, index) => (
          <Marker
            key={index}
            position={[route.start_location.lat, route.start_location.lng]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <p>Toll Information</p>
                <p>Toll Cost: {route.costs.toll}</p>
               
              </div>
            </Popup>
          </Marker>
        ))} */}
    </MapContainer>
  );
};
