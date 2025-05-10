"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Film, Facebook, Twitter, Instagram, Youtube, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      await subscribeToNewsletter({ email })
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
        duration: 5000,
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription.",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={() => handleSubscribe(e)}>
            Try again
          </ToastAction>
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-[#120A04] text-amber-100/80 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-600 rounded-full p-1.5">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wider text-amber-400">TUCHEKI</span>
            </div>
            <p className="text-sm mb-6">
              Discover Kenya's cinematic treasures through our curated collection of movie trailers and exclusive
              content.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trailers" className="hover:text-amber-400 transition-colors">
                  Trailers
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-amber-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/prizes" className="hover:text-amber-400 transition-colors">
                  Prizes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-amber-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Stay updated with the latest trailers and news</p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-amber-950/50 border border-amber-800/50 text-amber-100 placeholder:text-amber-400/50 rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-r-md px-3 py-2 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-amber-900/30 text-center">
          <p className="text-amber-400/70 text-sm">
            POWERED BY CTECH SOLUTIONS<sup>®™©</sup> ALL RIGHTS RESERVED. {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}
