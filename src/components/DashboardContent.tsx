import { AlertTriangle, TrendingUp, Brain, MapPin, ArrowUpRight, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { BrokerTab } from "@/components/BrokerSidebar";

const chartData = [
  { name: "01/02", value: 18 }, { name: "05/02", value: 24 }, { name: "09/02", value: 20 },
  { name: "13/02", value: 32 }, { name: "17/02", value: 28 }, { name: "21/02", value: 45 },
  { name: "25/02", value: 38 }, { name: "28/02", value: 52 },
];

const heatPoints = [
  { lat: 10.78, lng: 106.7, r: 22, color: "hsl(0, 80%, 55%)" },
  { lat: 10.76, lng: 106.68, r: 18, color: "hsl(30, 90%, 55%)" },
  { lat: 10.8, lng: 106.73, r: 15, color: "hsl(50, 90%, 50%)" },
  { lat: 10.82, lng: 106.65, r: 12, color: "hsl(120, 50%, 50%)" },
  { lat: 10.74, lng: 106.72, r: 20, color: "hsl(0, 80%, 55%)" },
  { lat: 10.77, lng: 106.66, r: 10, color: "hsl(50, 90%, 50%)" },
  { lat: 10.81, lng: 106.69, r: 14, color: "hsl(30, 90%, 55%)" },
];

const recentRequests = [
  { customer: "Nguyễn Văn A", address: "123 Lê Lợi, Quận 1", time: "5 phút trước" },
  { customer: "Trần Thị B", address: "45 Nguyễn Huệ, Quận 1", time: "22 phút trước" },
  { customer: "Lê Văn C", address: "78 Phạm Văn Đồng, Thủ Đức", time: "1 giờ trước" },
];

const kpis = [
  { label: "Tin Yêu Cầu Chờ Duyệt", value: "12", icon: AlertTriangle, iconColor: "text-destructive", sub: "Cần xử lý ngay", subColor: "text-destructive" },
  { label: "Tổng Lượt Định Giá AI", value: "1,450", icon: Brain, iconColor: "text-primary", sub: "+15% so với tuần trước", subColor: "text-success", arrow: true },
  { label: "Độ Chính Xác Mô Hình KNN", value: "92.5%", icon: TrendingUp, iconColor: "text-primary", sub: "Đã cập nhật dữ liệu mới nhất", subColor: "text-muted-foreground" },
  { label: "Cảnh Báo Pháp Lý (GIS)", value: "8", icon: MapPin, iconColor: "text-warning", sub: "Phát hiện dính quy hoạch", subColor: "text-warning" },
];

interface DashboardContentProps {
  onNavigate?: (tab: BrokerTab) => void;
}

const DashboardContent = ({ onNavigate }: DashboardContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-muted/40 p-6 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-foreground">
          👋 Chào mừng trở lại, Chuyên viên Hoàng Tuấn
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Dưới đây là hiệu suất hệ thống DSS hôm nay.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground leading-tight">{kpi.label}</p>
                <kpi.icon className={`w-4 h-4 ${kpi.iconColor} shrink-0`} />
              </div>
              <p className="text-3xl font-bold text-foreground tracking-tight">{kpi.value}</p>
              <p className={`text-xs mt-1.5 font-medium ${kpi.subColor} flex items-center gap-1`}>
                {kpi.arrow && <ArrowUpRight className="w-3 h-3" />}
                {kpi.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Area Chart */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Lưu Lượng Yêu Cầu Thẩm Định (30 ngày qua)
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(224, 71%, 33%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(224, 71%, 33%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", fontSize: "12px" }}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(224, 71%, 33%)" strokeWidth={2} fill="url(#dashGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Heatmap */}
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-5 pb-0">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Bản Đồ Điểm Nóng Giao Dịch
            </h3>
          </CardContent>
          <div className="h-56 mx-5 mb-5 rounded-lg overflow-hidden border border-border">
            <MapContainer
              center={[10.78, 106.7]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {heatPoints.map((p, i) => (
                <CircleMarker
                  key={i}
                  center={[p.lat, p.lng]}
                  radius={p.r}
                  pathOptions={{ fillColor: p.color, fillOpacity: 0.5, stroke: false }}
                />
              ))}
            </MapContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Yêu Cầu Mới Nhất Cần Xử Lý
            </h3>
            <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => onNavigate?.("listings")}>
              Xem tất cả <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Khách hàng</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Địa chỉ sơ bộ</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Thời gian gửi</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((r, i) => (
                  <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{r.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.address}</td>
                    <td className="px-4 py-3 text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {r.time}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        className="h-7 text-xs gap-1"
                        onClick={() => onNavigate?.("listings")}
                      >
                        Kiểm tra ngay
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
