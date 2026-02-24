import { Building2, ToggleLeft, ToggleRight } from "lucide-react";

interface AppHeaderProps {
  mode: "broker" | "customer";
  onModeChange: (mode: "broker" | "customer") => void;
}

const AppHeader = ({ mode, onModeChange }: AppHeaderProps) => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-5 shrink-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Building2 className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight text-foreground">
          RealDSS
        </span>
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
