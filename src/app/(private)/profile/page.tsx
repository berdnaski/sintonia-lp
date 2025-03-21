"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DecorativeDots, DecorativeGrid } from "@/components/decorative";
import { useCouple } from "@/hooks/use-couple";
import { useAuth } from "@/hooks/use-auth";
import api from "@/services/api";
import type { SignalResponse } from "@/repositories/signals-repository";
import { signalRepository } from "@/repositories/signals-repository";
import { ProfileHeader } from "@/components/profile/profile-header";
import { RelationshipMetrics } from "@/components/profile/relationship-metrics";
import { RecentSignals } from "@/components/profile/recent-signals";
import { NextSteps } from "@/components/profile/next-steps";
import { SubscriptionCard } from "@/components/profile/subscription-card";
import { ActivityHistory } from "@/components/profile/activity-history";

export default function ProfilePage() {
  const [signals, setSignals] = useState<SignalResponse[] | null>(null);
  const [connectionScore, setConnectionScore] = useState(78);
  const [activeTab, setActiveTab] = useState("overview");
  const [relationshipDuration, setRelationshipDuration] = useState<string>("Carregando...");
  const { user } = useAuth();
  const { couple } = useCouple();

  useEffect(() => {
    const fetchSignals = async () => {
      if (couple?.id) {
        try {
          const signalsData = await signalRepository.getSignals(couple.id);
          setSignals(signalsData);
        } catch (error) {
          console.error("Error fetching signals:", error);
          setSignals([]);
        }
      }
    };

    fetchSignals();
  }, [couple?.id]);

  useEffect(() => {
    if (couple?.createdAt) {
      const startDate = new Date(couple.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);

      const duration =
        diffMonths > 0
          ? `${diffMonths} ${diffMonths === 1 ? "mês" : "meses"}`
          : `${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;

      setRelationshipDuration(duration);
    } else {
      setRelationshipDuration("Relacionamento não iniciado");
    }
  }, [couple?.createdAt]);

  const handleRedirectToBillingPortal = async () => {
    const response = await api.get(`/portal/stripe/${user.id}`);
    window.location.href = response.data;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative pt-8 pb-20 px-4 bg-gradient-to-b from-[#F1DDE6] to-white">
        <DecorativeGrid variant="pink" size="md" position="left" className="top-0 opacity-30" />
        <DecorativeDots variant="pink" rows={3} cols={3} className="absolute right-[5%] top-12 hidden md:grid" />

        <div className="max-w-5xl mx-auto relative z-10">
          <ProfileHeader 
            user={user} 
            relationshipDuration={relationshipDuration} 
            connectionScore={connectionScore} 
          />
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 -mt-10 relative z-20">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8 bg-white shadow-md rounded-xl p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Atividades
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <RelationshipMetrics />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <RecentSignals signals={signals} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <NextSteps activities={[
                  { text: "Exercício de comunicação não-verbal", type: "Atividade", date: "Hoje" },
                  { text: "Conversa sobre expectativas futuras", type: "Diálogo", date: "Amanhã" },
                  { text: "Análise de padrões de comunicação", type: "Insight", date: "Em 3 dias" }
                ]} />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ActivityHistory />
            </motion.div>
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
