
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Pond } from "../types/fishing";

interface FishingMapProps {
  ponds: Pond[];
  onSelectPond: (pond: Pond) => void;
}

const pondIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FishingMap({ ponds, onSelectPond }: FishingMapProps) {
  return (
    <MapContainer
      center={[42.285, -71.78]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {ponds.map(pond => (
        <Marker
          key={pond.id}
          position={[pond.latitude, pond.longitude]}
          icon={pondIcon}
          eventHandlers={{
            click: () => onSelectPond(pond)
          }}
        />
      ))}
    </MapContainer>
  );
}

export default FishingMap;
