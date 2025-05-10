"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SplashScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
      setShowContent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    router.push("/home")
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      {/* Loading animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative h-32 w-32 mb-8">
                <div className="absolute inset-0 rounded-full border-t-4 border-amber-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-amber-500">T</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-amber-500 tracking-wider">TUCHEKI</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white">
                <span className="text-amber-500">TUCHEKI</span> Trailers
              </h1>
              <p className="text-xl md:text-2xl text-amber-100/80 mb-8 max-w-3xl mx-auto">
                Discover the best movie trailers from across Kenya and beyond. Your personalized trailer experience
                awaits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  onClick={handleEnter}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6 rounded-full"
                >
                  <Play className="mr-2 h-5 w-5 fill-black" />
                  Start Watching
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/auth/register")}
                  className="border-amber-500/70 text-amber-500 hover:bg-amber-500/20 font-bold text-lg px-8 py-6 rounded-full"
                >
                  Create Account
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* Featured trailers preview */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full max-w-6xl"
            >
              <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">Featured Trailers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Savannah Sunrise",
                  "Nairobi Nights",
                  "Mombasa Memories",
                  "Kilimanjaro Secrets",
                  "Maasai Warriors",
                ].map((title, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer"
                    onClick={handleEnter}
                  >
                    <Image
                      src={`/placeholder.svg?height=450&width=300&text=${encodeURIComponent(title)}`}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-medium text-sm">{title}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-amber-500/90 rounded-full p-2">
                        <Play className="h-6 w-6 fill-black" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Animated scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="flex flex-col items-center"
              >
                <div className="h-10 w-6 border-2 border-amber-500/50 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="h-2 w-2 bg-amber-500 rounded-full mt-1"
                  />
                </div>
                <p className="text-amber-500/70 text-sm mt-2">Scroll to explore</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
