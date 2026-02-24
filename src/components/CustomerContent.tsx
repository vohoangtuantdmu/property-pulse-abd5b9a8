import { Search, SlidersHorizontal, ShieldCheck, MapPin, Maximize2, BedDouble } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const properties = [
  { image: property1, price: "5.2 Tỷ", area: "100m²", beds: 4, address: "Quận 2, TP. Hồ Chí Minh", type: "Nhà phố", verified: true },
  { image: property2, price: "3.8 Tỷ", area: "75m²", beds: 3, address: "Quận 7, TP. Hồ Chí Minh", type: "Chung cư", verified: true },
  { image: property3, price: "12.5 Tỷ", area: "250m²", beds: 5, address: "Quận 9, TP. Hồ Chí Minh", type: "Biệt thự", verified: true },
  { image: property4, price: "7.1 Tỷ", area: "85m²", beds: 3, address: "Bình Thạnh, TP. HCM", type: "Nhà phố", verified: false },
  { image: property5, price: "4.5 Tỷ", area: "120m²", beds: 3, address: "Quận 1, TP. Hồ Chí Minh", type: "Penthouse", verified: true },
  { image: property6, price: "2.1 Tỷ", area: "200m²", beds: 0, address: "Thủ Đức, TP. HCM", type: "Đất nền", verified: false },
];

const CustomerContent = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Search */}
      <div className="bg-primary px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            Tìm kiếm Bất động sản Thông minh
          </h1>
          <p className="text-primary-foreground/70 mb-8 text-sm">
            Dữ liệu thẩm định bởi AI — Minh bạch — Đáng tin cậy
          </p>

          <div className="bg-card rounded-xl p-2 shadow-lg flex items-center gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nhập địa điểm, quận, phường..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 border border-input"
              />
            </div>
            <select className="px-4 py-3 rounded-lg text-sm bg-background text-foreground border border-input focus:outline-none min-w-[140px]">
              <option>Khoảng giá</option>
              <option>Dưới 2 Tỷ</option>
              <option>2 - 5 Tỷ</option>
              <option>5 - 10 Tỷ</option>
              <option>Trên 10 Tỷ</option>
            </select>
            <select className="px-4 py-3 rounded-lg text-sm bg-background text-foreground border border-input focus:outline-none min-w-[140px]">
              <option>Loại hình</option>
              <option>Nhà phố</option>
              <option>Chung cư</option>
              <option>Đất nền</option>
              <option>Biệt thự</option>
            </select>
            <button className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition flex items-center gap-2 shadow-sm">
              <Search className="w-4 h-4" />
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">BĐS nổi bật</h2>
            <p className="text-sm text-muted-foreground">6 kết quả phù hợp</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition">
            <SlidersHorizontal className="w-4 h-4" />
            Bộ lọc
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground border border-border/50">
                    {p.type}
                  </span>
                </div>
                {p.verified && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-success text-success-foreground text-xs font-semibold flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      Đã Thẩm Định
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg font-bold text-accent">{p.price}</span>
                  <span className="text-xs text-muted-foreground font-medium">VND</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    {p.area}
                  </span>
                  {p.beds > 0 && (
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3 h-3" />
                      {p.beds} PN
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {p.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerContent;
