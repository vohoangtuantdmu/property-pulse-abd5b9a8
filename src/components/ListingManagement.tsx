import { useState } from "react";
import { Filter, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BrokerTab } from "@/components/BrokerSidebar";
import PendingPanel from "@/components/listing-panels/PendingPanel";
import ReviewingPanel from "@/components/listing-panels/ReviewingPanel";
import EditRequestPanel from "@/components/listing-panels/EditRequestPanel";
import PublishedPanel from "@/components/listing-panels/PublishedPanel";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

type StatusKey = "all" | "pending" | "reviewing" | "edit" | "published";

const statusTabs = [
  { label: "Tất cả", count: 7, key: "all" as StatusKey },
  { label: "Chờ Duyệt", count: 2, key: "pending" as StatusKey, notify: true },
  { label: "Đang Kiểm Định", count: 1, key: "reviewing" as StatusKey },
  { label: "Yêu cầu chỉnh sửa", count: 1, key: "edit" as StatusKey },
  { label: "Đã Đăng", count: 3, key: "published" as StatusKey },
];

interface ListingItem {
  id: number;
  title: string;
  customer: string;
  status: string;
  statusKey: StatusKey;
  area: string;
  address: string;
  time: string;
  image: string;
}

const allListings: ListingItem[] = [
  { id: 1, title: "Nhà phố Lê Lợi", customer: "Nguyễn Văn A", status: "Mới gửi", statusKey: "pending", area: "100 m²", address: "123 Lê Lợi, Quận 1, TP. HCM", time: "10 phút trước", image: property1 },
  { id: 2, title: "Căn hộ Sunrise Q7", customer: "Phạm Thị D", status: "Mới gửi", statusKey: "pending", area: "65 m²", address: "Quận 7, TP. HCM", time: "25 phút trước", image: property2 },
  { id: 3, title: "Biệt thự Quận 9", customer: "Trần Thị B", status: "Đang xử lý", statusKey: "reviewing", area: "250 m²", address: "Quận 9, TP. HCM", time: "2 giờ trước", image: property3 },
  { id: 4, title: "Đất nền Bình Dương", customer: "Nguyễn Văn A", status: "Thiếu thông tin", statusKey: "edit", area: "200 m²", address: "Thuận An, Bình Dương", time: "1 ngày trước", image: property4 },
  { id: 5, title: "Chung cư cao cấp Thảo Điền", customer: "Lê Văn C", status: "Đã thẩm định AI", statusKey: "published", area: "120 m²", address: "Thảo Điền, TP. Thủ Đức", time: "3 ngày trước", image: property5 },
  { id: 6, title: "Nhà mặt tiền Nguyễn Huệ", customer: "Hoàng Minh E", status: "Đã thẩm định AI", statusKey: "published", area: "90 m²", address: "Quận 1, TP. HCM", time: "5 ngày trước", image: property6 },
  { id: 7, title: "Shophouse Vinhomes Grand Park", customer: "Trần Quốc F", status: "Đã thẩm định AI", statusKey: "published", area: "85 m²", address: "Quận 9, TP. HCM", time: "1 tuần trước", image: property1 },
];

const statusLabelMap: Record<StatusKey, string> = {
  all: "Tất cả",
  pending: "Chờ Duyệt",
  reviewing: "Đang Kiểm Định",
  edit: "Yêu cầu chỉnh sửa",
  published: "Đã Đăng",
};

interface ListingManagementProps {
  onNavigate?: (tab: BrokerTab) => void;
}

const ListingManagement = ({ onNavigate }: ListingManagementProps) => {
  const [activeStatus, setActiveStatus] = useState<StatusKey>("pending");
  const [activeListingId, setActiveListingId] = useState<number | null>(null);

  const filteredListings = activeStatus === "all"
    ? allListings
    : allListings.filter((l) => l.statusKey === activeStatus);

  // Auto-select first item when switching tabs
  const effectiveActiveId = activeListingId && filteredListings.some((l) => l.id === activeListingId)
    ? activeListingId
    : filteredListings[0]?.id ?? null;

  const activeListing = allListings.find((l) => l.id === effectiveActiveId);

  const handleTabChange = (key: StatusKey) => {
    setActiveStatus(key);
    setActiveListingId(null); // reset to auto-select first
  };

  const badgeVariant = (statusKey: StatusKey) => {
    switch (statusKey) {
      case "pending": return "bg-warning/15 text-warning border-warning/30";
      case "reviewing": return "bg-primary/10 text-primary border-primary/30";
      case "edit": return "bg-destructive/10 text-destructive border-destructive/30";
      case "published": return "bg-success/15 text-success border-success/30";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const renderPanel = () => {
    if (!activeListing) return <div className="flex-1 flex items-center justify-center text-muted-foreground">Chọn một hồ sơ để xem</div>;

    const listingData = { title: activeListing.title, customer: activeListing.customer, address: activeListing.address };

    switch (activeListing.statusKey) {
      case "pending":
        return <PendingPanel listing={listingData} onNavigate={onNavigate} />;
      case "reviewing":
        return <ReviewingPanel listing={listingData} />;
      case "edit":
        return <EditRequestPanel listing={listingData} />;
      case "published":
        return <PublishedPanel listing={listingData} />;
      default:
        return <PendingPanel listing={listingData} onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Status Tabs */}
      <div className="border-b border-border bg-card px-5 py-0 shrink-0">
        <div className="flex items-center gap-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`relative px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeStatus === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {tab.notify ? (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                  {tab.count}
                </span>
              ) : (
                <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex min-h-0">
        {/* Left - Request List */}
        <div className="w-80 border-r border-border bg-card overflow-y-auto shrink-0">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="w-3.5 h-3.5" />
              <span>Lọc theo: {statusLabelMap[activeStatus]}</span>
            </div>
          </div>
          {filteredListings.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">Không có hồ sơ nào</div>
          )}
          {filteredListings.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveListingId(item.id)}
              className={`p-3 border-b border-border cursor-pointer transition-all hover:shadow-sm ${
                item.id === effectiveActiveId
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">KH: {item.customer}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <Badge className={`text-[10px] px-1.5 py-0 ${badgeVariant(item.statusKey)}`}>
                      {item.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Dynamic Panel */}
        {renderPanel()}
      </div>
    </div>
  );
};

export default ListingManagement;
