"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DecorativeDots, DecorativeGrid } from "@/components/decorative";
import { useCouple } from "@/hooks/use-couple";
import type { SignalResponse } from "@/repositories/signals-repository";
import { signalRepository } from "@/repositories/signals-repository";
import { RecentSignals } from "@/components/profile/recent-signals";
import { NextSteps } from "@/components/profile/next-steps";
import { CoupleMetrics } from "./_components/couple-metrics";
import { ActivityHistory } from "@/components/profile/activity-history";
import Info from "./_components/info";
import ConnectionScore from "./_components/connection-score";
import { CoupleInformation } from "./_components/couple-information";
import withCouple from "@/layouts/with-couple";

function CouplePage() {
  const [signals, setSignals] = useState<Signal[]>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { couple, fetchMetrics } = useCouple();

  const fetchSignals = async () => {
    if (couple?.id) {
      try {
        const signalsData = await signalRepository.getSignals(couple.id, {
          perPage: 4
        });

        setSignals(signalsData.data);
      } catch (error) {
        setSignals([]);
      }
    }
  };

  useEffect(() => {
    if (!couple) {
      return
    }

    fetchSignals()
    fetchMetrics()
  }, [couple]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative pt-8 pb-20 px-4 bg-gradient-to-b from-[#F1DDE6] to-white">
        <DecorativeGrid variant="pink" size="md" position="left" className="top-0 opacity-30" />
        <DecorativeDots variant="pink" rows={3} cols={3} className="absolute right-[5%] top-12 hidden md:grid" />

        <div className="max-w-5xl mx-auto relative z-10 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Info />
            <ConnectionScore />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 -mt-10 relative z-20 overflow-x-auto">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex overflow-x-auto whitespace-nowrap mb-8 bg-white shadow-md rounded-xl p-1 w-full max-w-full scrollbar-hide gap-1 justify-start">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Atividades
            </TabsTrigger>
            <TabsTrigger value="couple_information" className="data-[state=active]:bg-[#FF006F] data-[state=active]:text-white">
              Informações do casal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <CoupleMetrics />
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

          <TabsContent value="couple_information">
            <CoupleInformation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default withCouple(CouplePage);
