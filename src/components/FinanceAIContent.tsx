import { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  Landmark,
  CreditCard,
  Percent,
  CalendarClock,
  Sparkles,
  BarChart3,
  Users,
} from "lucide-react";

const comparables = [
  { address: "Hẻm 5m Lê Hồng Phong, Thủ Dầu Một", area: 110, price: 6.5, priceM2: 59.1 },
  { address: "Đường Yersin, P. Hiệp Thành", area: 130, price: 7.2, priceM2: 55.4 },
  { address: "Hẻm xe hơi Phú Lợi, TP TDM", area: 105, price: 6.1, priceM2: 58.1 },
  { address: "Đường 30/4, P. Phú Hòa", area: 125, price: 7.0, priceM2: 56.0 },
  { address: "Hẻm 6m Nguyễn Tri Phương, TDM", area: 118, price: 6.8, priceM2: 57.6 },
];

const featureImportance = [
  { label: "Vị trí", value: 92 },
  { label: "Diện tích", value: 74 },
  { label: "Pháp lý", value: 61 },
  { label: "Khoảng cách TT", value: 53 },
  { label: "Mặt tiền", value: 38 },
];

const FinanceAIContent = () => {
  const [area, setArea] = useState(120);
  const [distance, setDistance] = useState(4.5);
  const [frontage, setFrontage] = useState("5");
  const [legal, setLegal] = useState("ODT");
  const [algorithm, setAlgorithm] = useState("KNN");
  const [hasRun, setHasRun] = useState(true);

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel - Model Parameters */}
      <div className="w-[380px] border-r border-border bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Brain className="w-4.5 h-4.5 text-accent" />
              Tham số Mô hình Định giá
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Điều chỉnh đặc trưng đầu vào cho mô hình AI
            </p>
          </div>

          <div className="p-5 space-y-5">
            {/* Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Diện tích (m²)</label>
                <span className="text-sm font-bold text-accent">{area} m²</span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Khoảng cách đến TT (km)</label>
                <span className="text-sm font-bold text-accent">{distance.toFixed(1)} km</span>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                value={distance * 10}
                onChange={(e) => setDistance(Number(e.target.value) / 10)}
                className="w-full h-2 rounded-full appearance-none bg-muted accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0 km</span>
                <span>20 km</span>
              </div>
            </div>

            {/* Frontage */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mặt tiền (m)</label>
              <input
                type="number"
                value={frontage}
                onChange={(e) => setFrontage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition"
              />
            </div>

            {/* Legal Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tình trạng Pháp lý</label>
              <select
                value={legal}
                onChange={(e) => setLegal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition appearance-none"
              >
                <option value="ODT">Đất ở đô thị (ODT)</option>
                <option value="CLN">Đất nông nghiệp (CLN)</option>
                <option value="ONT">Đất ở nông thôn (ONT)</option>
              </select>
            </div>

            {/* Algorithm */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Thuật toán AI</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition appearance-none"
              >
                <option value="KNN">K-Nearest Neighbors (KNN)</option>
                <option value="XGBoost">XGBoost</option>
                <option value="RF">Random Forest</option>
              </select>
            </div>

            {/* Run Button */}
            <button
              onClick={() => setHasRun(true)}
              className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-xl py-3 text-sm font-semibold hover:bg-accent/90 transition-colors mt-2"
            >
              <Sparkles className="w-4 h-4" />
              Chạy Mô hình Định giá
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Dashboard */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
        {hasRun ? (
          <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
            {/* Prediction Hero */}
            <div className="bg-primary rounded-2xl p-6 text-center">
              <p className="text-xs text-primary-foreground/60 font-semibold uppercase tracking-widest mb-1">
                Giá Dự Đoán · AI Valuation
              </p>
              <p className="text-5xl font-extrabold text-primary-foreground tracking-tight">
                6.85 <span className="text-2xl font-bold">Tỷ VND</span>
              </p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-primary-foreground/70 font-medium">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Độ chính xác: 92%
                </span>
                <span>|</span>
                <span>Biên độ dao động: ± 200 Triệu</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-primary-foreground/10 rounded-full px-3 py-1 text-[11px] text-primary-foreground/80 font-medium">
                <Brain className="w-3 h-3" />
                K-Nearest Neighbors · K=5 · R²=0.94
              </div>
            </div>

            {/* Two Column Cards */}
            <div className="grid grid-cols-2 gap-5">
              {/* Feature Importance */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-bold text-foreground">Mức độ ảnh hưởng đến giá</h3>
                </div>
                <div className="space-y-3">
                  {featureImportance.map((f) => (
                    <div key={f.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-foreground/70 font-medium">{f.label}</span>
                        <span className="text-xs font-bold text-foreground">{f.value}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-700"
                          style={{ width: `${f.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KNN Comparables */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-bold text-foreground">Các BĐS tương đồng (K=5)</h3>
                </div>
                <div className="space-y-2">
                  {comparables.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-muted/60 rounded-lg px-3 py-2.5"
                    >
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="text-xs font-medium text-foreground truncate">{c.address}</p>
                        <p className="text-[11px] text-muted-foreground">{c.area}m² · {c.priceM2} tr/m²</p>
                      </div>
                      <span className="text-sm font-bold text-accent whitespace-nowrap">{c.price} Tỷ</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loan Simulation */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-bold text-foreground">Gợi ý Gói vay (70% giá trị BĐS)</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Landmark className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Khoản vay</p>
                  <p className="text-lg font-extrabold text-foreground">4.79 <span className="text-xs font-medium">Tỷ</span></p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Percent className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Lãi suất tham khảo</p>
                  <p className="text-lg font-extrabold text-foreground">8.5<span className="text-xs font-medium">%/năm</span></p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <CalendarClock className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Trả góp dự kiến</p>
                  <p className="text-lg font-extrabold text-foreground">45 <span className="text-xs font-medium">Tr/tháng</span></p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">Điều chỉnh tham số và nhấn "Chạy Mô hình" để xem kết quả</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceAIContent;
