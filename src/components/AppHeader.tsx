import { Building2, Search, PlusCircle, Settings } from "lucide-react";
import type { CustomerTab } from "@/pages/Index";

export type AppMode = "broker" | "customer" | "admin";

interface AppHeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  customerTab?: CustomerTab;
  onCustomerTabChange?: (tab: CustomerTab) => void;
}

const AppHeader = ({ mode, onModeChange, customerTab, onCustomerTabChange }: AppHeaderProps) => {
  return (
    <header className={`h-14 border-b flex items-center justify-between px-5 shrink-0 z-50 ${
      mode === "admin" ? "bg-slate-900 border-slate-700" : "border-border bg-card"
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          mode === "admin" ? "bg-amber-500" : "bg-primary"
        }`}>
          <Building2 className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        <span className={`font-bold text-lg tracking-tight ${
          mode === "admin" ? "text-white" : "text-foreground"
        }`}>
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

      <div className={`flex items-center rounded-lg p-0.5 gap-0.5 ${
        mode === "admin" ? "bg-slate-800" : "bg-muted"
      }`}>
        <button
          onClick={() => onModeChange("customer")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === "customer"
              ? "bg-primary text-primary-foreground shadow-sm"
              : mode === "admin"
                ? "text-slate-400 hover:text-slate-200"
                : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Khách hàng
        </button>
        <button
          onClick={() => onModeChange("broker")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === "broker"
              ? "bg-primary text-primary-foreground shadow-sm"
              : mode === "admin"
                ? "text-slate-400 hover:text-slate-200"
                : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Chuyên viên
        </button>
        <button
          onClick={() => onModeChange("admin")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
            mode === "admin"
              ? "bg-amber-500 text-slate-900 shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Admin Hệ Thống
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
