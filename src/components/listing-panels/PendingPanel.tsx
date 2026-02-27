import { FileText, Eye, Play, ShieldCheck, MapPin, Brain, Rocket, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BrokerTab } from "@/components/BrokerSidebar";
import { useState } from "react";

const extractedData = [
  { label: "Địa chỉ", value: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM" },
  { label: "Số tờ bản đồ", value: "15" },
  { label: "Số thửa", value: "42" },
  { label: "Diện tích", value: "100 m²" },
  { label: "Mục đích sử dụng", value: "Đất ở đô thị (ODT)" },
  { label: "Chủ sở hữu", value: "Nguyễn Văn A" },
];

interface PendingPanelProps {
  onNavigate?: (tab: BrokerTab) => void;
  listing: { title: string; customer: string; address: string };
}

const PendingPanel = ({ onNavigate, listing }: PendingPanelProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [assigned, setAssigned] = useState(false);

  const handleDSSAction = (label: string, targetTab: BrokerTab) => {
    setLoading(label);
    setTimeout(() => {
      setLoading(null);
      onNavigate?.(targetTab);
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 relative">
      {loading && (
        <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            <p className="text-sm font-semibold text-foreground">Đang xử lý dữ liệu...</p>
            <p className="text-xs text-muted-foreground">{loading}</p>
          </div>
        </div>
      )}

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
          <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
          Chờ Duyệt
        </Badge>
      </div>

      {/* Assign Action */}
      {!assigned && (
        <Button
          className="w-full h-12 gap-2 text-sm font-semibold"
          onClick={() => setAssigned(true)}
        >
          <Rocket className="w-5 h-5" />
          🚀 Bắt đầu quy trình Kiểm Định (Assign to me)
        </Button>
      )}

      {assigned && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-primary font-medium text-center">
          ✅ Đã nhận — Bạn đang phụ trách hồ sơ này
        </div>
      )}

      {/* Data Comparison */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            So sánh Dữ liệu — Sổ Hồng & Dữ liệu AI trích xuất
          </h3>
        </div>
        <div className="flex">
          <div className="w-1/2 p-4 border-r border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Sổ Hồng (Ảnh gốc)</p>
            <div className="bg-muted rounded-lg aspect-[3/4] flex items-center justify-center border border-border">
              <div className="text-center space-y-2">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto" />
                <p className="text-xs text-muted-foreground">so-hong-bds.pdf</p>
                <p className="text-[10px] text-muted-foreground/60">Tài liệu đã tải lên</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Dữ liệu AI trích xuất</p>
            <div className="space-y-2.5">
              {extractedData.map((d) => (
                <div key={d.label} className="flex items-start gap-2">
                  <span className="text-xs text-muted-foreground w-28 shrink-0 pt-0.5">{d.label}:</span>
                  <span className="text-sm font-medium text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DSS Tools (shown after assigned) */}
      {assigned && (
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            Công cụ Thẩm định DSS
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-xs font-medium hover:border-primary/50 hover:bg-primary/5 transition-all" onClick={() => handleDSSAction("Chạy Khảo Sát Giá (Bán kính 2km)", "survey")}>
              <ShieldCheck className="w-5 h-5 text-primary" />
              Chạy Khảo Sát Giá
              <span className="text-[10px] text-muted-foreground font-normal">(Bán kính 2km)</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-xs font-medium hover:border-primary/50 hover:bg-primary/5 transition-all" onClick={() => handleDSSAction("Kiểm tra Bản đồ Quy hoạch (GIS)", "legal")}>
              <MapPin className="w-5 h-5 text-primary" />
              Kiểm tra Bản đồ Quy hoạch
              <span className="text-[10px] text-muted-foreground font-normal">(GIS)</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-xs font-medium hover:border-primary/50 hover:bg-primary/5 transition-all" onClick={() => handleDSSAction("Khởi chạy AI Định Giá (GNN/CNN)", "finance")}>
              <Brain className="w-5 h-5 text-primary" />
              Khởi chạy AI Định Giá
              <span className="text-[10px] text-muted-foreground font-normal">(GNN/CNN)</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPanel;
