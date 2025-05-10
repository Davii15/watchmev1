"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Eye, MessageSquare, Share2, Download, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import VerificationBadge from "@/components/verification-badge"

// Mock data for trailers
const allTrailers = [
  {
    id: 1,
    title: "Savannah Sunrise",
    category: "Drama",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 12540,
    comments: 89,
    trending: true,
    duration: "2:15",
    verified: "official",
  },
  {
    id: 2,
    title: "Nairobi Nights",
    category: "Action",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 8320,
    comments: 45,
    trending: false,
    duration: "1:48",
    verified: "verified",
  },
  {
    id: 3,
    title: "Mombasa Memories",
    category: "Romance",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 15780,
    comments: 124,
    trending: true,
    duration: "2:32",
    verified: "premium",
  },
  {
    id: 4,
    title: "Kilimanjaro Secrets",
    category: "Thriller",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 6890,
    comments: 37,
    trending: false,
    duration: "1:55",
  },
  {
    id: 5,
    title: "Maasai Warriors",
    category: "Documentary",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 9450,
    comments: 62,
    trending: false,
    duration: "2:10",
    verified: "verified",
  },
  {
    id: 6,
    title: "Lake Victoria",
    category: "Adventure",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 11230,
    comments: 78,
    trending: true,
    duration: "2:25",
    verified: "official",
  },
  {
    id: 7,
    title: "Nairobi Hustle",
    category: "Drama",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 7650,
    comments: 42,
    trending: false,
    duration: "2:05",
    verified: "premium",
  },
  {
    id: 8,
    title: "Safari Dreams",
    category: "Adventure",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 10320,
    comments: 67,
    trending: false,
    duration: "1:58",
  },
  {
    id: 9,
    title: "Kenyan Legends",
    category: "Documentary",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 8970,
    comments: 53,
    trending: true,
    duration: "2:40",
    verified: "official",
  },
  {
    id: 10,
    title: "Coastal Love",
    category: "Romance",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 9840,
    comments: 71,
    trending: false,
    duration: "2:12",
  },
  {
    id: 11,
    title: "Nairobi After Dark",
    category: "Thriller",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 13450,
    comments: 92,
    trending: true,
    duration: "2:28",
    verified: "verified",
  },
  {
    id: 12,
    title: "Laughing in Lamu",
    category: "Comedy",
    thumbnail: "/placeholder.svg?height=360&width=640",
    views: 14780,
    comments: 103,
    trending: true,
    duration: "1:52",
    verified: "premium",
  },
]

interface TrailerGridProps {
  category?: string
}

export default function TrailerGrid({ category }: TrailerGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Filter trailers by category if provided
  const filteredTrailers = category ? allTrailers.filter((trailer) => trailer.category === category) : allTrailers

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredTrailers.map((trailer) => (
        <div
          key={trailer.id}
          className="relative group rounded-lg overflow-hidden bg-amber-950/30 border border-amber-900/50 transition-transform duration-300 hover:-translate-y-1"
          onMouseEnter={() => setHoveredId(trailer.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative aspect-video">
            <Image
              src={trailer.thumbnail || "/placeholder.svg"}
              alt={trailer.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Duration */}
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {trailer.duration}
            </div>

            {/* Trending Badge */}
            {trailer.trending && (
              <Badge className="absolute top-2 left-2 bg-amber-600 hover:bg-amber-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}

            {/* Play Button Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                hoveredId === trailer.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button size="lg" className="rounded-full bg-amber-600/90 hover:bg-amber-600 h-16 w-16">
                <Play className="h-8 w-8 fill-white" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-bold text-white">{trailer.title}</h3>
                {trailer.verified && (
                  <VerificationBadge type={trailer.verified as "official" | "premium" | "verified"} size="sm" />
                )}
              </div>
              <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                {trailer.category}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-amber-200/70 gap-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {trailer.views.toLocaleString()}
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {trailer.comments}
              </div>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Link href={`/trailers/${trailer.id}`} className="absolute inset-0">
            <span className="sr-only">View {trailer.title}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
