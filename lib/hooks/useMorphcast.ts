"use client";

import { useEffect, useState, useRef } from "react";

// Declarar tipos globales para Morphcast
declare global {
  interface Window {
    CY: any;
    MphTools: any;
  }
}

export interface EmotionData {
  emotion: "Happy" | "Neutral" | "Disgust" | "Angry";
  confidence: number;
  dominantEmotion: string;
  attention: number; // 0-1, nivel de atención
  arousal?: number; // 0-1, nivel de activación
  valence?: number; // -1 a 1, positivo/negativo
}

export interface AvatarResponse {
  message: string;
  type: "encouragement" | "activity" | "praise" | "focus";
}

interface EmotionFrame {
  emotion: string;
  confidence: number;
  timestamp: number;
}

const HISTORY_SIZE = 15; // Número de frames a considerar
const CHANGE_THRESHOLD = 0.6; // Umbral para cambiar la emoción predominante (60%)
const MESSAGE_COOLDOWN = 4000; // 8 segundos de espera mínima entre cambios de mensaje

export function useMorphcast(
  licenseKey: string = "5791ee3605563e92cd88316fd0600abab7829fe8fdc4",
) {
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Historial de emociones para suavizado
  const emotionHistory = useRef<EmotionFrame[]>([]);
  const attentionHistory = useRef<number[]>([]);
  const currentDominantEmotion = useRef<string>("Neutral");

  // Control de tiempo para mensajes - solo guarda el timestamp, no la emoción
  const lastMessageUpdate = useRef<number>(0);

  useEffect(() => {
    let mounted = true;

    const initMorphcast = async () => {
      try {
        // Esperar a que los scripts se carguen
        const waitForCY = () => {
          return new Promise<void>((resolve) => {
            if (window.CY) {
              resolve();
            } else {
              const interval = setInterval(() => {
                if (window.CY) {
                  clearInterval(interval);
                  resolve();
                }
              }, 100);
            }
          });
        };

        await waitForCY();

        if (!mounted) return;

        const { CY, MphTools } = window;

        // Configurar el popup de privacidad
        if (MphTools?.CameraPrivacyPopup) {
          MphTools.CameraPrivacyPopup.setText({
            title: "Permítenos usar tu cámara",
            description:
              "Esta experiencia está diseñada para funcionar con tu cámara encendida. La siguiente pantalla te pedirá consentimiento para acceder a los datos de tu cámara para análisis de emociones.",
            url: "#",
          });
        }

        // Inicializar Morphcast con los módulos necesarios
        const { start, stop } = await CY.loader()
          .licenseKey(licenseKey)
          .addModule(CY.modules().FACE_AROUSAL_VALENCE.name, {
            smoothness: 0.7,
          })
          .addModule(CY.modules().FACE_EMOTION.name, { smoothness: 0.4 })
          .addModule(CY.modules().FACE_ATTENTION.name, { smoothness: 0.83 })
          .load();

        if (!mounted) return;

        // Configurar listeners para emociones
        window.addEventListener(
          CY.modules().FACE_EMOTION.eventName,
          handleEmotionEvent,
        );
        window.addEventListener(
          CY.modules().FACE_ATTENTION.eventName,
          handleAttentionEvent,
        );
        window.addEventListener(
          CY.modules().FACE_AROUSAL_VALENCE.eventName,
          handleArousalValenceEvent,
        );

        // Iniciar detección
        await start();

        if (mounted) {
          setIsInitialized(true);
          setIsLoading(false);
          // Inicializar el timestamp para permitir el primer mensaje después de 2 segundos
          lastMessageUpdate.current = Date.now() - MESSAGE_COOLDOWN + 2000;
        }
      } catch (err) {
        console.error("Error inicializando Morphcast:", err);
        if (mounted) {
          setError(
            "No se pudo inicializar la detección de emociones. Por favor, verifica los permisos de la cámara.",
          );
          setIsLoading(false);
        }
      }
    };

    // Calcular la emoción predominante usando promedio móvil
    const calculateDominantEmotion = (): string => {
      if (emotionHistory.current.length === 0) return "Neutral";

      // Contar frecuencia de cada emoción en el historial
      const emotionCounts: {
        [key: string]: { count: number; totalConfidence: number };
      } = {};

      emotionHistory.current.forEach((frame) => {
        if (!emotionCounts[frame.emotion]) {
          emotionCounts[frame.emotion] = { count: 0, totalConfidence: 0 };
        }
        emotionCounts[frame.emotion].count++;
        emotionCounts[frame.emotion].totalConfidence += frame.confidence;
      });

      // Calcular score ponderado (frecuencia * confianza promedio)
      let maxScore = 0;
      let dominantEmotion = "Neutral";

      Object.entries(emotionCounts).forEach(([emotion, data]) => {
        const avgConfidence = data.totalConfidence / data.count;
        const frequency = data.count / emotionHistory.current.length;
        const score = frequency * avgConfidence;

        if (score > maxScore) {
          maxScore = score;
          dominantEmotion = emotion;
        }
      });

      // Solo cambiar si la nueva emoción supera el umbral
      const currentEmotionData = emotionCounts[currentDominantEmotion.current];
      if (currentEmotionData) {
        const currentFrequency =
          currentEmotionData.count / emotionHistory.current.length;
        if (currentFrequency > CHANGE_THRESHOLD) {
          // La emoción actual sigue siendo dominante
          return currentDominantEmotion.current;
        }
      }

      return dominantEmotion;
    };

    const handleEmotionEvent = (evt: any) => {
      if (!mounted) return;

      const emotions = evt.detail.output.emotion;

      // Encontrar la emoción con mayor confianza en este frame
      let maxEmotion = "Neutral";
      let maxValue = 0;

      // Solo considerar las 4 emociones que realmente usa Morphcast
      const validEmotions = ["Happy", "Neutral", "Disgust", "Angry"];

      Object.entries(emotions).forEach(([emotion, value]: [string, any]) => {
        if (validEmotions.includes(emotion) && value > maxValue) {
          maxValue = value;
          maxEmotion = emotion;
        }
      });

      // Agregar al historial
      emotionHistory.current.push({
        emotion: maxEmotion,
        confidence: maxValue,
        timestamp: Date.now(),
      });

      // Mantener solo los últimos N frames
      if (emotionHistory.current.length > HISTORY_SIZE) {
        emotionHistory.current.shift();
      }

      // Calcular emoción predominante ACTUAL
      const dominantEmotion = calculateDominantEmotion();
      currentDominantEmotion.current = dominantEmotion;

      // Calcular atención promedio
      const avgAttention =
        attentionHistory.current.length > 0
          ? attentionHistory.current.reduce((a, b) => a + b, 0) /
            attentionHistory.current.length
          : 0;

      // Siempre actualizar con la emoción actual
      // El componente decidirá si cambiar el mensaje basándose en el cooldown
      setEmotionData({
        emotion: dominantEmotion as any,
        confidence: maxValue,
        dominantEmotion: dominantEmotion,
        attention: avgAttention,
        arousal: undefined,
        valence: undefined,
      });
    };

    const handleAttentionEvent = (evt: any) => {
      if (!mounted) return;

      const attention = evt.detail.output.attention;

      // Agregar al historial de atención
      attentionHistory.current.push(attention);

      // Mantener solo los últimos N frames
      if (attentionHistory.current.length > HISTORY_SIZE) {
        attentionHistory.current.shift();
      }

      // Calcular promedio de atención
      const avgAttention =
        attentionHistory.current.reduce((a, b) => a + b, 0) /
        attentionHistory.current.length;

      setEmotionData((prev) => ({
        emotion: prev?.emotion || "Neutral",
        confidence: prev?.confidence || 0,
        dominantEmotion: prev?.dominantEmotion || "Neutral",
        attention: avgAttention,
        arousal: prev?.arousal,
        valence: prev?.valence,
      }));
    };

    const handleArousalValenceEvent = (evt: any) => {
      if (!mounted) return;

      const { arousal, valence } = evt.detail.output;

      setEmotionData((prev) => ({
        emotion: prev?.emotion || "Neutral",
        confidence: prev?.confidence || 0,
        dominantEmotion: prev?.dominantEmotion || "Neutral",
        attention: prev?.attention || 0,
        arousal: arousal,
        valence: valence,
      }));
    };

    initMorphcast();

    return () => {
      mounted = false;
    };
  }, [licenseKey]);

  // Función para verificar si puede actualizar mensaje (se usa desde el componente)
  const canUpdateMessage = (): boolean => {
    const now = Date.now();
    return now - lastMessageUpdate.current >= MESSAGE_COOLDOWN;
  };

  // Función para marcar que se actualizó el mensaje (se llama desde el componente)
  const markMessageUpdated = () => {
    lastMessageUpdate.current = Date.now();
  };

  return {
    emotionData,
    isInitialized,
    isLoading,
    error,
    canUpdateMessage,
    markMessageUpdated,
  };
}

// Función para generar respuestas del avatar basadas en emociones
export function getAvatarResponse(
  emotionData: EmotionData | null,
): AvatarResponse {
  if (!emotionData) {
    return {
      message: "¿Estás listo para aprender?",
      type: "encouragement",
    };
  }

  const { emotion, attention } = emotionData;

  // Si está distraído (baja atención)
  if (attention < 0.4) {
    const distractionMessages = [
      "¡Oye! Parece que tu mente está en otro lugar. ¿Qué tal si hacemos una pausa de 2 minutos?",
      "Noto que estás un poco distraído. ¿Te ayudaría hacer unos ejercicios de respiración?",
      "¡Hey! Volvamos al enfoque. Intenta mirar directamente a la pantalla.",
      "¿Necesitas un descanso? A veces 5 minutos de estiramiento ayudan mucho.",
    ];
    return {
      message:
        distractionMessages[
          Math.floor(Math.random() * distractionMessages.length)
        ],
      type: "focus",
    };
  }

  // Respuestas según emoción
  switch (emotion) {
    case "Angry":
      const angryMessages = [
        "Veo que algo te está frustrando. No te preocupes, es normal sentirse así al aprender cosas nuevas.",
        "Parece que algo te molesta. Respiremos juntos: inhala por 4 segundos, sostén, exhala.",
        "La frustración es parte del aprendizaje. ¿Necesitas que expliquemos esto de otra manera?",
        "¡Tranquilo! A veces las cosas difíciles requieren un poco más de paciencia. Vamos paso a paso.",
      ];
      const angryActivities = [
        "\n\n🧘 Te recomiendo: Haz 5 respiraciones profundas",
        "\n\n💪 Actividad: Estira tus brazos y relaja los hombros",
        "\n\n🚶 Sugerencia: Toma un descanso de 3 minutos",
        "\n\n💧 Ejercicio: Toma un poco de agua y relájate",
      ];
      return {
        message: `${angryMessages[Math.floor(Math.random() * angryMessages.length)]}${angryActivities[Math.floor(Math.random() * angryActivities.length)]}`,
        type: "activity",
      };

    case "Disgust":
      const disgustMessages = [
        "Parece que algo no te convence. ¿Qué tal si abordamos este tema desde otro ángulo?",
        "Veo que este tema no te resulta muy atractivo. ¡Vamos a hacerlo más interesante!",
        "Entiendo que no todos los temas son emocionantes, pero cada uno tiene su valor.",
        "¿Este tema no te gusta? A veces las cosas que menos esperamos nos sorprenden. ¡Dale una oportunidad!",
      ];
      const disgustActivities = [
        "\n\n🎯 Hagamos esto más dinámico con ejemplos prácticos",
        "\n\n🎮 ¿Qué tal si convertimos esto en un desafío?",
        "\n\n💡 Busquemos aplicaciones reales de este concepto",
        "\n\n🌟 Intentemos con ejercicios más interactivos",
      ];
      return {
        message: `${disgustMessages[Math.floor(Math.random() * disgustMessages.length)]}${disgustActivities[Math.floor(Math.random() * disgustActivities.length)]}`,
        type: "encouragement",
      };

    case "Happy":
      const happyMessages = [
        "¡Me encanta ver tu sonrisa! 😊 Esa actitud positiva te llevará lejos.",
        "¡Excelente! Tu entusiasmo es contagioso. ¡Sigamos así!",
        "¡Wow! Noto que estás disfrutando esto. ¡Esa es la actitud correcta!",
        "¡Genial! Aprender con una sonrisa hace que todo sea más fácil. ¡Continúa así!",
      ];
      return {
        message:
          happyMessages[Math.floor(Math.random() * happyMessages.length)],
        type: "praise",
      };

    default: // Neutral
      if (attention > 0.7) {
        return {
          message:
            "¡Excelente concentración! 🎯 Estás dando lo mejor de ti. Sigue así.",
          type: "praise",
        };
      } else if (attention > 0.5) {
        return {
          message:
            "Estás haciendo un buen trabajo. Mantén el enfoque y lo lograrás.",
          type: "encouragement",
        };
      } else {
        return {
          message:
            "Veo que estás en modo neutro. ¿Listo para el siguiente desafío?",
          type: "encouragement",
        };
      }
  }
}
