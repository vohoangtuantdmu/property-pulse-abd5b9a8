import { useState } from "react";
import { FileText, MapPin, Play, ShieldCheck, Brain, MessageSquare, CheckCircle, AlertTriangle, Clock, Eye, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { BrokerTab } from "@/components/BrokerSidebar";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const statusTabs = [
  { label: "Tất cả", count: 8, key: "all" },
  { label: "Chờ Duyệt", count: 1, key: "pending", notify: true },
  { label: "Đang Kiểm Định", count: 2, key: "reviewing" },
  { label: "Yêu cầu chỉnh sửa", count: 1, key: "edit" },
  { label: "Đã Đăng", count: 4, key: "published" },
];

const listings = [
  {
    id: 1,
    title: "Nhà phố 123 Lê Lợi",
    customer: "Nguyễn Văn A",
    status: "Mới gửi",
    area: "100 m²",
    address: "123 Lê Lợi, Quận 1",
    time: "5 phút trước",
    image: property1,
    active: true,
  },
  {
    id: 2,
    title: "Chung cư Vinhomes Q7",
    customer: "Trần Thị B",
    status: "Đang kiểm định",
    area: "75 m²",
    address: "Quận 7, TP. HCM",
    time: "2 giờ trước",
    image: property2,
    active: false,
  },
  {
    id: 3,
    title: "Đất nền Thủ Đức",
    customer: "Lê Văn C",
    status: "Đang kiểm định",
    area: "200 m²",
    address: "Thủ Đức, TP. HCM",
    time: "1 ngày trước",
    image: property3,
    active: false,
  },
];

const extractedData = [
  { label: "Địa chỉ", value: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM" },
  { label: "Số tờ bản đồ", value: "15" },
  { label: "Số thửa", value: "42" },
  { label: "Diện tích", value: "100 m²" },
  { label: "Mục đích sử dụng", value: "Đất ở đô thị (ODT)" },
  { label: "Chủ sở hữu", value: "Nguyễn Văn A" },
];

interface ListingManagementProps {
  onNavigate?: (tab: BrokerTab) => void;
}

const ListingManagement = ({ onNavigate }: ListingManagementProps) => {
  const [activeStatus, setActiveStatus] = useState("pending");
  const [loading, setLoading] = useState<string | null>(null);

  const handleDSSAction = (label: string, targetTab: BrokerTab) => {
    setLoading(label);
    setTimeout(() => {
      setLoading(null);
      onNavigate?.(targetTab);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            <p className="text-sm font-semibold text-foreground">Đang xử lý dữ liệu...</p>
            <p className="text-xs text-muted-foreground">{loading}</p>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="border-b border-border bg-card px-5 py-0 shrink-0">
        <div className="flex items-center gap-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveStatus(tab.key)}
              className={`relative px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeStatus === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {tab.notify ? (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                  {tab.count}
                </span>
              ) : (
                <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex min-h-0">
        {/* Left - Request List */}
        <div className="w-80 border-r border-border bg-card overflow-y-auto shrink-0">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="w-3.5 h-3.5" />
              <span>Lọc theo: Chờ Duyệt</span>
            </div>
          </div>
          {listings.map((item) => (
            <div
              key={item.id}
              className={`p-3 border-b border-border cursor-pointer transition-all hover:shadow-sm ${
                item.active
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">KH: {item.customer}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <Badge
                      variant={item.active ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {item.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Verification Workspace */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Nhà phố 123 Lê Lợi</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Quận 1, TP. HCM — Khách hàng: Nguyễn Văn A
              </p>
            </div>
            <Badge className="bg-warning/15 text-warning-foreground border-warning/30 gap-1">
              <Clock className="w-3 h-3" />
              Chờ Duyệt
            </Badge>
          </div>

          {/* Section 1: Data Comparison */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                So sánh Dữ liệu — Sổ Hồng & Dữ liệu AI trích xuất
              </h3>
            </div>
            <div className="flex">
              {/* Uploaded Image */}
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
              {/* Extracted Data */}
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

          {/* Section 2: DSS Action Buttons */}
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

          {/* Section 3: Final Decision */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Quyết định Chuyên viên
            </h3>
            <Textarea
              placeholder="Ghi chú của Chuyên viên (Nội bộ) — VD: Đã xác minh pháp lý, giá phù hợp thị trường..."
              rows={3}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button className="flex-1 h-11 gap-2 bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 text-[hsl(var(--success-foreground))]">
                <CheckCircle className="w-4 h-4" />
                ✅ Phê Duyệt & Xuất Bản
              </Button>
              <Button variant="outline" className="flex-1 h-11 gap-2 border-[hsl(var(--warning))]/50 text-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))]/10">
                <AlertTriangle className="w-4 h-4" />
                ⚠️ Yêu Cầu Chỉnh Sửa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingManagement;
