"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/30 bg-[#030303]/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              className="text-[rgb(171,89,50)]"
            >
              <path
                fill="currentColor"
                d="M50 5 L95 95 L50 75 L5 95 Z"
                className="filter drop-shadow-lg"
              />
            </svg>
            <span className="text-2xl font-bold text-[rgb(171,89,50)] transition-all hover:scale-105 ml-2">Nexus</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden space-x-4 md:flex">
          <Link href="/" className="text-zinc-300 hover:text-[#d08c60] transition-all duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d08c60] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#features" className="text-zinc-300 hover:text-[#d08c60] transition-all duration-300 relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d08c60] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#pricing" className="text-zinc-300 hover:text-[#d08c60] transition-all duration-300 relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d08c60] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/dashboard" className="text-zinc-300 hover:text-[#d08c60] transition-all duration-300 relative group">
            Dashboard
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d08c60] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="p-2 text-zinc-300 hover:text-[#d08c60] transition-colors duration-300 md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`container mx-auto px-4 pb-6 md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col space-y-4 pt-4">
          <Link href="/" className="py-3 text-zinc-300 hover:text-[#d08c60] transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link
            href="#features"
            className="py-3 text-zinc-300 hover:text-[#d08c60] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="py-3 text-zinc-300 hover:text-[#d08c60] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="py-3 text-zinc-300 hover:text-[#d08c60] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <div className="flex flex-col space-y-3 pt-4">
            <Link href="/login" className="w-full">
              <Button
                variant="copper"
                className="w-full"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button
                variant="copper"
                className="w-full"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
