"use client"

interface AvatarProps {
  emotion: "focused" | "confused" | "bored" | "happy"
}

export default function Avatar({ emotion }: AvatarProps) {
  const emotionConfig = {
    focused: {
      eyes: "○ ○",
      mouth: "─",
      message: "¡Mantén la concentración!",
      gradient: "from-primary to-secondary",
    },
    confused: {
      eyes: "◐ ◑",
      mouth: "~",
      message: "Parece que necesitas ayuda...",
      gradient: "from-accent to-secondary",
    },
    bored: {
      eyes: "- -",
      mouth: "─",
      message: "¡Vamos, tú puedes!",
      gradient: "from-muted to-muted-foreground",
    },
    happy: {
      eyes: "◉ ◉",
      mouth: "∪",
      message: "¡Excelente respuesta!",
      gradient: "from-primary via-accent to-secondary",
    },
  }

  const config = emotionConfig[emotion]

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`relative w-48 h-48 rounded-full border-4 border-white bg-gradient-to-br ${config.gradient} flex items-center justify-center y2k-glow shadow-2xl`}
      >
        {/* Face */}
        <div className="text-center space-y-4">
          {/* Eyes */}
          <div className="text-4xl font-bold text-white drop-shadow-lg">{config.eyes}</div>

          {/* Mouth */}
          <div className="text-3xl text-white drop-shadow-lg">{config.mouth}</div>
        </div>

        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl animate-pulse" />
      </div>

      {/* Message */}
      <div className="text-center space-y-2 y2k-card max-w-xs">
        <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {config.message}
        </p>
        <p className="text-sm text-muted-foreground">Tu avatar está aquí para guiarte</p>
      </div>
    </div>
  )
}
