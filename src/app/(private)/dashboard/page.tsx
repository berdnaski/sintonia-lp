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

      <main>
      <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 items-start">
        <DailySummary />
        <div className="space-y-4">
          <PendingQuestions />
          <RecentSignals />
        </div>
      </div>

      <Memories />
    </main>
    </div>
  );
}

export default withCouple(Dashboard)
