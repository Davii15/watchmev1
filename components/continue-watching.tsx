"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useIsMobile } from "@/hooks/use-mobile" // Fixed import name
import { getContinueWatching } from "@/app/actions"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback data in case database fetch fails
const fallbackWatching = [
  {
    id: "1",
    title: "Savannah Sunrise",
    thumbnail: "/images/savannah-sunrise.jpg",
    duration: "2:15",
    category: "Drama",
    progress: 65,
    last_watched: "2023-05-01T14:30:00Z",
  },
  {
    id: "2",
    title: "Nairobi Nights",
    thumbnail: "/images/nairobi-nights.jpg",
    duration: "1:58",
    category: "Thriller",
    progress: 42,
    last_watched: "2023-04-30T20:15:00Z",
  },
  {
    id: "3",
    title: "Mombasa Memories",
    thumbnail: "/images/mombasa-memories.jpg",
    duration: "2:22",
    category: "Romance",
    progress: 78,
    last_watched: "2023-04-29T18:45:00Z",
  },
  {
    id: "4",
    title: "Kilimanjaro Secrets",
    thumbnail: "/images/kilimanjaro-secrets.jpg",
    duration: "2:05",
    category: "Adventure",
    progress: 25,
    last_watched: "2023-04-28T21:10:00Z",
  },
]

export default function ContinueWatching() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const isMobile = useIsMobile() // Fixed function name
  const [watching, setWatching] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Calculate scroll amount based on screen size
  const scrollAmount = isMobile ? 300 : 600

  useEffect(() => {
    const fetchWatching = async () => {
      try {
        const { trailers: fetchedWatching, success } = await getContinueWatching()

        if (success && fetchedWatching && fetchedWatching.length > 0) {
          // Add random progress for demo purposes
          // In a real app, this would come from the database
          const watchingWithProgress = fetchedWatching.map((item) => ({
            ...item,
            progress: Math.floor(Math.random() * 90) + 5, // Random progress between 5-95%
          }))
          setWatching(watchingWithProgress)
        } else {
          // Use fallback data if fetch fails
          setWatching(fallbackWatching)
        }
      } catch (error) {
        console.error("Error fetching continue watching:", error)
        setWatching(fallbackWatching)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWatching()
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Format last watched time
  const formatLastWatched = (dateString: string) => {
    const watchDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - watchDate.getTime())
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return watchDate.toLocaleDateString()
  }

  // If no continue watching data and not loading, show empty state
  if (!isLoading && watching.length === 0) {
    return (
      <div className="bg-amber-950/20 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-amber-300 mb-2">No watch history yet</h3>
        <p className="text-sm text-amber-200/70 mb-4">Start watching trailers to see them here</p>
        <Button asChild variant="amber">
          <Link href="/trailers">Browse Trailers</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 -ml-4 sm:ml-0"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}

      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 -mr-4 sm:mr-0"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}

      {/* Continue watching scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-3 sm:gap-4 pb-2 -mx-2 px-2"
        onScroll={handleScroll}
      >
        {isLoading
          ? // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-amber-950/30">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          : // Actual continue watching items
            watching.map((item) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/trailers/${item.id}`}>
                  <div className="relative aspect-video rounded-lg overflow-hidden group">
                    <Image
                      src={item.thumbnail || "/placeholder.svg?height=180&width=320"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-amber-500/90 rounded-full p-2 sm:p-3">
                        <Play className="h-4 w-4 sm:h-6 sm:w-6 fill-black" />
                      </div>
                    </div>

                    {/* Duration and last watched */}
                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-0.5 flex items-center">
                      <Clock className="h-3 w-3 text-amber-300 mr-1" />
                      <span className="text-xs font-medium text-white">{item.duration}</span>
                    </div>

                    <div className="absolute top-2 left-2 bg-black/60 rounded-full px-2 py-0.5">
                      <span className="text-xs font-medium text-white">{formatLastWatched(item.last_watched)}</span>
                    </div>

                    {/* Title and category */}
                    <div className="absolute bottom-6 left-0 right-0 px-3">
                      <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-amber-300">{item.category}</p>
                    </div>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                      <Progress value={item.progress} className="h-1" indicatorClassName="bg-amber-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  )
}
