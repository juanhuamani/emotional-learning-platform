"use client"

export default function EmotionAnalytics() {
  const emotionStats = [
    { emotion: "Enfocado", emoji: "🎯", percentage: 45, color: "from-primary to-primary" },
    { emotion: "Feliz", emoji: "😊", percentage: 30, color: "from-accent to-accent" },
    { emotion: "Confundido", emoji: "🤔", percentage: 15, color: "from-yellow-500 to-yellow-600" },
    { emotion: "Aburrido", emoji: "😐", percentage: 10, color: "from-gray-500 to-gray-600" },
  ]

  const emotionTrends = [
    { week: "Semana 1", focused: 40, happy: 35, confused: 15, bored: 10 },
    { week: "Semana 2", focused: 42, happy: 32, confused: 16, bored: 10 },
    { week: "Semana 3", focused: 45, happy: 30, confused: 15, bored: 10 },
    { week: "Semana 4", focused: 45, happy: 30, confused: 15, bored: 10 },
  ]

  return (
    <div className="space-y-6">
      {/* Emotion Distribution */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <h3 className="text-xl font-bold mb-6">Distribución de Emociones</h3>
        <div className="space-y-4">
          {emotionStats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{stat.emoji}</span>
                  <span className="font-medium">{stat.emotion}</span>
                </div>
                <span className="font-bold text-primary">{stat.percentage}%</span>
              </div>
              <div className="w-full bg-primary/10 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${stat.color} h-3 rounded-full`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <h3 className="font-semibold mb-4">Emoción Dominante</h3>
          <div className="text-center space-y-2">
            <div className="text-5xl">🎯</div>
            <p className="text-2xl font-bold">Enfocado</p>
            <p className="text-sm text-muted-foreground">45% de tus sesiones</p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <h3 className="font-semibold mb-4">Mejora Emocional</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Enfoque</span>
              <span className="font-bold text-primary">+5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Felicidad</span>
              <span className="font-bold text-accent">-5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Confusión</span>
              <span className="font-bold">0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <h3 className="font-semibold mb-6">Tendencia Mensual</h3>
        <div className="space-y-4">
          {emotionTrends.map((trend, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-sm font-medium">{trend.week}</p>
              <div className="flex gap-1 h-8">
                <div
                  className="bg-gradient-to-r from-primary to-primary rounded flex-1"
                  style={{ opacity: trend.focused / 50 }}
                  title={`Enfocado: ${trend.focused}%`}
                />
                <div
                  className="bg-gradient-to-r from-accent to-accent rounded flex-1"
                  style={{ opacity: trend.happy / 50 }}
                  title={`Feliz: ${trend.happy}%`}
                />
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded flex-1"
                  style={{ opacity: trend.confused / 50 }}
                  title={`Confundido: ${trend.confused}%`}
                />
                <div
                  className="bg-gradient-to-r from-gray-500 to-gray-600 rounded flex-1"
                  style={{ opacity: trend.bored / 50 }}
                  title={`Aburrido: ${trend.bored}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
