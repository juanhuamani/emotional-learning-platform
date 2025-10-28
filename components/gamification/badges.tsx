"use client"

export default function Badges() {
  const badges = [
    { id: 1, name: "Primer Paso", description: "Completa tu primera sesión", icon: "🎯", unlocked: true },
    { id: 2, name: "Racha de Fuego", description: "Mantén 7 días de racha", icon: "🔥", unlocked: true },
    { id: 3, name: "Matemático", description: "Completa 10 sesiones de matemáticas", icon: "🧮", unlocked: true },
    { id: 4, name: "Lector Ávido", description: "Completa 10 sesiones de literatura", icon: "📚", unlocked: false },
    { id: 5, name: "Científico", description: "Completa 10 sesiones de ciencias", icon: "🔬", unlocked: false },
    { id: 6, name: "Maestro", description: "Alcanza nivel 10", icon: "👑", unlocked: false },
    { id: 7, name: "Perfeccionista", description: "Obtén 100% en 5 sesiones", icon: "⭐", unlocked: false },
    { id: 8, name: "Campeón", description: "Sé #1 en el ranking", icon: "🏆", unlocked: false },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`rounded-xl border p-6 text-center transition-all ${
            badge.unlocked
              ? "border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10"
              : "border-border/50 bg-muted/30 opacity-50"
          }`}
        >
          <div className="text-5xl mb-3">{badge.icon}</div>
          <h3 className="font-semibold mb-1">{badge.name}</h3>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {badge.unlocked && <div className="mt-3 text-xs font-medium text-primary">Desbloqueado</div>}
        </div>
      ))}
    </div>
  )
}
