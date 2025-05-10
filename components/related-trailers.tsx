"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Clock } from "lucide-react"
import { getRelatedTrailers } from "@/app/actions"
import { Skeleton } from "@/components/ui/skeleton"

interface RelatedTrailersProps {
  currentId: string
  category: string
}

interface Trailer {
  id: string
  title: string
  thumbnail: string
  views: number
  duration: string
  category: string
}

// Fallback data in case the database fetch fails
const fallbackTrailers = [
  {
    id: "2",
    title: "Nairobi Nights",
    thumbnail: "/images/nairobi-nights.jpg",
    views: 8420,
    duration: "1:45",
    category: "Drama",
  },
  {
    id: "3",
    title: "Mombasa Memories",
    thumbnail: "/images/mombasa-memories.jpg",
    views: 6230,
    duration: "2:30",
    category: "Drama",
  },
  {
    id: "4",
    title: "Kilimanjaro Secrets",
    thumbnail: "/images/kilimanjaro-secrets.jpg",
    views: 9150,
    duration: "2:10",
    category: "Drama",
  },
  {
    id: "5",
    title: "Safari Wildlife",
    thumbnail: "/images/safari-wildlife.jpg",
    views: 7320,
    duration: "1:55",
    category: "Documentary",
  },
  {
    id: "6",
    title: "Kenyan Landscape",
    thumbnail: "/images/kenyan-landscape.jpg",
    views: 5640,
    duration: "2:20",
    category: "Documentary",
  },
  {
    id: "7",
    title: "Lions Pride",
    thumbnail: "/images/lions-pride.jpg",
    views: 4980,
    duration: "2:05",
    category: "Documentary",
  },
]

export default function RelatedTrailers({ currentId, category }: RelatedTrailersProps) {
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedTrailers = async () => {
      setIsLoading(true)

      try {
        const { trailers: fetchedTrailers, success } = await getRelatedTrailers(currentId, category)

        if (success && fetchedTrailers && fetchedTrailers.length > 0) {
          setTrailers(fetchedTrailers as Trailer[])
        } else {
          // Use fallback data filtered by category
          setTrailers(fallbackTrailers.filter((t) => t.category === category))
        }
      } catch (error) {
        console.error("Error fetching related trailers:", error)
        setTrailers(fallbackTrailers.filter((t) => t.category === category))
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedTrailers()
  }, [currentId, category])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="bg-amber-950/30 border-amber-900/50 overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardContent>
            </Card>
          ))
        : trailers.map((trailer) => (
            <Link href={`/trailers/${trailer.id}`} key={trailer.id}>
              <Card className="bg-amber-950/30 border-amber-900/50 overflow-hidden transition-all duration-300 hover:border-amber-600/70 hover:shadow-lg hover:shadow-amber-900/20">
                <div className="relative aspect-video">
                  <Image
                    src={trailer.thumbnail || "/placeholder.svg?height=720&width=1280"}
                    alt={trailer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {trailer.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-amber-300 mb-2 line-clamp-1">{trailer.title}</h3>
                  <div className="flex justify-between text-xs text-amber-400/70">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {trailer.views.toLocaleString()} views
                    </span>
                    <span>{trailer.category}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
    </div>
  )
}
