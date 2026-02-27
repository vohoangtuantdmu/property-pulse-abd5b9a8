import { useState } from "react";
import AppHeader, { type AppMode } from "@/components/AppHeader";
import BrokerSidebar, { type BrokerTab } from "@/components/BrokerSidebar";
import AdminSidebar, { type AdminTab } from "@/components/AdminSidebar";
import BrokerContent from "@/components/BrokerContent";
import LegalGISContent from "@/components/LegalGISContent";
import FinanceAIContent from "@/components/FinanceAIContent";
import ReportContent from "@/components/ReportContent";
import CustomerContent from "@/components/CustomerContent";
import PostListingContent from "@/components/PostListingContent";
import ListingManagement from "@/components/ListingManagement";
import DashboardContent from "@/components/DashboardContent";
import BrokerManagement from "@/components/admin/BrokerManagement";
import GISLegalData from "@/components/admin/GISLegalData";
import SystemParameters from "@/components/admin/SystemParameters";
import SystemOverview from "@/components/admin/SystemOverview";

export type CustomerTab = "search" | "post";

const Index = () => {
  const [mode, setMode] = useState<AppMode>("broker");
  const [brokerTab, setBrokerTab] = useState<BrokerTab>("reports");
  const [customerTab, setCustomerTab] = useState<CustomerTab>("post");
  const [adminTab, setAdminTab] = useState<AdminTab>("brokers");

  const renderAdminContent = () => {
    switch (adminTab) {
      case "overview": return <SystemOverview />;
      case "brokers": return <BrokerManagement />;
      case "gis": return <GISLegalData />;
      case "params": return <SystemParameters />;
      default: return <BrokerManagement />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader mode={mode} onModeChange={setMode} customerTab={customerTab} onCustomerTabChange={setCustomerTab} />
      <div className="flex-1 flex min-h-0">
        {mode === "broker" && (
          <BrokerSidebar activeTab={brokerTab} onTabChange={setBrokerTab} />
        )}
        {mode === "admin" && (
          <AdminSidebar activeTab={adminTab} onTabChange={setAdminTab} />
        )}
        {mode === "admin" ? (
          renderAdminContent()
        ) : mode === "broker" ? (
          brokerTab === "dashboard" ? (
            <DashboardContent onNavigate={setBrokerTab} />
          ) : brokerTab === "survey" ? (
            <BrokerContent />
          ) : brokerTab === "legal" ? (
            <LegalGISContent />
          ) : brokerTab === "finance" ? (
            <FinanceAIContent />
          ) : brokerTab === "reports" ? (
            <ReportContent />
          ) : brokerTab === "listings" ? (
            <ListingManagement onNavigate={setBrokerTab} />
          ) : (
            <BrokerContent />
          )
        ) : customerTab === "post" ? (
          <PostListingContent />
        ) : (
          <CustomerContent />
        )}
      </div>
    </div>
  );
};

export default Index;
