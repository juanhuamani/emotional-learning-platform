"use client"

import { useState } from "react"
import Badges from "@/components/gamification/badges"
import Leaderboard from "@/components/gamification/leaderboard"
import Levels from "@/components/gamification/levels"

export default function Gamification() {
  const [activeTab, setActiveTab] = useState<"badges" | "levels" | "leaderboard">("badges")

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="y2k-heading">Sistema de Logros</h1>
        <p className="text-muted-foreground text-lg">
          Desbloquea insignias, sube de nivel y compite con otros estudiantes
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: "badges", label: "Insignias" },
          { id: "levels", label: "Niveles" },
          { id: "leaderboard", label: "Ranking" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105 y2k-glow"
                : "bg-white border-2 border-primary/30 text-foreground hover:border-primary/50 hover:scale-105"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "badges" && <Badges />}
        {activeTab === "levels" && <Levels />}
        {activeTab === "leaderboard" && <Leaderboard />}
      </div>
    </div>
  )
}
