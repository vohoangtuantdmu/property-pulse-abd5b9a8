import { Building2, Search, PlusCircle } from "lucide-react";
import type { CustomerTab } from "@/pages/Index";

interface AppHeaderProps {
  mode: "broker" | "customer";
  onModeChange: (mode: "broker" | "customer") => void;
  customerTab?: CustomerTab;
  onCustomerTabChange?: (tab: CustomerTab) => void;
}

const AppHeader = ({ mode, onModeChange, customerTab, onCustomerTabChange }: AppHeaderProps) => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-5 shrink-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Building2 className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight text-foreground">
          RealDSS
        </span>

        {mode === "customer" && onCustomerTabChange && (
          <div className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5 ml-4">
            <button
              onClick={() => onCustomerTabChange("search")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                customerTab === "search"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Tìm kiếm
            </button>
            <button
              onClick={() => onCustomerTabChange("post")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                customerTab === "post"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Đăng Tin BĐS
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5">
        <button
          onClick={() => onModeChange("broker")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === "broker"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Chế độ Chuyên viên
        </button>
        <button
          onClick={() => onModeChange("customer")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === "customer"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Chế độ Khách hàng
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
