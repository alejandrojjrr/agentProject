"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot } from "lucide-react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Crear partículas dinámicas
    const container = containerRef.current
    if (!container) return

    // Limpiar partículas existentes
    const existingParticles = container.querySelectorAll(".particle")
    existingParticles.forEach((particle) => particle.remove())

    // Crear nuevas partículas
    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Tamaño aleatorio
      const size = Math.random() * 100 + 50
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Posición aleatoria
      const posX = Math.random() * 100
      const posY = Math.random() * 100
      particle.style.left = `${posX}%`
      particle.style.top = `${posY}%`

      // Duración de animación aleatoria
      const duration = Math.random() * 10 + 10
      particle.style.animationDuration = `${duration}s`

      // Retraso aleatorio
      const delay = Math.random() * 5
      particle.style.animationDelay = `${delay}s`

      container.appendChild(particle)
    }
  }, [])

  return (
    <div ref={containerRef} className="container relative mx-auto px-4 py-20 text-center md:py-32 overflow-hidden">
      <div className="mx-auto max-w-3xl relative z-10">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-zinc-200 fade-in-up md:text-5xl">
          Create and Deploy <span className="gradient-text">AI Agents</span> in Minutes
        </h1>
        <p className="mb-10 text-xl text-zinc-300 fade-in-up delay-1">
          Build, customize, and manage powerful AI agents without writing a single line of code.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 fade-in-up delay-2">
          <Link href="/register">
            <Button className="h-12 px-8 text-base bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine btn-primary">
              Get Started Free
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link href="#demo">
            <Button
              variant="outline"
              className="h-12 px-8 text-base border-[#d08c60] text-[#d08c60] hover:border-[#e3a857] hover:text-[#e3a857] hover:bg-[#d08c60]/10 btn-outline"
            >
              <Bot size={16} className="mr-2" />
              See Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Fondo animado */}
      <div className="absolute inset-0 -z-10">
        <div className="animated-gradient absolute inset-0 opacity-30 rounded-3xl"></div>
      </div>
    </div>
  )
}
