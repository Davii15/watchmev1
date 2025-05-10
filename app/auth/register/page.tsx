"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Film, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/home")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-900/30 p-3 rounded-full">
              <Film className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-amber-400 mb-2">Join Tucheki</h1>
          <p className="text-amber-200/70">Create an account to explore Kenyan cinema</p>
        </div>

        <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6 shadow-xl">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-amber-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-amber-400/70">Password must be at least 8 characters long</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                required
                className="border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <Label htmlFor="terms" className="text-sm text-amber-300">
                I agree to the{" "}
                <Link href="/terms" className="text-amber-400 hover:text-amber-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 h-11" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-amber-900/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-amber-950/30 px-2 text-amber-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-amber-800/50 text-amber-300 hover:bg-amber-900/30">
                Google
              </Button>
              <Button variant="outline" className="border-amber-800/50 text-amber-300 hover:bg-amber-900/30">
                Facebook
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-amber-200/70">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
