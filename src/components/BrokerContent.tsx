import { MapPin, Search } from "lucide-react";

const BrokerContent = () => {
  return (
    <div className="flex-1 flex min-h-0">
      {/* Left Panel - Data Input */}
      <div className="w-[420px] border-r border-border bg-card p-6 overflow-y-auto shrink-0">
        <h2 className="text-lg font-bold text-foreground mb-1">
          Thông tin BĐS Khảo sát
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Nhập thông tin bất động sản để bắt đầu định giá
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
                placeholder="Nhập địa chỉ hoặc tọa độ GPS"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Loại hình BĐS
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition appearance-none">
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
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition"
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition shadow-sm mt-2">
            <div className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Bắt đầu Khảo sát
            </div>
          </button>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 relative bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Map placeholder styled like a real map */}
          <div className="absolute inset-0 bg-[#e8ecf1]" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}>
            {/* Simulated map elements */}
            <div className="absolute top-4 left-4 bg-card rounded-lg shadow-md px-3 py-2 text-xs font-medium text-foreground border border-border">
              📍 TP. Hồ Chí Minh, Việt Nam
            </div>

            {/* Fake roads */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="40%" x2="100%" y2="35%" stroke="hsl(215 25% 15%)" strokeWidth="3"/>
              <line x1="30%" y1="0" x2="35%" y2="100%" stroke="hsl(215 25% 15%)" strokeWidth="2"/>
              <line x1="60%" y1="0" x2="65%" y2="100%" stroke="hsl(215 25% 15%)" strokeWidth="2"/>
              <line x1="0" y1="70%" x2="100%" y2="75%" stroke="hsl(215 25% 15%)" strokeWidth="2"/>
              <path d="M 10% 20% Q 40% 10% 70% 30% T 95% 50%" fill="none" stroke="hsl(210 60% 60%)" strokeWidth="4" opacity="0.5"/>
            </svg>

            {/* Map pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="flex flex-col items-center animate-fade-in">
                <div className="bg-destructive rounded-full w-4 h-4 shadow-lg border-2 border-card" />
                <div className="w-0.5 h-3 bg-destructive/60" />
              </div>
            </div>

            {/* Zoom controls */}
            <div className="absolute right-4 bottom-4 flex flex-col bg-card rounded-lg shadow-md border border-border overflow-hidden">
              <button className="px-3 py-2 text-foreground hover:bg-muted text-sm font-bold border-b border-border">+</button>
              <button className="px-3 py-2 text-foreground hover:bg-muted text-sm font-bold">−</button>
            </div>

            {/* Scale */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-16 h-0.5 bg-foreground/30" />
              <span>500m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerContent;
