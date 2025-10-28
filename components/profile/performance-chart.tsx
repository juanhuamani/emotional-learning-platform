"use client"

export default function PerformanceChart() {
  const performanceData = [
    { subject: "Matemáticas", score: 85, sessions: 8, trend: "up" },
    { subject: "Ciencias", score: 78, sessions: 6, trend: "up" },
    { subject: "Literatura", score: 92, sessions: 7, trend: "stable" },
    { subject: "Historia", score: 75, sessions: 3, trend: "down" },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <h3 className="text-xl font-bold mb-6">Desempeño por Área</h3>
        <div className="space-y-4">
          {performanceData.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-xs text-muted-foreground">({item.sessions} sesiones)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">{item.score}%</span>
                  <span className="text-lg">{item.trend === "up" ? "📈" : item.trend === "down" ? "📉" : "➡️"}</span>
                </div>
              </div>
              <div className="w-full bg-primary/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <h3 className="font-semibold mb-4">Actividad Semanal</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sab", "Dom"].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t transition-all hover:opacity-80"
                  style={{ height: `${Math.random() * 100 + 20}%` }}
                />
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <h3 className="font-semibold mb-4">Tiempo Dedicado</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Esta semana</span>
              <span className="font-bold">4.5 horas</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Este mes</span>
              <span className="font-bold">18.5 horas</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Promedio diario</span>
              <span className="font-bold">46 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
