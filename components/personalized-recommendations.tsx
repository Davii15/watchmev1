"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import VerificationBadge from "@/components/verification-badge"

// Mock data for personalized recommendations
const recommendationsData = [
  {
    id: 1,
    title: "Serengeti Tales",
    category: "Documentary",
    thumbnail: "/images/serengeti-tales.jpg",
    matchPercentage: 98,
    reason: "Based on your interest in wildlife documentaries",
    verified: "official",
  },
  {
    id: 2,
    title: "Nairobi Hustle",
    category: "Drama",
    thumbnail: "/images/nairobi-hustle.jpg",
    matchPercentage: 95,
    reason: "Because you watched 'City Life'",
    verified: "verified",
  },
  {
    id: 3,
    title: "Lake Victoria Mystery",
    category: "Thriller",
    thumbnail: "/images/lake-victoria.jpg",
    matchPercentage: 92,
    reason: "Based on your watchlist",
    verified: "premium",
  },
  {
    id: 4,
    title: "Kenyan Sunsets",
    category: "Romance",
    thumbnail: "/images/kenyan-sunsets.jpg",
    matchPercentage: 89,
    reason: "Trending in your region",
  },
]

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState(recommendationsData)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handleFeedback = (id: number, liked: boolean) => {
    // In a real app, this would send feedback to the recommendation system
    console.log(`User ${liked ? "liked" : "disliked"} recommendation ${id}`)

    // Remove the recommendation from the list
    setRecommendations(recommendations.filter((item) => item.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {recommendations.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group relative bg-amber-950/30 rounded-lg overflow-hidden border border-amber-900/50 transition-transform duration-300 hover:-translate-y-1"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative aspect-video">
            <Image
              src={item.thumbnail || "/placeholder.svg?height=180&width=320"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Match Percentage */}
            <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              {item.matchPercentage}% Match
            </div>

            {/* Play Button Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                hoveredId === item.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button size="lg" className="rounded-full bg-amber-600/90 hover:bg-amber-600 h-14 w-14">
                <Play className="h-7 w-7 fill-white" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white">{item.title}</h3>
                {item.verified && (
                  <VerificationBadge type={item.verified as "official" | "premium" | "verified"} size="sm" />
                )}
              </div>
              <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                {item.category}
              </Badge>
            </div>

            <p className="text-sm text-amber-300/70 mb-3">{item.reason}</p>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                onClick={() => handleFeedback(item.id, true)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Good Suggestion
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                onClick={() => handleFeedback(item.id, false)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Not For Me
              </Button>
            </div>
          </div>

          <Link href={`/trailers/${item.id}`} className="absolute inset-0">
            <span className="sr-only">Watch {item.title}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
