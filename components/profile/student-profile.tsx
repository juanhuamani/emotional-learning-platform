"use client"

import { useState } from "react"
import SessionHistory from "@/components/profile/session-history"
import EmotionAnalytics from "@/components/profile/emotion-analytics"
import PerformanceChart from "@/components/profile/performance-chart"

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "emotions">("overview")

  const userStats = {
    name: "Juan Pérez",
    email: "juan@example.com",
    joinDate: "15 de Enero, 2025",
    totalSessions: 24,
    totalHours: 18.5,
    averageScore: 82,
    currentStreak: 12,
    totalPoints: 2450,
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="y2k-heading">Mi Perfil</h1>
        <p className="text-muted-foreground text-lg">Visualiza tu progreso y estadísticas de aprendizaje</p>
      </div>

      <div className="y2k-card">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Nombre</p>
              <h2 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {userStats.name}
              </h2>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Email</p>
              <p className="text-lg font-medium">{userStats.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-bold">Miembro desde</p>
              <p className="text-lg font-medium">{userStats.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2 font-bold">Sesiones</p>
              <p className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {userStats.totalSessions}
              </p>
            </div>
            <div className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/10 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2 font-bold">Horas</p>
              <p className="text-4xl font-black bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                {userStats.totalHours}
              </p>
            </div>
            <div className="rounded-3xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2 font-bold">Promedio</p>
              <p className="text-4xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {userStats.averageScore}%
              </p>
            </div>
            <div className="rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2 font-bold">Racha</p>
              <p className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {userStats.currentStreak}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: "overview", label: "Resumen" },
          { id: "history", label: "Historial" },
          { id: "emotions", label: "Emociones" },
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
        {activeTab === "overview" && <PerformanceChart />}
        {activeTab === "history" && <SessionHistory />}
        {activeTab === "emotions" && <EmotionAnalytics />}
      </div>
    </div>
  )
}
