"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"
import NotificationCenter from "@/components/notification-center"

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/trailers", label: "Trailers" },
    { href: "/categories", label: "Categories" },
    { href: "/prizes", label: "Prizes" },
    { href: "/search", label: "Search" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#1A0F07]/95 backdrop-blur-sm shadow-md py-2"
          : "bg-gradient-to-b from-black/80 to-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2">
            <div className="bg-amber-600 rounded-full p-1.5">
              <Film className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-amber-400">TUCHEKI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-amber-100/80 hover:text-amber-400 transition-colors",
                  pathname === link.href && "text-amber-400 font-medium",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 h-4 w-4" />
              <Input
                placeholder="Search trailers..."
                className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50 w-60 h-9"
              />
            </div>

            <ThemeToggle />
            <NotificationCenter />

            <Button
              variant="outline"
              size="sm"
              className="border-amber-600 text-amber-400 hover:bg-amber-900/20 gap-2"
              asChild
            >
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            {isMobileSearchOpen ? (
              <div className="flex items-center">
                <Input
                  placeholder="Search trailers..."
                  className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50 h-9 w-full"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-400 hover:text-amber-300"
                  onClick={() => setIsMobileSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-400 hover:text-amber-300"
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                <ThemeToggle />
                <NotificationCenter />

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-amber-400 hover:text-amber-300">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-[#1A0F07] border-amber-900/50 text-amber-100 p-0">
                    <div className="flex flex-col h-full">
                      <div className="p-6 border-b border-amber-900/50">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="bg-amber-600 rounded-full p-1.5">
                            <Film className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-2xl font-bold tracking-wider text-amber-400">TUCHEKI</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <Button
                            variant="outline"
                            className="w-full border-amber-600 text-amber-400 hover:bg-amber-900/20 justify-start gap-2"
                            asChild
                          >
                            <Link href="/profile">
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <nav className="flex-1 p-6">
                        <div className="flex flex-col space-y-4">
                          {navLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={cn(
                                "text-lg py-2 border-b border-amber-900/30 text-amber-100/80 hover:text-amber-400 transition-colors",
                                pathname === link.href && "text-amber-400 font-medium",
                              )}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div
\
I found some issues in the code block.

- The Bell variable is undeclared.

I will fix them.
