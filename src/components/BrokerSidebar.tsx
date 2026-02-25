import {
  LayoutDashboard,
  ClipboardCheck,
  Scale,
  BrainCircuit,
  FileText,
  Megaphone,
} from "lucide-react";

export type BrokerTab = "dashboard" | "survey" | "legal" | "finance" | "reports" | "listings";

const navItems: { icon: React.ComponentType<{ className?: string }>; label: string; tab: BrokerTab }[] = [
  { icon: LayoutDashboard, label: "Tổng quan Dashboard", tab: "dashboard" },
  { icon: ClipboardCheck, label: "Khảo sát & Định giá", tab: "survey" },
  { icon: Scale, label: "Kiểm tra Quy hoạch/Pháp lý", tab: "legal" },
  { icon: BrainCircuit, label: "Phân tích Tài chính AI", tab: "finance" },
  { icon: FileText, label: "Báo cáo & Tư vấn", tab: "reports" },
  { icon: Megaphone, label: "Quản lý Tin đăng", tab: "listings" },
];

interface BrokerSidebarProps {
  activeTab: BrokerTab;
  onTabChange: (tab: BrokerTab) => void;
}

const BrokerSidebar = ({ activeTab, onTabChange }: BrokerSidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
      <div className="p-4 border-b border-sidebar-border">
        <p className="text-xs uppercase tracking-widest text-sidebar-muted font-semibold">
          Điều hướng
        </p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeTab === item.tab
                ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-accent-foreground">
            NV
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">Nguyễn Văn A</p>
            <p className="text-xs text-sidebar-muted">Chuyên viên Định giá</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BrokerSidebar;
