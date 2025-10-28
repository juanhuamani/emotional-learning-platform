"use client"

import { useState } from "react"
import Avatar from "@/components/avatar/avatar"

interface LearningSessionProps {
  onBack: () => void
}

export default function LearningSession({ onBack }: LearningSessionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [emotionState, setEmotionState] = useState<"focused" | "confused" | "bored" | "happy">("focused")
  const [sessionComplete, setSessionComplete] = useState(false)

  const questions = [
    {
      question: "¿Cuál es la capital de Francia?",
      options: ["Londres", "París", "Berlín", "Madrid"],
      correct: 1,
      subject: "Geografía",
    },
    {
      question: "¿Cuál es el resultado de 15 × 8?",
      options: ["100", "110", "120", "130"],
      correct: 2,
      subject: "Matemáticas",
    },
    {
      question: "¿Quién escribió 'Don Quijote'?",
      options: ["García Márquez", "Cervantes", "Borges", "Cortázar"],
      correct: 1,
      subject: "Literatura",
    },
  ]

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct

    if (isCorrect) {
      setScore(score + 10)
      setEmotionState("happy")
    } else {
      setEmotionState("confused")
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setEmotionState("focused")
      } else {
        setSessionComplete(true)
      }
    }, 1500)
  }

  if (sessionComplete) {
    return (
      <div className="space-y-8 p-6">
        <div className="text-center space-y-4">
          <h1 className="glass-heading">¡Sesión Completada!</h1>
          <p className="glass-text text-xl">Excelente trabajo en tu aprendizaje</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
          <div className="glass-card text-center animate-glow">
            <p className="text-sm text-white/80 mb-2 font-semibold">Puntos Ganados</p>
            <p className="text-6xl font-bold text-white">{score}</p>
          </div>
          <div className="glass-card text-center animate-glow" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-white/80 mb-2 font-semibold">Precisión</p>
            <p className="text-6xl font-bold text-white">{Math.round((score / 30) * 100)}%</p>
          </div>
          <div className="glass-card text-center animate-glow" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-white/80 mb-2 font-semibold">Insignia</p>
            <p className="text-7xl">🌟</p>
          </div>
        </div>

        <button onClick={onBack} className="glass-button w-full max-w-md mx-auto block text-xl">
          Volver al Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="glass-subheading">Sesión de Aprendizaje</h2>
          <span className="glass-badge">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
        </div>
        <div
          className="w-full h-4 rounded-full overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 animate-glow"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
              boxShadow: "0 0 20px rgba(161, 140, 209, 0.6)",
            }}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <div className="flex justify-center">
          <Avatar emotion={emotionState} />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="glass-badge inline-block">{questions[currentQuestion].subject}</div>
            <h3 className="text-3xl font-bold text-white">{questions[currentQuestion].question}</h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="glass-card w-full text-left hover:scale-105 transition-all"
              >
                <p className="text-lg font-semibold text-white">{option}</p>
              </button>
            ))}
          </div>

          <div className="glass-card text-center animate-glow">
            <p className="text-sm text-white/80 font-semibold mb-2">Puntos Acumulados</p>
            <p className="text-5xl font-bold text-white">{score}</p>
          </div>
        </div>
      </div>

      <button onClick={onBack} className="glass-button">
        Volver
      </button>
    </div>
  )
}
