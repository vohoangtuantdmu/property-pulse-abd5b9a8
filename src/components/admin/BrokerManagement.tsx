import { UserPlus, Pencil, KeyRound, ShieldOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const brokers = [
  { name: "Hoàng Tuấn", role: "Admin / Trưởng nhóm", status: "Active", lastLogin: "27/02/2026, 08:15", initials: "HT" },
  { name: "Tuấn Kiệt", role: "Chuyên viên AI", status: "Active", lastLogin: "27/02/2026, 09:30", initials: "TK" },
  { name: "Minh Quân", role: "Chuyên viên GIS", status: "Active", lastLogin: "27/02/2026, 07:45", initials: "MQ" },
  { name: "Minh Nhật", role: "Chuyên viên Thẩm định", status: "Active", lastLogin: "26/02/2026, 16:20", initials: "MN" },
  { name: "Quốc Thái", role: "Chuyên viên Pháp lý", status: "Offline", lastLogin: "25/02/2026, 14:00", initials: "QT" },
];

const BrokerManagement = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-muted/40 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Quản lý Tài khoản Chuyên viên Thẩm định</h1>
          <p className="text-sm text-muted-foreground mt-1">Quản lý tất cả tài khoản chuyên viên trong hệ thống DSS.</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Thêm Chuyên viên mới
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Họ và Tên</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Vai trò</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Trạng thái</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Lần đăng nhập cuối</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b) => (
                  <tr key={b.name} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {b.initials}
                        </div>
                        <span className="font-medium text-foreground">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{b.role}</td>
                    <td className="px-5 py-4">
                      <Badge className={`text-[10px] px-2 py-0.5 ${
                        b.status === "Active"
                          ? "bg-success/15 text-success border-success/30"
                          : "bg-muted text-muted-foreground border-border"
                      }`}>
                        {b.status === "Active" ? "🟢 Hoạt động" : "⚫ Offline"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground text-xs">{b.lastLogin}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Chỉnh sửa">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Reset mật khẩu">
                          <KeyRound className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Vô hiệu hóa">
                          <ShieldOff className="w-3.5 h-3.5" />
                        </Button>
                      </div>
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

export default BrokerManagement;
