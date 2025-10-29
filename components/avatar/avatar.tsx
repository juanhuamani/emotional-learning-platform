"use client";

interface AvatarProps {
  emotion: "focused" | "confused" | "bored" | "happy" | "angry" | "disgusted";
  message?: string;
  showAttention?: boolean;
  attentionLevel?: number;
}

export default function Avatar({
  emotion,
  message,
  showAttention = false,
  attentionLevel = 0,
}: AvatarProps) {
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
    angry: {
      eyes: "◣ ◢",
      mouth: "⌢",
      message: "Respira... todo estará bien",
      gradient: "from-red-500 to-orange-600",
    },
    disgusted: {
      eyes: "◔ ◔",
      mouth: "╯",
      message: "Hagamos esto más interesante",
      gradient: "from-purple-500 to-pink-600",
    },
  };

  const config = emotionConfig[emotion];

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`relative w-48 h-48 rounded-full border-4 border-white bg-gradient-to-br ${config.gradient} flex items-center justify-center y2k-glow shadow-2xl`}
      >
        {/* Face */}
        <div className="text-center space-y-4">
          {/* Eyes */}
          <div className="text-4xl font-bold text-white drop-shadow-lg">
            {config.eyes}
          </div>

          {/* Mouth */}
          <div className="text-3xl text-white drop-shadow-lg">
            {config.mouth}
          </div>
        </div>

        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl animate-pulse" />
      </div>

      {/* Attention Level Indicator */}
      {showAttention && (
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>Nivel de Atención</span>
            <span>{Math.round(attentionLevel * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                attentionLevel > 0.7
                  ? "bg-green-500"
                  : attentionLevel > 0.4
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${attentionLevel * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Message */}
      <div className="text-center space-y-2 y2k-card max-w-md px-6">
        <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {message || config.message}
        </p>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          Tu avatar está aquí para guiarte
        </p>
      </div>
    </div>
  );
}
