import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md border-zinc-800 bg-[#121212]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#d08c60]">Sign in to your account</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email and password to access your account
          </CardDescription>
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

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
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
                placeholder="••••••••"
                type="password"
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              />
            </div>
            <Button className="w-full bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine">Sign in</Button>
          </div>
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
