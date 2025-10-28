"use client"

import type React from "react"
import { useState } from "react"

interface LoginFormProps {
  onLogin: (user: { id: string; name: string; email: string }) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de autenticación
    const userId = Math.random().toString(36).substr(2, 9)
    const userName = isSignUp ? name : email.split("@")[0]

    onLogin({
      id: userId,
      name: userName,
      email: email,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div
          className="absolute top-1/3 right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-32 left-1/3 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="glass-card flex h-20 w-20 items-center justify-center text-white font-bold text-3xl animate-glow">
            E
          </div>
          <span className="glass-heading text-4xl">EmoLearn</span>
        </div>

        <div className="glass-card">
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2 text-center">
              <h1 className="glass-subheading">{isSignUp ? "Crear Cuenta" : "Bienvenido"}</h1>
              <p className="glass-text">
                {isSignUp ? "Únete a EmoLearn y comienza tu viaje de aprendizaje" : "Inicia sesión para continuar"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="glass-input w-full"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full"
                  required
                />
              </div>

              <button type="submit" className="glass-button w-full">
                {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
              </button>
            </form>

            {/* Toggle */}
            <div className="text-center text-sm glass-text">
              {isSignUp ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-white hover:underline font-semibold">
                {isSignUp ? "Inicia sesión" : "Regístrate"}
              </button>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-8 glass-card text-center">
          <p className="glass-text font-semibold">Demo: Usa cualquier email y contraseña para acceder</p>
        </div>
      </div>
    </div>
  )
}
