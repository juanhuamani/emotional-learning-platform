"use client"

import { useState } from "react"
import StudentStats from "@/components/dashboard/student-stats"
import LearningSession from "@/components/dashboard/learning-session"
import Gamification from "@/components/gamification/gamification"
import StudentProfile from "@/components/profile/student-profile"

interface DashboardProps {
  user: { id: string; name: string; email: string } | null
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "session" | "gamification" | "profile">("dashboard")

  return (
    <div className="min-h-screen">
      <nav className="glass-nav sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-white font-black text-xl animate-glow">
                E
              </div>
              <span className="text-2xl font-bold text-white">EmoLearn</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  currentView === "dashboard"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                    : "glass-badge hover:scale-105"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("gamification")}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  currentView === "gamification"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                    : "glass-badge hover:scale-105"
                }`}
              >
                Logros
              </button>
              <button
                onClick={() => setCurrentView("profile")}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  currentView === "profile"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                    : "glass-badge hover:scale-105"
                }`}
              >
                Perfil
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-bold border-l-2 border-primary/30 pl-4">
                <p className="text-lg text-white">{user?.name}</p>
                <p className="text-xs text-slate-300">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="glass-badge hover:bg-destructive/20 hover:border-destructive/40 hover:scale-105"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {currentView === "dashboard" ? (
          <StudentStats onStartSession={() => setCurrentView("session")} />
        ) : currentView === "session" ? (
          <LearningSession onBack={() => setCurrentView("dashboard")} />
        ) : currentView === "gamification" ? (
          <Gamification />
        ) : (
          <StudentProfile />
        )}
      </main>
    </div>
  )
}
