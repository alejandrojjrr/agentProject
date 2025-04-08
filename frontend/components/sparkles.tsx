"use client"

import { useEffect, useRef } from "react"

export default function Sparkles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Limpiar sparkles existentes
    const existingSparkles = container.querySelectorAll(".sparkle")
    existingSparkles.forEach((sparkle) => sparkle.remove())

    // Crear sparkles
    const sparkleCount = 50 // Aumentamos el número de sparkles
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div")
      sparkle.classList.add("sparkle")

      // Tamaño aleatorio entre 4px y 6px
      const size = Math.random() * 2 + 4
      sparkle.style.width = `${size}px`
      sparkle.style.height = `${size}px`

      // Posición aleatoria en toda la página
      const posX = Math.random() * 100
      const posY = Math.random() * 100
      sparkle.style.left = `${posX}%`
      sparkle.style.top = `${posY}%`

      // Duración y retraso aleatorios
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 5
      sparkle.style.animationDuration = `${duration}s`
      sparkle.style.animationDelay = `${delay}s`

      // Opacidad base más alta
      const baseOpacity = Math.random() * 0.5 + 0.5
      sparkle.style.opacity = baseOpacity.toString()

      container.appendChild(sparkle)
    }

    // Función para actualizar sparkles en resize
    const handleResize = () => {
      const sparkles = container.querySelectorAll(".sparkle")
      sparkles.forEach((sparkle) => {
        if (sparkle instanceof HTMLElement) {
          const posX = Math.random() * 100
          const posY = Math.random() * 100
          sparkle.style.left = `${posX}%`
          sparkle.style.top = `${posY}%`
        }
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <style jsx>{`
        .sparkle {
          position: absolute;
          background: #e3a857;
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle 3s infinite ease-in-out;
          will-change: transform, opacity;
          box-shadow: 0 0 5px #e3a857;
        }

        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: var(--opacity, 0.5);
            filter: brightness(1.5);
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .sparkle {
            animation-duration: 2s;
          }
        }
      `}</style>
    </div>
  )
} 