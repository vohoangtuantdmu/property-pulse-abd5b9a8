import {
  LayoutDashboard,
  Users,
  Map,
  SlidersHorizontal,
} from "lucide-react";

export type AdminTab = "overview" | "brokers" | "gis" | "params";

const navItems: { icon: React.ComponentType<{ className?: string }>; label: string; tab: AdminTab }[] = [
  { icon: LayoutDashboard, label: "Tổng quan Hệ thống", tab: "overview" },
  { icon: Users, label: "Quản lý Chuyên viên", tab: "brokers" },
  { icon: Map, label: "Cập nhật Dữ liệu GIS & Pháp lý", tab: "gis" },
  { icon: SlidersHorizontal, label: "Cấu hình Tham số (Lãi suất & AI)", tab: "params" },
];

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-700">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Quản trị Hệ thống
        </p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeTab === item.tab
                ? "bg-slate-700/80 text-white border-l-2 border-amber-500"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">
            HT
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Hoàng Tuấn</p>
            <p className="text-xs text-slate-500">Admin / Trưởng nhóm</p>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-3">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            DSS Real Estate V1.0
          </p>
          <p className="text-[9px] text-slate-600 leading-relaxed mt-0.5">
            Developed by: Hoàng Tuấn, Tuấn Kiệt, Minh Quân, Minh Nhật, Quốc Thái
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
