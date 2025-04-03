"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DecorativeDots, DecorativeGrid } from "@/components/decorative";
import { useAuth } from "@/hooks/use-auth";
import api from "@/services/api";
import { SubscriptionCard } from "@/components/profile/subscription-card";
import Avatar from "./_components/avatar";
import Info from "./_components/info";
import { PersonalInformation } from "./_components/personal-information";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal_information");
  const { user } = useAuth();

  const handleRedirectToBillingPortal = async () => {
    const response = await api.get(`/portal/stripe/${user.id}`);
    window.location.href = response.data;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative pt-8 pb-20 px-4 bg-gradient-to-b from-[#F1DDE6] to-white">
        <DecorativeGrid variant="pink" size="md" position="left" className="top-0 opacity-30" />
        <DecorativeDots variant="pink" rows={3} cols={3} className="absolute right-[5%] top-12 hidden md:grid" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar user={user} />
            <Info user={user} />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 -mt-10 relative z-20 overflow-x-auto">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex overflow-x-auto whitespace-nowrap mb-8 bg-white shadow-md rounded-xl p-1 w-full max-w-full scrollbar-hide gap-1 justify-start">
            <TabsTrigger value="personal_information" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Informações pessoais
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal_information">
            <PersonalInformation />
          </TabsContent>

          <TabsContent value="settings">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <SubscriptionCard user={user} onManageSubscription={handleRedirectToBillingPortal} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
