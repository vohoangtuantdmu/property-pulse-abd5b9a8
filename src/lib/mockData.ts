import { LatLngExpression } from "leaflet";

export interface MockProperty {
  id: number;
  address: string;
  area: number;
  price: number; // in tỷ VND
  pricePerM2: number; // in triệu/m2
  transactionDate: string;
  status: "Đã bán" | "Đang bán";
  lat: number;
  lng: number;
}

const addresses = [
  "Hẻm xe hơi đường Lê Hồng Phong, Thủ Dầu Một",
  "Mặt tiền Nguyễn Văn Cừ, Quận 5",
  "Hẻm 6m Phan Xích Long, Phú Nhuận",
  "Đường D2, Bình Thạnh",
  "Hẻm 8m Lê Quang Định, Gò Vấp",
  "Mặt tiền Trần Não, Quận 2",
  "Hẻm 5m Nguyễn Thị Minh Khai, Quận 3",
  "Đường Số 7, Thủ Đức",
];

const statuses: ("Đã bán" | "Đang bán")[] = ["Đã bán", "Đang bán"];

function randomInRange(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function randomDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 180);
  const d = new Date(now.getTime() - daysAgo * 86400000);
  return d.toLocaleDateString("vi-VN");
}

function offsetLatLng(lat: number, lng: number, radiusKm: number): [number, number] {
  const r = Math.random() * radiusKm * 0.85; // keep within circle
  const angle = Math.random() * 2 * Math.PI;
  const dLat = (r / 111.32) * Math.cos(angle);
  const dLng = (r / (111.32 * Math.cos((lat * Math.PI) / 180))) * Math.sin(angle);
  return [lat + dLat, lng + dLng];
}

export function generateMockProperties(lat: number, lng: number, count = 7): MockProperty[] {
  return Array.from({ length: count }, (_, i) => {
    const area = Math.round(randomInRange(60, 180));
    const pricePerM2 = randomInRange(35, 85); // triệu/m2
    const price = Math.round((area * pricePerM2) / 100) / 10; // tỷ
    const [pLat, pLng] = offsetLatLng(lat, lng, 2);

    return {
      id: i + 1,
      address: addresses[i % addresses.length],
      area,
      price,
      pricePerM2,
      transactionDate: randomDate(),
      status: statuses[Math.random() > 0.4 ? 0 : 1],
      lat: pLat,
      lng: pLng,
    };
  });
}
