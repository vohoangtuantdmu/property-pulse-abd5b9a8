import { MapPin, Eye, Heart, Phone, ExternalLink, ShieldCheck, TrendingUp, ArrowDownFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PublishedPanelProps {
  listing: { title: string; customer: string; address: string };
}

const stats = [
  { icon: "👀", label: "Lượt xem", value: "1,204" },
  { icon: "❤️", label: "Lượt lưu", value: "45" },
  { icon: "📞", label: "Lượt gọi", value: "12" },
];

const PublishedPanel = ({ listing }: PublishedPanelProps) => {
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
        <Badge className="bg-success/15 text-success border-success/30 gap-1.5 px-3 py-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Đã Thẩm Định Pháp Lý & Giá AI
        </Badge>
      </div>

      {/* Mini Analytics */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Price Comparison */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            So sánh Giá Niêm Yết & Dự Đoán AI
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">Giá Niêm Yết (Chủ nhà)</p>
              <p className="text-2xl font-bold text-foreground">8.5 tỷ</p>
              <p className="text-xs text-muted-foreground">VNĐ</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/20">
              <p className="text-xs text-primary mb-1">Giá AI Dự Đoán (KNN)</p>
              <p className="text-2xl font-bold text-primary">8.2 tỷ</p>
              <p className="text-xs text-muted-foreground">VNĐ · Sai lệch: -3.5%</p>
            </div>
          </div>
          <div className="mt-3 bg-success/5 border border-success/20 rounded-lg p-2.5 text-center">
            <p className="text-xs text-success font-medium">✅ Giá niêm yết nằm trong biên độ hợp lý (±5%)</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 h-11 gap-2">
          <ExternalLink className="w-4 h-4" />
          🌐 Xem tin thực tế trên Portal Khách hàng
        </Button>
        <Button variant="outline" className="flex-1 h-11 gap-2 border-destructive/50 text-destructive hover:bg-destructive/10">
          <ArrowDownFromLine className="w-4 h-4" />
          Gỡ tin (Unpublish)
        </Button>
      </div>
    </div>
  );
};

export default PublishedPanel;
