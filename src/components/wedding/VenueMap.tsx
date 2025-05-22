// VenueMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const VenueMap = () => {
  const position: [number, number] = [18.4736, 73.7331];

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="w-full h-50 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-rose-400">
      <div
        style={{ borderRadius:5}}
        className="w-full p-1 h-50 rounded-xl border border-rose-300 "
      >
        <MapContainer
          center={position}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%"}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              Gurudev Sanskritik Bhavan, Utre
              <br />
              Pune, Maharashtra
              <br />
              {/* <a href="https://maps.app.goo.gl/qKp4eqsaVJWCTikB9" target="_blank" rel="noopener noreferrer">
              View on Google Maps
            </a> */}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default VenueMap;
