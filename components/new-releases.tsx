"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { getNewReleases } from "@/app/actions"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback data in case database fetch fails
const fallbackReleases = [
  {
    id: "1",
    title: "Lions Pride",
    release_date: "2023-05-01",
    thumbnail: "/images/lions-pride.jpg",
    duration: "2:15",
    category: "Documentary",
  },
  {
    id: "2",
    title: "Nairobi by Night",
    release_date: "2023-04-28",
    thumbnail: "/images/nairobi-by-night.jpg",
    duration: "1:58",
    category: "Drama",
  },
  {
    id: "3",
    title: "Maasai Warriors",
    release_date: "2023-04-25",
    thumbnail: "/images/maasai-warriors.jpg",
    duration: "2:22",
    category: "Action",
  },
  {
    id: "4",
    title: "Coastal Love",
    release_date: "2023-04-20",
    thumbnail: "/images/coastal-love.jpg",
    duration: "2:05",
    category: "Romance",
  },
  {
    id: "5",
    title: "Safari Dreams",
    release_date: "2023-04-15",
    thumbnail: "/images/safari-dreams.jpg",
    duration: "1:48",
    category: "Adventure",
  },
  {
    id: "6",
    title: "Kilimanjaro Mystery",
    release_date: "2023-04-10",
    thumbnail: "/images/kilimanjaro-mystery.jpg",
    duration: "2:30",
    category: "Thriller",
  },
]

export default function NewReleases() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const isMobile = useMobile()
  const [releases, setReleases] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Calculate scroll amount based on screen size
  const scrollAmount = isMobile ? 300 : 600

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const { trailers: fetchedReleases, success } = await getNewReleases()

        if (success && fetchedReleases && fetchedReleases.length > 0) {
          setReleases(fetchedReleases)
        } else {
          // Use fallback data if fetch fails
          setReleases(fallbackReleases)
        }
      } catch (error) {
        console.error("Error fetching new releases:", error)
        setReleases(fallbackReleases)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReleases()
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

  // Format release date to relative time
  const formatReleaseDate = (dateString: string) => {
    const releaseDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - releaseDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return "1 week ago"
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 60) return "1 month ago"
    return `${Math.floor(diffDays / 30)} months ago`
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

      {/* New releases scroll container */}
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
          : // Actual releases
            releases.map((release) => (
              <motion.div
                key={release.id}
                className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/trailers/${release.id}`}>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden group">
                    <Image
                      src={release.thumbnail || "/placeholder.svg?height=360&width=240"}
                      alt={release.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

                    {/* New badge */}
                    <div className="absolute top-2 left-2 bg-amber-500 rounded-full px-2 py-0.5">
                      <span className="text-xs font-medium text-black">NEW</span>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-amber-500/90 rounded-full p-2 sm:p-3">
                        <Play className="h-4 w-4 sm:h-6 sm:w-6 fill-black" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-1.5 py-0.5">
                      <span className="text-xs font-medium text-white">{release.duration}</span>
                    </div>

                    {/* Title and release date */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                      <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{release.title}</h3>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 text-amber-300 mr-1" />
                        <p className="text-xs text-amber-300">{formatReleaseDate(release.release_date)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  )
}
