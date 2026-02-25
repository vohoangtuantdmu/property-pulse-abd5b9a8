import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BrokerSidebar, { type BrokerTab } from "@/components/BrokerSidebar";
import BrokerContent from "@/components/BrokerContent";
import LegalGISContent from "@/components/LegalGISContent";
import FinanceAIContent from "@/components/FinanceAIContent";
import ReportContent from "@/components/ReportContent";
import CustomerContent from "@/components/CustomerContent";
import PostListingContent from "@/components/PostListingContent";
import ListingManagement from "@/components/ListingManagement";

export type CustomerTab = "search" | "post";

const Index = () => {
  const [mode, setMode] = useState<"broker" | "customer">("broker");
  const [brokerTab, setBrokerTab] = useState<BrokerTab>("listings");
  const [customerTab, setCustomerTab] = useState<CustomerTab>("post");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader mode={mode} onModeChange={setMode} customerTab={customerTab} onCustomerTabChange={setCustomerTab} />
      <div className="flex-1 flex min-h-0">
        {mode === "broker" && (
          <BrokerSidebar activeTab={brokerTab} onTabChange={setBrokerTab} />
        )}
        {mode === "broker" ? (
          brokerTab === "survey" ? (
            <BrokerContent />
          ) : brokerTab === "legal" ? (
            <LegalGISContent />
          ) : brokerTab === "finance" ? (
            <FinanceAIContent />
          ) : brokerTab === "reports" ? (
            <ReportContent />
          ) : brokerTab === "listings" ? (
            <ListingManagement />
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
