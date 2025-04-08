"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-4xl relative z-10">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-zinc-200 fade-in-up md:text-5xl lg:text-6xl text-center">
          Create and Deploy <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#d08c60] to-[#e3a857]">AI Agents</span> in Minutes
        </h1>
        <p className="mb-10 text-lg md:text-xl text-zinc-300 fade-in-up delay-1 max-w-2xl mx-auto text-center">
          Build, customize, and manage powerful AI agents without writing a single line of code. Our platform makes AI development accessible to everyone.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 fade-in-up delay-2">
          <Link href="/register">
            <Button
              variant="copper"
              size="lg"
              className="w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link href="#demo">
            <Button
              variant="copper-outline"
              size="lg"
              className="w-full sm:w-auto"
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030303]"></div>
      </div>
    </div>
  )
}
