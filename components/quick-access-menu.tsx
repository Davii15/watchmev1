"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Flame, Star, Clock, Award, Heart, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface QuickAccessItem {
  icon: React.ElementType
  label: string
  href: string
  color: string
  hoverColor: string
}

const quickAccessItems: QuickAccessItem[] = [
  {
    icon: Flame,
    label: "Trending",
    href: "/trailers?filter=trending",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    hoverColor: "from-orange-600 to-red-600",
  },
  {
    icon: Star,
    label: "Top Rated",
    href: "/trailers?filter=top-rated",
    color: "bg-gradient-to-r from-amber-500 to-yellow-500",
    hoverColor: "from-amber-600 to-yellow-600",
  },
  {
    icon: Clock,
    label: "New Releases",
    href: "/trailers?filter=new",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    hoverColor: "from-blue-600 to-cyan-600",
  },
  {
    icon: Award,
    label: "Award Winners",
    href: "/trailers?filter=awards",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    hoverColor: "from-purple-600 to-pink-600",
  },
  {
    icon: Heart,
    label: "My Favorites",
    href: "/trailers?filter=favorites",
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    hoverColor: "from-red-600 to-pink-600",
  },
  {
    icon: Zap,
    label: "For You",
    href: "/trailers?filter=recommended",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    hoverColor: "from-green-600 to-emerald-600",
  },
  {
    icon: Sparkles,
    label: "Premieres",
    href: "/trailers?filter=premieres",
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    hoverColor: "from-indigo-600 to-purple-600",
  },
  {
    icon: Play,
    label: "Watch All",
    href: "/trailers",
    color: "bg-gradient-to-r from-amber-500 to-amber-600",
    hoverColor: "from-amber-600 to-amber-700",
  },
]

export default function QuickAccessMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-wrap gap-2">
      {quickAccessItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <motion.div
            className={`relative overflow-hidden rounded-full ${
              hoveredIndex === index ? `bg-gradient-to-r ${item.hoverColor}` : `bg-gradient-to-r ${item.color}`
            } transition-all duration-300`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="ghost" className="text-white border-none h-auto py-2 px-4">
              <item.icon className="h-5 w-5 mr-2" />
              <span className="font-medium">{item.label}</span>
            </Button>

            {/* Animated background effect */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute inset-0 -z-10 opacity-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full rounded-full bg-white" />
              </motion.div>
            )}
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
