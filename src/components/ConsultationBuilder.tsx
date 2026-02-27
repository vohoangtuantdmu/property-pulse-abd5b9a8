import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Mail, MessageCircle, Bold, Italic, Underline } from "lucide-react";

export interface ReportSettings {
  showGISMap: boolean;
  showComparables: boolean;
  hideOwnerInfo: boolean;
  loanRatio: number;
  loanYears: number;
  brokerComment: string;
}

interface Props {
  settings: ReportSettings;
  onChange: (s: ReportSettings) => void;
}

const ConsultationBuilder = ({ settings, onChange }: Props) => {
  const update = (patch: Partial<ReportSettings>) => onChange({ ...settings, ...patch });

  const propertyValue = 6850; // triệu
  const loanAmount = Math.round(propertyValue * settings.loanRatio / 100);
  const monthlyRate = 8.5 / 100 / 12;
  const totalMonths = settings.loanYears * 12;
  const monthlyPayment = loanAmount > 0
    ? Math.round(loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths)))
    : 0;

  return (
    <div className="w-full h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border shrink-0">
        <h2 className="text-sm font-bold text-foreground">Công cụ Xây dựng Báo cáo</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Tuỳ chỉnh nội dung và kịch bản tài chính</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {/* Section 1: Content Toggles */}
        <section>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
            Tùy chỉnh Nội dung
          </h3>
          <div className="space-y-3">
            <ToggleRow
              label="Hiển thị Bản đồ Quy hoạch (GIS)"
              checked={settings.showGISMap}
              onCheckedChange={(v) => update({ showGISMap: v })}
            />
            <ToggleRow
              label="Hiển thị Danh sách BĐS so sánh (KNN)"
              checked={settings.showComparables}
              onCheckedChange={(v) => update({ showComparables: v })}
            />
            <ToggleRow
              label="Ẩn thông tin Chủ nhà gốc (Privacy)"
              checked={settings.hideOwnerInfo}
              onCheckedChange={(v) => update({ hideOwnerInfo: v })}
            />
          </div>
        </section>

        {/* Section 2: Financial Scenarios */}
        <section>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
            Tư vấn Kịch bản Vay
          </h3>
          <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-foreground">Tỷ lệ vay</span>
                <span className="text-xs font-bold text-primary">{settings.loanRatio}%</span>
              </div>
              <Slider
                value={[settings.loanRatio]}
                onValueChange={([v]) => update({ loanRatio: v })}
                min={0} max={80} step={5}
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                Khoản vay: {loanAmount.toLocaleString()} Triệu VND
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-foreground">Thời hạn vay</span>
                <span className="text-xs font-bold text-primary">{settings.loanYears} năm</span>
              </div>
              <Slider
                value={[settings.loanYears]}
                onValueChange={([v]) => update({ loanYears: v })}
                min={5} max={30} step={1}
              />
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Gốc + Lãi hàng tháng (ước tính)</span>
                <span className="font-bold text-accent">{monthlyPayment.toLocaleString()} Triệu</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Broker Comment */}
        <section>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
            Nhận xét & Đề xuất Đầu tư
          </h3>
          <div className="flex gap-1 mb-2">
            <button className="p-1.5 rounded hover:bg-muted transition-colors">
              <Bold className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-muted transition-colors">
              <Italic className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-muted transition-colors">
              <Underline className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <Textarea
            className="text-xs min-h-[100px] resize-none"
            value={settings.brokerComment}
            onChange={(e) => update({ brokerComment: e.target.value })}
          />
        </section>
      </div>

      {/* Section 4: Export Actions */}
      <div className="px-5 py-4 border-t border-border shrink-0 space-y-2">
        <Button className="w-full gap-2" size="sm">
          <Download className="w-4 h-4" />
          Tải xuống PDF
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1 gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Gửi Email cho Khách
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            Gửi qua Zalo
          </Button>
        </div>
      </div>
    </div>
  );
};

function ToggleRow({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-xs text-foreground group-hover:text-primary transition-colors">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

export default ConsultationBuilder;
