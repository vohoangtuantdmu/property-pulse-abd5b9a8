import { Server, Users, Database, Activity, HardDrive, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const systemMetrics = [
  { label: "Trạng thái Server", value: "Online", icon: Server, iconColor: "text-success", sub: "Uptime: 99.97%", subColor: "text-success" },
  { label: "Chuyên viên Hoạt động", value: "4/5", icon: Users, iconColor: "text-primary", sub: "1 offline", subColor: "text-muted-foreground" },
  { label: "Tổng Giao dịch DB", value: "15,420", icon: Database, iconColor: "text-primary", sub: "+320 chưa xử lý", subColor: "text-warning" },
  { label: "API Requests (24h)", value: "2,847", icon: Activity, iconColor: "text-primary", sub: "Avg response: 120ms", subColor: "text-muted-foreground" },
];

const services = [
  { name: "PostGIS Database", status: "Running", cpu: "12%", mem: "2.1 GB" },
  { name: "KNN Model Server", status: "Running", cpu: "34%", mem: "4.8 GB" },
  { name: "OCR Processing Queue", status: "Running", cpu: "8%", mem: "512 MB" },
  { name: "GIS Tile Server", status: "Running", cpu: "5%", mem: "1.2 GB" },
];

const SystemOverview = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-muted/40 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Tổng quan Hệ thống</h1>
        <p className="text-sm text-muted-foreground mt-1">Giám sát trạng thái và hiệu suất hệ thống DSS Real Estate.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {systemMetrics.map((m) => (
          <Card key={m.label} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
                <m.icon className={`w-4 h-4 ${m.iconColor} shrink-0`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className={`text-xs mt-1.5 font-medium ${m.subColor}`}>{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Table */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Trạng thái Dịch vụ</h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Dịch vụ</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Trạng thái</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">CPU</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground">Memory</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.name} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 flex items-center gap-2">
                      <HardDrive className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-medium text-foreground">{s.name}</span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge className="text-[10px] bg-success/15 text-success border-success/30">🟢 {s.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground flex items-center gap-1.5">
                      <Cpu className="w-3 h-3" /> {s.cpu}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{s.mem}</td>
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

export default SystemOverview;
