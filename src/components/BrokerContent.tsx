import { useState, useCallback } from "react";
import { MapPin, Search, Loader2, TrendingUp, Calendar, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import SurveyMap from "./SurveyMap";
import { generateMockProperties, type MockProperty } from "@/lib/mockData";

const BrokerContent = () => {
  const [formData, setFormData] = useState({
    type: "Nhà phố",
    area: "",
    beds: "",
    floors: "",
  });
  const [targetPosition, setTargetPosition] = useState<[number, number] | null>(null);
  const [properties, setProperties] = useState<MockProperty[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      setTargetPosition([lat, lng]);
      setIsSearching(true);
      setShowResults(false);

      // Simulate API delay
      setTimeout(() => {
        const mockData = generateMockProperties(lat, lng, 7);
        setProperties(mockData);
        setIsSearching(false);
        setShowResults(true);
      }, 1200);
    },
    []
  );

  const handleReset = () => {
    setTargetPosition(null);
    setProperties([]);
    setShowResults(false);
    setIsSearching(false);
  };

  const avgPricePerM2 =
    properties.length > 0
      ? (properties.reduce((s, p) => s + p.pricePerM2, 0) / properties.length).toFixed(1)
      : "0";

  const avgPrice =
    properties.length > 0
      ? (properties.reduce((s, p) => s + p.price, 0) / properties.length).toFixed(1)
      : "0";

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel */}
      <div className="w-[420px] border-r border-border bg-card flex flex-col shrink-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {/* Input Form */}
          {!showResults && !isSearching && (
            <div className="p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-foreground mb-1">
                Thông tin BĐS Khảo sát
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Nhập thông tin, sau đó nhấp vào bản đồ để chọn vị trí
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Địa chỉ / Tọa độ
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Nhấp vào bản đồ để chọn vị trí →"
                      readOnly
                      value={
                        targetPosition
                          ? `${targetPosition[0].toFixed(5)}, ${targetPosition[1].toFixed(5)}`
                          : ""
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Loại hình BĐS
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition appearance-none"
                  >
                    <option>Nhà phố</option>
                    <option>Chung cư</option>
                    <option>Đất nền</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Diện tích (m²)
                    </label>
                    <input
                      type="number"
                      placeholder="VD: 100"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Số phòng ngủ
                    </label>
                    <input
                      type="number"
                      placeholder="VD: 3"
                      value={formData.beds}
                      onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Số tầng
                  </label>
                  <input
                    type="number"
                    placeholder="VD: 4"
                    value={formData.floors}
                    onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition"
                  />
                </div>

                <div className="pt-2 border-t border-border mt-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    Nhấp vào bản đồ bên phải để bắt đầu khảo sát bán kính
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="p-6 flex flex-col items-center justify-center h-full animate-fade-in">
              <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
              <p className="text-sm font-semibold text-foreground">Đang tìm kiếm dữ liệu...</p>
              <p className="text-xs text-muted-foreground mt-1">Radius Search API · Bán kính 2km</p>
            </div>
          )}

          {/* Results Panel */}
          {showResults && (
            <div className="animate-fade-in">
              {/* Header */}
              <div className="p-5 border-b border-border">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition mb-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Khảo sát mới
                </button>
                <h2 className="text-base font-bold text-foreground">
                  Kết quả Khảo sát Khu vực
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Bán kính 2km · {properties.length} BĐS tương đương
                </p>
              </div>

              {/* Summary Metrics */}
              <div className="p-5 border-b border-border space-y-3">
                <div className="bg-primary rounded-xl p-4">
                  <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-wider mb-1">
                    Giá trung bình khu vực
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-primary-foreground">
                      {avgPricePerM2}
                    </span>
                    <span className="text-sm text-primary-foreground/70 font-medium">triệu/m²</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-muted-foreground font-medium">TB giá BĐS</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{avgPrice} <span className="text-xs font-medium text-muted-foreground">Tỷ</span></p>
                  </div>
                  <div className="bg-muted rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-muted-foreground font-medium">Giao dịch</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {properties.filter((p) => p.status === "Đã bán").length}
                      <span className="text-xs font-medium text-muted-foreground"> / {properties.length}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Property List */}
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  Danh sách BĐS so sánh
                </p>
                <div className="space-y-2">
                  {properties.map((p, i) => (
                    <div
                      key={p.id}
                      className={`rounded-xl border p-3.5 cursor-pointer transition-all ${
                        highlightedId === p.id
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border hover:border-accent/40 hover:bg-muted/50"
                      }`}
                      onMouseEnter={() => setHighlightedId(p.id)}
                      onMouseLeave={() => setHighlightedId(null)}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="text-sm font-bold text-accent">{p.price} Tỷ</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            p.status === "Đã bán"
                              ? "bg-success/15 text-success"
                              : "bg-accent/15 text-accent"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-foreground font-medium mb-1 leading-snug line-clamp-1">
                        {p.address}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{p.area}m²</span>
                        <span className="font-semibold text-foreground">{p.pricePerM2} tr/m²</span>
                        <span>{p.transactionDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 relative">
        {/* Map instruction overlay */}
        {!targetPosition && !isSearching && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-card/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-border flex items-center gap-2.5 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Nhấp vào bản đồ để chọn vị trí BĐS mục tiêu
            </span>
          </div>
        )}

        <SurveyMap
          targetPosition={targetPosition}
          properties={properties}
          onMapClick={handleMapClick}
          onPropertyHover={setHighlightedId}
          highlightedId={highlightedId}
        />
      </div>
    </div>
  );
};

export default BrokerContent;
