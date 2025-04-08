"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/30 bg-[#030303]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#d08c60]">Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link href="/" className="text-zinc-300 hover:text-[#d08c60] transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-zinc-300 hover:text-[#d08c60] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-zinc-300 hover:text-[#d08c60] transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-zinc-300 hover:text-[#d08c60] transition-colors">
            Dashboard
          </Link>
        </div>

        <div className="hidden space-x-4 md:flex">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-[#d08c60] text-[#d08c60] hover:text-[#e3a857] hover:border-[#e3a857] hover:bg-[#d08c60]/10 btn-outline"
            >
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#d08c60] text-white hover:bg-[#c77c3c] button-glow copper-shine btn-primary">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="p-2 text-zinc-300 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-6 md:hidden nebula-bg">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="py-2 text-zinc-300 hover:text-[#d08c60]" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="#features"
              className="py-2 text-zinc-300 hover:text-[#d08c60]"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="py-2 text-zinc-300 hover:text-[#d08c60]"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="py-2 text-zinc-300 hover:text-[#d08c60]"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="flex space-x-4 pt-2">
              <Link href="/login" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-[#d08c60] text-[#d08c60] hover:text-[#e3a857] hover:border-[#e3a857] hover:bg-[#d08c60]/10 btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button
                  className="w-full bg-[#d08c60] text-white hover:bg-[#c77c3c] button-glow btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
