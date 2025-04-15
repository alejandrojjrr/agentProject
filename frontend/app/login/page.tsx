"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to login")
      }

      // Store the token
      localStorage.setItem("token", data.token)
      
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md border-zinc-800 bg-[#121212]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#d08c60]">Sign in to your account</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email and password to access your account
          </CardDescription>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full border-zinc-700 hover:border-[#d08c60] hover:text-[#d08c60]">
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#121212] px-2 text-zinc-400">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                required
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#d08c60] hover:text-[#e3a857]">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                required
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#d08c60] hover:text-[#e3a857]">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
