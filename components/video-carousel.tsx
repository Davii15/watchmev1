"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Enhanced mock data for video carousel
const videoData = [
  {
    id: 1,
    title: "Savannah Sunrise",
    description: "Experience the breathtaking beauty of Kenya's savannah as the sun rises over the horizon.",
    category: "Nature",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "/placeholder.svg?height=1080&width=1920&text=Savannah%20Sunrise",
    releaseDate: "2023",
    featured: true,
  },
  {
    id: 2,
    title: "Nairobi Nights",
    description: "Dive into the vibrant nightlife of Kenya's capital city in this thrilling urban adventure.",
    category: "Drama",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "/placeholder.svg?height=1080&width=1920&text=Nairobi%20Nights",
    releaseDate: "2023",
    featured: true,
  },
  {
    id: 3,
    title: "Mombasa Memories",
    description: "A heartwarming story of love and friendship set against the backdrop of Kenya's coastal paradise.",
    category: "Romance",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/placeholder.svg?height=1080&width=1920&text=Mombasa%20Memories",
    releaseDate: "2023",
    featured: true,
  },
]

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const nextVideo = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoData.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const prevVideo = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videoData.length) % videoData.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && !isTransitioning) {
        nextVideo()
      }
    }, 10000) // Change video every 10 seconds

    return () => clearInterval(interval)
  }, [isPlaying, isTransitioning])

  // Ensure the current video is playing and others are paused
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch((e) => console.log("Video play error:", e))
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentIndex])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {videoData.map((video, index) => (
        <AnimatePresence key={video.id} initial={false}>
          {index === currentIndex && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                poster={video.thumbnail}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Content overlay */}
              <motion.div
                className="absolute inset-0 flex items-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <div className="container px-6 md:px-10">
                  <div className="max-w-2xl">
                    <Badge className="mb-4 bg-amber-600 hover:bg-amber-700 text-white">{video.category}</Badge>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                      {video.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-md max-w-xl">{video.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        size="lg"
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2 rounded-full"
                      >
                        <Play className="h-5 w-5 fill-black" />
                        Watch Trailer
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white/70 text-white hover:bg-white/20 rounded-full"
                      >
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {videoData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-amber-500 w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => {
              setIsTransitioning(true)
              setCurrentIndex(index)
              setTimeout(() => setIsTransitioning(false), 1000)
            }}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
        onClick={prevVideo}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
        onClick={nextVideo}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
}
