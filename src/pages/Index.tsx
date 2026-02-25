import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BrokerSidebar, { type BrokerTab } from "@/components/BrokerSidebar";
import BrokerContent from "@/components/BrokerContent";
import LegalGISContent from "@/components/LegalGISContent";
import FinanceAIContent from "@/components/FinanceAIContent";
import CustomerContent from "@/components/CustomerContent";

const Index = () => {
  const [mode, setMode] = useState<"broker" | "customer">("broker");
  const [brokerTab, setBrokerTab] = useState<BrokerTab>("finance");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader mode={mode} onModeChange={setMode} />
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
          ) : (
            <BrokerContent />
          )
        ) : (
          <CustomerContent />
        )}
      </div>
    </div>
  );
};

export default Index;
