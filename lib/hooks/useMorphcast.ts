"use client";

import { useEffect, useState, useCallback } from "react";

// Declarar tipos globales para Morphcast
declare global {
  interface Window {
    CY: any;
    MphTools: any;
  }
}

export interface EmotionData {
  emotion:
    | "Happy"
    | "Sad"
    | "Angry"
    | "Fear"
    | "Disgust"
    | "Surprise"
    | "Neutral";
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

export function useMorphcast(
  licenseKey: string = "5791ee3605563e92cd88316fd0600abab7829fe8fdc4",
) {
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
            url: "#", // Aquí puedes poner tu política de privacidad
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

    const handleEmotionEvent = (evt: any) => {
      if (!mounted) return;

      const emotions = evt.detail.output.emotion;

      // Encontrar la emoción dominante
      let maxEmotion = "Neutral";
      let maxValue = 0;

      Object.entries(emotions).forEach(([emotion, value]: [string, any]) => {
        if (value > maxValue) {
          maxValue = value;
          maxEmotion = emotion;
        }
      });

      setEmotionData((prev) => ({
        emotion: maxEmotion as any,
        confidence: maxValue,
        dominantEmotion: maxEmotion,
        attention: prev?.attention || 0,
        arousal: prev?.arousal,
        valence: prev?.valence,
      }));
    };

    const handleAttentionEvent = (evt: any) => {
      if (!mounted) return;

      const attention = evt.detail.output.attention;

      setEmotionData((prev) => ({
        emotion: prev?.emotion || "Neutral",
        confidence: prev?.confidence || 0,
        dominantEmotion: prev?.dominantEmotion || "Neutral",
        attention: attention,
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

  return {
    emotionData,
    isInitialized,
    isLoading,
    error,
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

  const { emotion, attention, valence } = emotionData;

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
    case "Sad":
      const sadMessages = [
        "Veo que estás un poco triste. Recuerda: cada error es una oportunidad de aprender. ¡Tú puedes!",
        "No te desanimes. ¿Qué tal si tomamos un descanso y volvemos con energía renovada?",
        "Entiendo que puede ser difícil, pero estoy aquí para ayudarte. ¿Quieres que repasemos el tema?",
        "¡Ánimo! Cada gran científico cometió errores antes de sus descubrimientos. Sigamos adelante.",
      ];
      const sadActivities = [
        "\n\n💪 Te recomiendo: Haz 10 respiraciones profundas",
        "\n\n🎵 Actividad: Escucha tu canción favorita por 3 minutos",
        "\n\n🚶 Sugerencia: Da una caminata corta de 5 minutos",
        "\n\n📝 Ejercicio: Escribe 3 cosas positivas que lograste hoy",
      ];
      return {
        message: `${sadMessages[Math.floor(Math.random() * sadMessages.length)]}${sadActivities[Math.floor(Math.random() * sadActivities.length)]}`,
        type: "encouragement",
      };

    case "Angry":
    case "Disgust":
      return {
        message:
          "Parece que algo te molesta. 🧘 Respiremos juntos: inhala por 4 segundos, sostén, exhala. ¿Continuamos cuando estés listo?",
        type: "activity",
      };

    case "Fear":
      return {
        message:
          "No hay nada que temer. 🌟 Estamos aprendiendo juntos y a tu propio ritmo. Tómate tu tiempo.",
        type: "encouragement",
      };

    case "Happy":
      return {
        message:
          "¡Me encanta ver tu sonrisa! 😊 Esa actitud positiva te llevará lejos. ¡Sigamos así!",
        type: "praise",
      };

    case "Surprise":
      return {
        message:
          "¡Interesante! 🤔 Veo que algo te sorprendió. La curiosidad es el motor del aprendizaje.",
        type: "praise",
      };

    default: // Neutral
      if (attention > 0.7) {
        return {
          message: "¡Excelente concentración! 🎯 Estás dando lo mejor de ti.",
          type: "praise",
        };
      }

      // Usar valence si está disponible
      if (valence !== undefined && valence < -0.3) {
        return {
          message:
            "Parece que algo no te convence del todo. ¿Necesitas que repasemos algún concepto?",
          type: "encouragement",
        };
      }

      return {
        message: "Estás haciendo un buen trabajo. ¡Mantén el enfoque!",
        type: "encouragement",
      };
  }
}
