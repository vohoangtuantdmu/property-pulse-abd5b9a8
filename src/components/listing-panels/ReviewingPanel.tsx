import { CheckCircle, RefreshCw, Clock, MapPin, Pause, RotateCcw, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const steps = [
  { label: "Quét OCR & Nhập liệu", status: "done" as const, detail: "Hoàn thành lúc 09:15" },
  { label: "Kiểm tra Pháp lý GIS", status: "active" as const, detail: "Đang chạy..." },
  { label: "Chạy AI Định giá KNN", status: "waiting" as const, detail: "Chờ xử lý" },
];

const statusIcon = {
  done: <CheckCircle className="w-5 h-5 text-success" />,
  active: <RefreshCw className="w-5 h-5 text-primary animate-spin" />,
  waiting: <Clock className="w-5 h-5 text-muted-foreground" />,
};

const statusLabel = {
  done: "✅",
  active: "🔄",
  waiting: "⏳",
};

interface ReviewingPanelProps {
  listing: { title: string; customer: string; address: string };
}

const ReviewingPanel = ({ listing }: ReviewingPanelProps) => {
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
        <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">
          <RefreshCw className="w-3 h-3" />
          Đang Kiểm Định
        </Badge>
      </div>

      {/* Assignee */}
      <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">TK</div>
        <div>
          <p className="text-sm font-semibold text-foreground">Người phụ trách: Chuyên viên Tuấn Kiệt</p>
          <p className="text-xs text-muted-foreground">Bắt đầu kiểm định lúc 09:00 hôm nay</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground">Tiến trình Kiểm Định</h3>
        </div>
        <div className="p-4 space-y-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              {/* Vertical line + icon */}
              <div className="flex flex-col items-center">
                {statusIcon[step.status]}
                {i < steps.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 ${step.status === "done" ? "bg-success" : "bg-border"}`} />
                )}
              </div>
              {/* Content */}
              <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                <p className={`text-sm font-medium ${step.status === "waiting" ? "text-muted-foreground" : "text-foreground"}`}>
                  {statusLabel[step.status]} {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>

                {/* Mini map for active GIS step */}
                {step.status === "active" && (
                  <div className="mt-3 bg-muted rounded-lg border border-border p-3 flex items-center gap-3">
                    <Map className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Đang quét lớp quy hoạch khu vực Quận 9...</p>
                      <div className="w-40 h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse w-3/5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 h-11 gap-2">
          <RotateCcw className="w-4 h-4" />
          Cập nhật tiến độ
        </Button>
        <Button variant="outline" className="flex-1 h-11 gap-2 border-warning/50 text-warning hover:bg-warning/10">
          <Pause className="w-4 h-4" />
          Tạm ngưng
        </Button>
      </div>
    </div>
  );
};

export default ReviewingPanel;
