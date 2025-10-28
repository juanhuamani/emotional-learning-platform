"use client"

export default function Leaderboard() {
  const leaderboard = [
    { rank: 1, name: "Carlos M.", points: 5230, level: 7, badge: "👑" },
    { rank: 2, name: "María G.", points: 4890, level: 6, badge: "⭐" },
    { rank: 3, name: "Juan P.", points: 4650, level: 6, badge: "⭐" },
    { rank: 4, name: "Tú", points: 2450, level: 5, badge: "🎯", isUser: true },
    { rank: 5, name: "Ana L.", points: 2340, level: 5, badge: "🎯" },
    { rank: 6, name: "Luis R.", points: 2100, level: 4, badge: "🎓" },
    { rank: 7, name: "Sofia T.", points: 1890, level: 4, badge: "🎓" },
    { rank: 8, name: "Diego H.", points: 1650, level: 3, badge: "💪" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-sm text-muted-foreground mb-2">Tu Posición</p>
          <p className="text-3xl font-bold text-primary">#4</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-sm text-muted-foreground mb-2">Puntos Totales</p>
          <p className="text-3xl font-bold text-accent">2,450</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-sm text-muted-foreground mb-2">Diferencia al #1</p>
          <p className="text-3xl font-bold">2,780</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="px-6 py-4 text-left text-sm font-semibold">Posición</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Estudiante</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Nivel</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-primary/10 transition-colors ${
                    entry.isUser ? "bg-primary/10" : "hover:bg-primary/5"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">#{entry.rank}</span>
                      {entry.rank <= 3 && <span className="text-lg">🏅</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.badge}</span>
                      <span className="font-medium">{entry.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      Nivel {entry.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">{entry.points.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
