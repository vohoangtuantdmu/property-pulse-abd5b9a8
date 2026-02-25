import { ShieldCheck, MapPin, FileText, Download, Building, Layers, Ruler } from "lucide-react";
import LegalGISMap from "./LegalGISMap";

const LegalGISContent = () => {
  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel */}
      <div className="w-[420px] border-r border-border bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="animate-fade-in">
            {/* Header */}
            <div className="p-5 border-b border-border">
              <h2 className="text-base font-bold text-foreground">
                Thông tin Quy hoạch & Pháp lý
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kết quả tra cứu quy hoạch tại vị trí đã chọn
              </p>
            </div>

            {/* Coordinate */}
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Tọa độ: 10.9804, 106.6745</span>
              </div>

              {/* Status Badge */}
              <div className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-success shrink-0" />
                <div>
                  <p className="text-sm font-bold text-success">Tình trạng: An Toàn</p>
                  <p className="text-xs text-success/80 font-medium mt-0.5">
                    Đất ở đô thị (ODT) — Phù hợp xây dựng nhà ở
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="p-5 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Thông số Quy hoạch Chi tiết
              </p>
              <div className="space-y-2.5">
                <InfoRow
                  icon={Building}
                  label="Mật độ xây dựng"
                  value="80%"
                />
                <InfoRow
                  icon={Layers}
                  label="Tầng cao tối đa"
                  value="5 tầng"
                />
                <InfoRow
                  icon={Ruler}
                  label="Hệ số sử dụng đất"
                  value="4.0"
                />
              </div>
            </div>

            {/* Legal Documents */}
            <div className="p-5 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Văn bản đính kèm
              </p>
              <div className="space-y-2">
                <DocumentLink
                  title="Bản đồ quy hoạch 1/500"
                  type="PDF"
                />
                <DocumentLink
                  title="Quyết định phê duyệt số 123/QĐ-UBND"
                  type="PDF"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="p-5">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">
                <Download className="w-4 h-4" />
                Xuất trích lục quy hoạch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 relative">
        <LegalGISMap />
      </div>
    </div>
  );
};

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-muted rounded-lg px-4 py-3">
      <div className="flex items-center gap-2.5">
        <Icon className="w-4 h-4 text-accent" />
        <span className="text-sm text-foreground/80">{label}</span>
      </div>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

function DocumentLink({ title, type }: { title: string; type: string }) {
  return (
    <button className="w-full flex items-center gap-3 bg-muted/60 hover:bg-muted rounded-lg px-4 py-3 transition-colors text-left group">
      <FileText className="w-4 h-4 text-accent shrink-0" />
      <span className="text-sm text-foreground font-medium flex-1">{title}</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">
        {type}
      </span>
    </button>
  );
}

export default LegalGISContent;
