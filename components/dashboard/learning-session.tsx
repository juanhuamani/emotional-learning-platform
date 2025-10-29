"use client";

import { useState, useEffect, useRef } from "react";
import Avatar from "@/components/avatar/avatar";
import { useMorphcast, getAvatarResponse } from "@/lib/hooks/useMorphcast";

interface LearningSessionProps {
  onBack: () => void;
}

export default function LearningSession({ onBack }: LearningSessionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [emotionState, setEmotionState] = useState<
    "focused" | "confused" | "bored" | "happy" | "angry" | "disgusted"
  >("focused");
  const [sessionComplete, setSessionComplete] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState<string>("");

  // Guardar la última emoción para la que se mostró mensaje
  const lastMessageEmotion = useRef<string>("");

  // Control de mensajes manuales (respuestas a preguntas)
  const manualMessageTimeout = useRef<NodeJS.Timeout | null>(null);
  const isManualMessage = useRef(false);

  // Integración con Morphcast
  const {
    emotionData,
    isInitialized,
    isLoading,
    error,
    canUpdateMessage,
    markMessageUpdated,
  } = useMorphcast();

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
  ];

  // Actualizar avatar basado en emociones detectadas por Morphcast
  useEffect(() => {
    // No actualizar si hay un mensaje manual activo
    if (isManualMessage.current) return;

    if (!emotionData) return;

    // Verificar si ha pasado suficiente tiempo Y la emoción cambió
    const emotionChanged = emotionData.emotion !== lastMessageEmotion.current;

    if (canUpdateMessage() && emotionChanged) {
      // Generar mensaje basado en la emoción ACTUAL
      const response = getAvatarResponse(emotionData);
      setAvatarMessage(response.message);

      // Marcar que se actualizó el mensaje
      markMessageUpdated();
      lastMessageEmotion.current = emotionData.emotion;
    }

    // Siempre actualizar el estado visual del avatar (sin cambiar mensaje)
    switch (emotionData.emotion) {
      case "Angry":
        setEmotionState("angry");
        break;
      case "Disgust":
        setEmotionState("disgusted");
        break;
      case "Happy":
        setEmotionState("happy");
        break;
      case "Neutral":
        if (emotionData.attention < 0.4) {
          setEmotionState("bored");
        } else {
          setEmotionState("focused");
        }
        break;
      default:
        setEmotionState("focused");
    }
  }, [
    emotionData?.emotion,
    emotionData?.attention,
    canUpdateMessage,
    markMessageUpdated,
  ]);

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;

    // Marcar que hay un mensaje manual
    isManualMessage.current = true;

    // Limpiar timeout anterior si existe
    if (manualMessageTimeout.current) {
      clearTimeout(manualMessageTimeout.current);
    }

    if (isCorrect) {
      setScore(score + 10);
      setEmotionState("happy");
      setAvatarMessage("¡Increíble! ✨ Respuesta correcta. ¡Sigue así!");
    } else {
      setEmotionState("confused");
      setAvatarMessage(
        "No pasa nada, los errores nos ayudan a aprender. 💡 ¡Inténtalo de nuevo en la próxima!",
      );
    }

    // También marcar el mensaje como actualizado para resetear el cooldown
    markMessageUpdated();

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setEmotionState("focused");

        // Después de 3 segundos, permitir que los mensajes de Morphcast vuelvan
        manualMessageTimeout.current = setTimeout(() => {
          isManualMessage.current = false;
          setAvatarMessage("");
          lastMessageEmotion.current = ""; // Resetear para forzar nuevo mensaje
        }, 3000);
      } else {
        setSessionComplete(true);
      }
    }, 2000);
  };

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (manualMessageTimeout.current) {
        clearTimeout(manualMessageTimeout.current);
      }
    };
  }, []);

  if (sessionComplete) {
    return (
      <div className="space-y-8 p-6">
        <div className="text-center space-y-4">
          <h1 className="glass-heading">¡Sesión Completada!</h1>
          <p className="glass-text text-xl">
            Excelente trabajo en tu aprendizaje
          </p>
          {emotionData && (
            <p className="text-white/70">
              {emotionData.emotion === "Happy"
                ? "¡Terminaste con una gran sonrisa! 😊"
                : "¡Lo lograste! Cada sesión es un paso adelante 🌟"}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
          <div className="glass-card text-center animate-glow">
            <p className="text-sm text-white/80 mb-2 font-semibold">
              Puntos Ganados
            </p>
            <p className="text-6xl font-bold text-white">{score}</p>
          </div>
          <div
            className="glass-card text-center animate-glow"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-sm text-white/80 mb-2 font-semibold">
              Precisión
            </p>
            <p className="text-6xl font-bold text-white">
              {Math.round((score / 30) * 100)}%
            </p>
          </div>
          <div
            className="glass-card text-center animate-glow"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-sm text-white/80 mb-2 font-semibold">Insignia</p>
            <p className="text-7xl">🌟</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="glass-button w-full max-w-md mx-auto block text-xl"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Estado de Morphcast */}
      {isLoading && (
        <div className="glass-card text-center text-yellow-300 animate-pulse">
          <p className="text-lg">🎥 Inicializando detección de emociones...</p>
          <p className="text-sm mt-2">
            Por favor, permite el acceso a tu cámara para una mejor experiencia
          </p>
        </div>
      )}

      {error && (
        <div className="glass-card text-center text-red-300">
          <p className="text-lg">⚠️ {error}</p>
          <p className="text-sm mt-2">
            Continuaremos sin detección emocional. Puedes recargar la página
            para intentar de nuevo.
          </p>
        </div>
      )}

      {isInitialized && (
        <div className="glass-card text-center text-green-300">
          <p className="text-sm">Detección de emociones activada</p>
          {emotionData && (
            <p className="text-xs mt-1 text-white/60">
              Emoción actual: {emotionData.emotion} | Atención:{" "}
              {Math.round(emotionData.attention * 100)}%
            </p>
          )}
        </div>
      )}

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
          <Avatar
            emotion={emotionState}
            message={
              avatarMessage ||
              (isInitialized
                ? "Estoy monitoreando tus emociones para ayudarte mejor"
                : undefined)
            }
            showAttention={isInitialized}
            attentionLevel={emotionData?.attention || 0}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="glass-badge inline-block">
              {questions[currentQuestion].subject}
            </div>
            <h3 className="text-3xl font-bold text-white">
              {questions[currentQuestion].question}
            </h3>
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
            <p className="text-sm text-white/80 font-semibold mb-2">
              Puntos Acumulados
            </p>
            <p className="text-5xl font-bold text-white">{score}</p>
          </div>
        </div>
      </div>

      <button onClick={onBack} className="glass-button">
        Volver
      </button>
    </div>
  );
}
