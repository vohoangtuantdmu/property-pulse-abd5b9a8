import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const targetIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Zoning polygons around HCMC / Thu Dau Mot area
const zoningPolygons = [
  {
    id: "odt",
    name: "Đất ở đô thị (ODT)",
    color: "hsl(350, 70%, 60%)",
    fillColor: "hsl(350, 70%, 65%)",
    positions: [
      [10.982, 106.672],
      [10.985, 106.678],
      [10.981, 106.682],
      [10.977, 106.679],
      [10.978, 106.673],
    ] as [number, number][],
  },
  {
    id: "cln",
    name: "Đất nông nghiệp (CLN)",
    color: "hsl(130, 50%, 45%)",
    fillColor: "hsl(130, 50%, 55%)",
    positions: [
      [10.975, 106.668],
      [10.978, 106.672],
      [10.977, 106.678],
      [10.973, 106.676],
      [10.972, 106.670],
    ] as [number, number][],
  },
  {
    id: "giao-thong",
    name: "Đất quy hoạch giao thông",
    color: "hsl(35, 85%, 55%)",
    fillColor: "hsl(35, 85%, 60%)",
    positions: [
      [10.984, 106.669],
      [10.986, 106.673],
      [10.984, 106.674],
      [10.982, 106.672],
      [10.981, 106.669],
    ] as [number, number][],
  },
];

const selectedPoint: [number, number] = [10.9804, 106.6745];

function FlyToCenter() {
  const map = useMap();
  useEffect(() => {
    map.flyTo([10.979, 106.674], 15, { duration: 0.8 });
  }, [map]);
  return null;
}

interface LegalGISMapProps {
  onPolygonClick?: (polygonId: string) => void;
}

const LegalGISMap = ({ onPolygonClick }: LegalGISMapProps) => {
  const defaultCenter: [number, number] = [10.979, 106.674];

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={15}
        className="w-full h-full z-0"
        style={{ background: "#e8ecf1" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToCenter />

        {zoningPolygons.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.positions}
            pathOptions={{
              color: zone.color,
              fillColor: zone.fillColor,
              fillOpacity: 0.4,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onPolygonClick?.(zone.id),
            }}
          >
            <Popup>
              <strong>{zone.name}</strong>
            </Popup>
          </Polygon>
        ))}

        <Marker position={selectedPoint} icon={targetIcon}>
          <Popup>
            <strong>Vị trí BĐS đang kiểm tra</strong>
            <br />
            {selectedPoint[0].toFixed(4)}, {selectedPoint[1].toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 right-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border min-w-[200px]">
        <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
          Chú giải Quy hoạch
        </p>
        <div className="space-y-2">
          {zoningPolygons.map((zone) => (
            <div key={zone.id} className="flex items-center gap-2.5">
              <div
                className="w-4 h-3 rounded-sm border border-border/50 shrink-0"
                style={{ backgroundColor: zone.fillColor, opacity: 0.7 }}
              />
              <span className="text-xs text-foreground/80 font-medium">{zone.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalGISMap;
