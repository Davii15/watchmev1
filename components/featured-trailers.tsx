"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { getFeaturedTrailers } from "@/app/actions"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback data in case database fetch fails
const fallbackTrailers = [
  {
    id: "1",
    title: "Savannah Sunrise",
    category: "Drama",
    views: 12540,
    likes: 3240,
    trending: true,
    duration: "2:15",
    thumbnail: "/images/savannah-sunrise.jpg",
  },
  {
    id: "2",
    title: "Nairobi Nights",
    category: "Thriller",
    views: 8320,
    likes: 2150,
    trending: false,
    duration: "2:30",
    thumbnail: "/images/nairobi-nights.jpg",
  },
  {
    id: "3",
    title: "Mombasa Memories",
    category: "Romance",
    views: 9450,
    likes: 2780,
    trending: true,
    duration: "2:05",
    thumbnail: "/images/mombasa-memories.jpg",
  },
  {
    id: "4",
    title: "Kilimanjaro Secrets",
    category: "Adventure",
    views: 7890,
    likes: 1950,
    trending: false,
    duration: "2:45",
    thumbnail: "/images/kilimanjaro-secrets.jpg",
  },
  {
    id: "5",
    title: "Safari Wildlife",
    category: "Documentary",
    views: 6540,
    likes: 1680,
    trending: true,
    duration: "1:55",
    thumbnail: "/images/safari-wildlife.jpg",
  },
  {
    id: "6",
    title: "Kenyan Landscape",
    category: "Documentary",
    views: 5980,
    likes: 1420,
    trending: false,
    duration: "2:10",
    thumbnail: "/images/kenyan-landscape.jpg",
  },
]

export default function FeaturedTrailers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const isMobile = useMobile()
  const [trailers, setTrailers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Calculate scroll amount based on screen size
  const scrollAmount = isMobile ? 300 : 600

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const { trailers: fetchedTrailers, success } = await getFeaturedTrailers()

        if (success && fetchedTrailers && fetchedTrailers.length > 0) {
          setTrailers(fetchedTrailers)
        } else {
          // Use fallback data if fetch fails
          setTrailers(fallbackTrailers)
        }
      } catch (error) {
        console.error("Error fetching featured trailers:", error)
        setTrailers(fallbackTrailers)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrailers()
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

  // Calculate rating from likes and views
  const calculateRating = (likes: number, views: number) => {
    if (views === 0) return 0
    const ratio = likes / views
    // Scale ratio to 1-5 range
    return Math.min(5, Math.max(1, Math.round(ratio * 100 * 5) / 10)).toFixed(1)
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

      {/* Trailers scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-3 sm:gap-4 pb-2 -mx-2 px-2"
        onScroll={handleScroll}
      >
        {isLoading
          ? // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px]">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-amber-950/30">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            ))
          : // Actual trailers
            trailers.map((trailer) => (
              <motion.div
                key={trailer.id}
                className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/trailers/${trailer.id}`}>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden group">
                    <Image
                      src={trailer.thumbnail || "/placeholder.svg?height=360&width=240"}
                      alt={trailer.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-amber-500/90 rounded-full p-2 sm:p-3">
                        <Play className="h-4 w-4 sm:h-6 sm:w-6 fill-black" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2 right-2 flex items-center bg-black/60 rounded-full px-1.5 py-0.5">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 fill-amber-400" />
                      <span className="text-xs sm:text-sm font-medium text-white ml-1">
                        {calculateRating(trailer.likes || 0, trailer.views || 1)}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="absolute top-2 left-2 bg-black/60 rounded-full px-1.5 py-0.5">
                      <span className="text-xs font-medium text-white">{trailer.duration}</span>
                    </div>

                    {/* Trending badge */}
                    {trailer.trending && (
                      <div className="absolute top-9 left-2 bg-amber-500 rounded-full px-2 py-0.5">
                        <span className="text-xs font-medium text-black">TRENDING</span>
                      </div>
                    )}

                    {/* Title and genre */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                      <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{trailer.title}</h3>
                      <p className="text-xs text-amber-300">{trailer.category}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  )
}
