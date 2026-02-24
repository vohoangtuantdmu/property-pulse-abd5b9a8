import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MockProperty } from "@/lib/mockData";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const targetIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [49, 49],
  className: "target-marker",
});

const compIcon = L.divIcon({
  className: "comp-marker",
  html: `<div style="width:12px;height:12px;background:hsl(38,90%,50%);border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.35);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

L.Marker.prototype.options.icon = defaultIcon;

interface ClickHandlerProps {
  onClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 0.8 });
  }, [lat, lng, map]);
  return null;
}

interface SurveyMapProps {
  targetPosition: [number, number] | null;
  properties: MockProperty[];
  onMapClick: (lat: number, lng: number) => void;
  onPropertyHover?: (id: number | null) => void;
  highlightedId?: number | null;
}

const SurveyMap = ({ targetPosition, properties, onMapClick, onPropertyHover, highlightedId }: SurveyMapProps) => {
  const defaultCenter: [number, number] = [10.7769, 106.7009]; // HCMC

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      className="w-full h-full z-0"
      style={{ background: "#e8ecf1" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onClick={onMapClick} />

      {targetPosition && (
        <>
          <FlyTo lat={targetPosition[0]} lng={targetPosition[1]} />
          <Marker position={targetPosition} icon={targetIcon}>
            <Popup>
              <strong>Vị trí BĐS mục tiêu</strong>
              <br />
              {targetPosition[0].toFixed(5)}, {targetPosition[1].toFixed(5)}
            </Popup>
          </Marker>
          <Circle
            center={targetPosition}
            radius={2000}
            pathOptions={{
              color: "hsl(215, 60%, 22%)",
              fillColor: "hsl(215, 60%, 40%)",
              fillOpacity: 0.1,
              weight: 2,
              dashArray: "6 4",
            }}
          />
        </>
      )}

      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={compIcon}
          eventHandlers={{
            mouseover: () => onPropertyHover?.(p.id),
            mouseout: () => onPropertyHover?.(null),
          }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong>{p.price} Tỷ VND</strong>
              <br />
              {p.area}m² · {p.pricePerM2} tr/m²
              <br />
              <span style={{ fontSize: 11, color: "#666" }}>{p.address}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SurveyMap;
