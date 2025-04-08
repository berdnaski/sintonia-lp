"use client";

import Memories from "./_components/memories";
import { DailySummary } from "./_components/daily-summary";
import { PendingQuestions } from "./_components/pending-questions";
import { RecentSignals } from "./_components/recent-signals";
import { Header } from "./_components/header";
import withCouple from "@/layouts/with-couple";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4">
      <Header />

      <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <DailySummary />
        <PendingQuestions />
        <RecentSignals />
      </div>

      <Memories />
    </div>
  );
}

export default withCouple(Dashboard)
