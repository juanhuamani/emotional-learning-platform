# 🎓 EmoLearn - Plataforma de Retroalimentación Emocional Inteligente

![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=for-the-badge&logo=next.js)
![Powered by MorphCast](https://img.shields.io/badge/Powered%20by-MorphCast-purple?style=for-the-badge)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/juandivis2428-gmailcoms-projects/v0-emotional-learning-platform)

## Descripción del Proyecto

**EmoLearn** es una plataforma de retroalimentación inteligente diseñada específicamente para estudiantes de **primero y segundo de secundaria** (sexto nivel educativo). El sistema busca mejorar la **atención**, **motivación** y **compromiso** durante las sesiones de aprendizaje mediante el uso de reconocimiento de emociones y atención en tiempo real, impulsado por el **SDK MorphCast**.

### ¿Cómo funciona?

La plataforma analiza las **expresiones faciales** de los estudiantes en tiempo real para determinar su:
- **Estado emocional** (Feliz, Neutral, Disgustado, Enojado)
- **Nivel de atención** (Concentrado, Distraído, Desconectado)
- **Nivel de interés o frustración**

A partir de esta información, genera una **retroalimentación personalizada e interactiva** a través de un **avatar animado** que:
- Ofrece comentarios adaptados al estado emocional del estudiante
- Guía la sesión individual o grupal
- Sugiere actividades y ejercicios según la emoción detectada
- Recomienda pausas cuando detecta distracción o frustración

### Características Principales

#### Detección de Emociones en Tiempo Real
- Integración con **MorphCast SDK** para análisis facial
- Detección de 4 emociones principales: Happy, Neutral, Disgust, Angry
- Monitoreo continuo del nivel de atención
- Sistema de **suavizado** con promedio móvil para evitar cambios bruscos

#### Avatar Interactivo
- Respuestas personalizadas según el estado emocional
- Mensajes de ánimo y motivación
- Recomendaciones de actividades (respiración, pausas, ejercicios)
- Sistema de **cooldown** (8 segundos) para permitir lectura completa de mensajes

#### Gamificación
- Sistema de puntos por respuestas correctas
- Insignias y recompensas
- Niveles por áreas curriculares (Geografía, Matemáticas, Literatura)
- Estadísticas de rendimiento

#### Retroalimentación Personalizada
- **Estudiante triste o frustrado** → Mensajes de ánimo + actividades de relajación
- **Estudiante distraído** → Recordatorios de enfoque + sugerencias de pausas
- **Estudiante feliz** → Refuerzo positivo + elogios
- **Baja atención** → Ejercicios de respiración + descansos recomendados

### Estrategias Pedagógicas Integradas

1. **Metas a corto plazo** - Preguntas individuales con retroalimentación inmediata
2. **Gamificación** - Recompensas, insignias y niveles por áreas
3. **Retroalimentación individual** - Mensajes adaptados a cada estudiante
4. **Aprendizaje empático** - El avatar reconoce y responde a las emociones
5. **Autonomía del estudiante** - Permite pausas y ajustes según necesidad

---

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

#### 1. Node.js (versión 18 o superior)

**En Windows:**
1. Descarga el instalador desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el instalador y sigue las instrucciones
3. Verifica la instalación:
```bash
node --version
npm --version
```

**En macOS:**
```bash
# Usando Homebrew
brew install node

# Verifica la instalación
node --version
npm --version
```

**En Linux (Ubuntu/Debian):**
```bash
# Actualizar repositorios
sudo apt update

# Instalar Node.js
sudo apt install nodejs npm

# Verifica la instalación
node --version
npm --version
```

#### 2. pnpm (Gestor de paquetes recomendado)

Una vez que tengas Node.js instalado, instala pnpm globalmente:

```bash
npm install -g pnpm
```

Verifica la instalación:
```bash
pnpm --version
```

### Instalación del Proyecto

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/emotional-learning-platform.git
cd emotional-learning-platform
```

2. **Instala las dependencias:**

Con pnpm (recomendado):
```bash
pnpm install
```

O con npm:
```bash
npm install
```

3. **Configura las variables de entorno (opcional):**

El proyecto ya viene configurado con la licencia de MorphCast incluida. Si necesitas cambiarla, edita el archivo `lib/hooks/useMorphcast.ts` y modifica la línea:

```typescript
export function useMorphcast(licenseKey: string = "TU_NUEVA_LICENCIA")
```

---

## Uso

### Modo Desarrollo

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

O con npm:
```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000)

**⚠️ Importante:** La primera vez que accedas a una sesión de aprendizaje, el navegador te pedirá **permiso para acceder a la cámara**. Esto es necesario para la detección de emociones.

### Build para Producción

Para crear una versión optimizada para producción:

```bash
pnpm build
```

Para ejecutar la versión de producción:

```bash
pnpm start
```

### Otros Comandos

```bash
# Verificar errores de código
pnpm lint

# O con npm
npm run lint
```

---

## Cómo Usar la Plataforma

1. **Inicio de Sesión:**
   - Accede a la plataforma
   - Permite el acceso a la cámara cuando te lo solicite

2. **Dashboard:**
   - Visualiza tu progreso actual
   - Revisa tus estadísticas y insignias
   - Inicia una nueva sesión de aprendizaje

3. **Sesión de Aprendizaje:**
   - El avatar te dará la bienvenida
   - Responde las preguntas de diferentes áreas
   - El avatar monitoreará tus emociones y te dará retroalimentación
   - Acumula puntos por respuestas correctas

4. **Retroalimentación Emocional:**
   - Si detecta tristeza: Recibirás ánimo y recomendaciones
   - Si detecta distracción: Te recordará enfocarte
   - Si detecta felicidad: Recibirás refuerzo positivo
   - Si detecta frustración: Te sugerirá pausas o ejercicios

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 16.0.0 (React 19.2.0)
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS 4.1.9
- **Componentes UI:** Radix UI + shadcn/ui
- **Detección de Emociones:** MorphCast AI SDK v1.16
- **Análisis:** Vercel Analytics
- **Deployment:** Vercel

---

## Estructura del Proyecto

```
emotional-learning-platform/
├── app/                          # Configuración de Next.js App Router
│   ├── layout.tsx               # Layout principal con scripts de MorphCast
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── components/                   # Componentes React
│   ├── avatar/                  # Avatar animado
│   │   └── avatar.tsx          # Componente del avatar con emociones
│   └── dashboard/               # Componentes del dashboard
│       └── learning-session.tsx # Sesión de aprendizaje con detección emocional
├── lib/                         # Utilidades y hooks
│   ├── hooks/                   # Custom hooks
│   │   └── useMorphcast.ts     # Hook para integración con MorphCast
│   └── utils.ts                 # Funciones de utilidad
├── public/                      # Archivos estáticos
├── styles/                      # Estilos adicionales
├── package.json                 # Dependencias y scripts
└── README.md                    # Este archivo
```

---

## Configuración Avanzada

### Ajustar Parámetros de Detección Emocional

En `lib/hooks/useMorphcast.ts` puedes modificar:

```typescript
const HISTORY_SIZE = 15          // Frames para suavizado (más = más suave)
const CHANGE_THRESHOLD = 0.6     // Umbral para cambiar emoción (0-1)
const MESSAGE_COOLDOWN = 8000    // Tiempo entre mensajes (milisegundos)
```

### Personalizar Mensajes del Avatar

En `lib/hooks/useMorphcast.ts`, función `getAvatarResponse()`, puedes agregar o modificar mensajes para cada emoción.

---

## Deployment

Este proyecto está desplegado en Vercel:

**URL de producción:** [https://vercel.com/juandivis2428-gmailcoms-projects/v0-emotional-learning-platform](https://vercel.com/juandivis2428-gmailcoms-projects/v0-emotional-learning-platform)

### Desplegar tu propia versión:

1. Haz fork de este repositorio
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno si es necesario
4. Despliega automáticamente

---

## Licencia MorphCast

El proyecto incluye una licencia de MorphCast integrada. Para uso en producción o con más usuarios, considera obtener tu propia licencia en [morphcast.com](https://www.morphcast.com/).

---

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la [documentación de MorphCast](https://www.morphcast.com/docs)
2. Abre un issue en este repositorio
3. Contacta al equipo de desarrollo

---

## Agradecimientos

- **MorphCast** - Por proporcionar el SDK de detección de emociones
- **Vercel** - Por el hosting y deployment
- **v0.dev** - Por las herramientas de desarrollo
- **Comunidad educativa** - Por el feedback y pruebas

---

## Estado del Proyecto

**Activo** - En desarrollo continuo

**Última actualización:** 2025

**Versión:** 0.1.0

---

**¡Hecho con ❤️ para mejorar la educación mediante tecnología emocional!**
