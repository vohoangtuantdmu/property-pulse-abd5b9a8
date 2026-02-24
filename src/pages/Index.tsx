import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BrokerSidebar from "@/components/BrokerSidebar";
import BrokerContent from "@/components/BrokerContent";
import CustomerContent from "@/components/CustomerContent";

const Index = () => {
  const [mode, setMode] = useState<"broker" | "customer">("broker");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AppHeader mode={mode} onModeChange={setMode} />
      <div className="flex-1 flex min-h-0">
        {mode === "broker" && <BrokerSidebar />}
        {mode === "broker" ? <BrokerContent /> : <CustomerContent />}
      </div>
    </div>
  );
};

export default Index;
