import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md border-slate-800 bg-slate-900">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your information to get started with NexusAI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full border-slate-700">
              <Github className="mr-2 h-4 w-4" />
              Sign up with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First name
                </label>
                <Input id="firstName" placeholder="John" className="border-slate-700 bg-slate-800 text-slate-100" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last name
                </label>
                <Input id="lastName" placeholder="Doe" className="border-slate-700 bg-slate-800 text-slate-100" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                className="border-slate-700 bg-slate-800 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                className="border-slate-700 bg-slate-800 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                type="password"
                className="border-slate-700 bg-slate-800 text-slate-100"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-500 button-glow">Create account</Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
