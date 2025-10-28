"use client"

interface StudentStatsProps {
  onStartSession: () => void
}

export default function StudentStats({ onStartSession }: StudentStatsProps) {
  const stats = {
    totalPoints: 2450,
    level: 5,
    streak: 12,
    badges: 8,
    courses: [
      { name: "Matemáticas", progress: 75, points: 850, color: "#a18cd1" },
      { name: "Ciencias", progress: 60, points: 620, color: "#60a5fa" },
      { name: "Literatura", progress: 85, points: 980, color: "#fbc2eb" },
    ],
  }

  const statCards = [
    { label: "Puntos Totales", value: stats.totalPoints, icon: "✨" },
    { label: "Nivel", value: `${stats.level}`, icon: "🎯" },
    { label: "Racha", value: `${stats.streak} días`, icon: "🔥" },
    { label: "Insignias", value: stats.badges, icon: "🏆" },
  ]

  return (
    <div className="space-y-8 p-6">
      <div className="glass-card animate-float">
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Mejorando contraste del texto principal */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Bienvenido de Vuelta
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-blue-100 drop-shadow-md">
              Continúa tu viaje de aprendizaje emocional
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="glass-badge">🎓 Estudiante Activo</div>
            <div className="glass-badge">⚡ Racha de {stats.streak} Días</div>
          </div>

          <button onClick={onStartSession} className="glass-button animate-glow">
            Comenzar a Aprender
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="glass-card hover:scale-105 transition-transform">
            <div className="space-y-4 text-center">
              <div className="text-5xl">{stat.icon}</div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">{stat.label}</p>
              <p className="text-5xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="pb-4">
          <h2 className="glass-subheading">Progreso por Área</h2>
          <p className="glass-text mt-2">Tu desempeño en cada materia</p>
        </div>

        <div className="grid gap-6">
          {stats.courses.map((course, idx) => (
            <div key={idx} className="glass-card">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold text-white">{course.name}</h3>
                  <div className="glass-badge text-lg font-bold">{course.points} PTS</div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div
                    className="w-full h-6 rounded-full overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${course.progress}%`,
                        background: course.color,
                        boxShadow: `0 0 20px ${course.color}80`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-white">{course.progress}% Completado</p>
                    <p className="text-lg font-semibold text-white">
                      {Math.round((course.progress / 100) * 100)} / 100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card animate-glow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <h3 className="text-4xl md:text-5xl font-bold text-white">¿Listo para Aprender?</h3>
            <p className="glass-text text-xl">
              Inicia una sesión interactiva con retroalimentación emocional en tiempo real
            </p>
          </div>
          <button onClick={onStartSession} className="glass-button whitespace-nowrap text-xl px-10 py-5">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
