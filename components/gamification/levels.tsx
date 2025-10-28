"use client"

export default function Levels() {
  const currentLevel = 5
  const currentExp = 2450
  const nextLevelExp = 3000
  const expProgress = (currentExp / nextLevelExp) * 100

  const levels = [
    { level: 1, title: "Aprendiz", minExp: 0, icon: "🌱" },
    { level: 2, title: "Estudiante", minExp: 500, icon: "📖" },
    { level: 3, title: "Dedicado", minExp: 1200, icon: "💪" },
    { level: 4, title: "Experto", minExp: 2000, icon: "🎓" },
    { level: 5, title: "Maestro", minExp: 3000, icon: "👨‍🏫" },
    { level: 6, title: "Sabio", minExp: 4500, icon: "🧙" },
    { level: 7, title: "Leyenda", minExp: 6000, icon: "⚡" },
    { level: 8, title: "Inmortal", minExp: 8000, icon: "👑" },
  ]

  return (
    <div className="space-y-8">
      {/* Current Level */}
      <div className="rounded-xl border border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Nivel Actual</p>
            <h2 className="text-4xl font-bold">{currentLevel}</h2>
            <p className="text-lg text-primary mt-1">{levels[currentLevel - 1].title}</p>
          </div>
          <div className="text-6xl">{levels[currentLevel - 1].icon}</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Experiencia</span>
            <span className="font-medium">
              {currentExp} / {nextLevelExp}
            </span>
          </div>
          <div className="w-full bg-primary/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all"
              style={{ width: `${expProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{Math.round(expProgress)}% para el siguiente nivel</p>
        </div>
      </div>

      {/* Level Progression */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Progresión de Niveles</h3>
        <div className="grid gap-3">
          {levels.map((level) => (
            <div
              key={level.level}
              className={`rounded-lg border p-4 transition-all ${
                level.level <= currentLevel
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-muted/30 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{level.icon}</div>
                  <div>
                    <p className="font-semibold">Nivel {level.level}</p>
                    <p className="text-sm text-muted-foreground">{level.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{level.minExp} XP</p>
                  {level.level <= currentLevel && <p className="text-xs text-primary">Desbloqueado</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
