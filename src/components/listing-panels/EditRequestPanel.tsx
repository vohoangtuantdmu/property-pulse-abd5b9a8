import { AlertTriangle, MapPin, Bell, XCircle, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const chatHistory = [
  {
    sender: "Chuyên viên Minh Quân",
    avatar: "MQ",
    time: "Hôm nay, 14:30",
    message: "Hình ảnh Sổ Đỏ trang 2 bị mờ, không đọc được số thửa. Yêu cầu chụp lại nơi có đủ ánh sáng.",
    isAgent: true,
  },
  {
    sender: "Hệ thống",
    avatar: "⚙️",
    time: "Hôm nay, 14:31",
    message: "Đã gửi thông báo yêu cầu chỉnh sửa đến Khách hàng Nguyễn Văn A qua Email & SMS.",
    isAgent: false,
  },
];

interface EditRequestPanelProps {
  listing: { title: string; customer: string; address: string };
}

const EditRequestPanel = ({ listing }: EditRequestPanelProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">{listing.title}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {listing.address} — Khách hàng: {listing.customer}
          </p>
        </div>
        <Badge className="bg-warning/15 text-warning border-warning/30 gap-1">
          <AlertTriangle className="w-3 h-3" />
          Yêu cầu chỉnh sửa
        </Badge>
      </div>

      {/* Alert Banner */}
      <Alert className="border-destructive/30 bg-destructive/5">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertTitle className="text-destructive font-semibold">⚠️ Hồ sơ bị trả về cho Khách hàng {listing.customer}</AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground mt-1">
          Hồ sơ cần được chỉnh sửa trước khi tiếp tục quy trình kiểm định. Khách hàng đã được thông báo.
        </AlertDescription>
      </Alert>

      {/* Communication Log */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground">Lịch sử trao đổi</h3>
        </div>
        <div className="p-4 space-y-4">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.isAgent ? "" : "opacity-70"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.isAgent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">{msg.sender}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {msg.time}
                  </span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-sm text-foreground border border-border">
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 h-11 gap-2">
          <Bell className="w-4 h-4" />
          Gửi lời nhắc (Send Reminder)
        </Button>
        <Button variant="outline" className="flex-1 h-11 gap-2 border-destructive/50 text-destructive hover:bg-destructive/10">
          <XCircle className="w-4 h-4" />
          Hủy hồ sơ (Cancel Request)
        </Button>
      </div>
    </div>
  );
};

export default EditRequestPanel;
