"use client"

export default function SessionHistory() {
  const sessions = [
    {
      id: 1,
      date: "Hoy",
      subject: "Matemáticas",
      score: 90,
      duration: "45 min",
      emotion: "happy",
    },
    {
      id: 2,
      date: "Ayer",
      subject: "Literatura",
      score: 95,
      duration: "52 min",
      emotion: "focused",
    },
    {
      id: 3,
      date: "Hace 2 días",
      subject: "Ciencias",
      score: 78,
      duration: "38 min",
      emotion: "confused",
    },
    {
      id: 4,
      date: "Hace 3 días",
      subject: "Matemáticas",
      score: 85,
      duration: "41 min",
      emotion: "focused",
    },
    {
      id: 5,
      date: "Hace 4 días",
      subject: "Historia",
      score: 72,
      duration: "35 min",
      emotion: "bored",
    },
  ]

  const emotionEmoji = {
    happy: "😊",
    focused: "🎯",
    confused: "🤔",
    bored: "😐",
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Área</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Duración</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Emoción</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Puntuación</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 text-sm">{session.date}</td>
                  <td className="px-6 py-4 text-sm font-medium">{session.subject}</td>
                  <td className="px-6 py-4 text-sm">{session.duration}</td>
                  <td className="px-6 py-4 text-lg">{emotionEmoji[session.emotion as keyof typeof emotionEmoji]}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      {session.score}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
