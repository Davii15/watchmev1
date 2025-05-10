"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Play,
  Clock,
  Star,
  Calendar,
  Cloud,
  CloudRain,
  Sun,
  Moon,
  Filter,
  Share2,
  Heart,
  X,
  Facebook,
  Twitter,
  Mail,
  LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import VerificationBadge from "@/components/verification-badge"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define time periods for different recommendation types
const TIME_PERIODS = {
  MORNING: {
    name: "Morning",
    start: 5,
    end: 11,
    color: "from-amber-400 to-yellow-500",
    gradient: "bg-gradient-to-r from-amber-400/10 to-yellow-500/10",
    mood: "Refreshing",
    icon: Sun,
    description: "Start your day with inspiring and informative content",
  },
  AFTERNOON: {
    name: "Afternoon",
    start: 12,
    end: 16,
    color: "from-amber-600 to-orange-500",
    gradient: "bg-gradient-to-r from-amber-600/10 to-orange-500/10",
    mood: "Energetic",
    icon: Sun,
    description: "Action-packed and entertaining content for your afternoon",
  },
  EVENING: {
    name: "Evening",
    start: 17,
    end: 20,
    color: "from-orange-600 to-red-600",
    gradient: "bg-gradient-to-r from-orange-600/10 to-red-600/10",
    mood: "Relaxing",
    icon: Moon,
    description: "Wind down with drama and romance as the day ends",
  },
  NIGHT: {
    name: "Night",
    start: 21,
    end: 4,
    color: "from-indigo-800 to-purple-900",
    gradient: "bg-gradient-to-r from-indigo-800/10 to-purple-900/10",
    mood: "Thrilling",
    icon: Moon,
    description: "Experience suspense and mystery in the late hours",
  },
}

// Weather conditions for integrated recommendations
const WEATHER_CONDITIONS = {
  SUNNY: {
    name: "Sunny",
    icon: Sun,
    color: "text-yellow-500",
    recommendations: ["adventure", "comedy", "documentary"],
  },
  RAINY: {
    name: "Rainy",
    icon: CloudRain,
    color: "text-blue-500",
    recommendations: ["drama", "mystery", "romance"],
  },
  CLOUDY: {
    name: "Cloudy",
    icon: Cloud,
    color: "text-gray-400",
    recommendations: ["thriller", "drama", "documentary"],
  },
}

// Mock data for different time periods
const timeBasedTrailers = {
  MORNING: [
    {
      id: 101,
      title: "Savannah Sunrise",
      category: "Documentary",
      thumbnail: "/images/safari-wildlife.jpg",
      matchScore: 95,
      duration: "2:15",
      verified: "official",
      description: "Start your day with breathtaking views of Kenya's wildlife awakening to a new day.",
      tags: ["inspiring", "nature", "wildlife"],
      previewGif: "/images/safari-wildlife.jpg",
      releaseDate: "2023-05-15",
      viewCount: 12540,
    },
    {
      id: 102,
      title: "Kenyan Coffee Tales",
      category: "Documentary",
      thumbnail: "/images/kenyan-landscape.jpg",
      matchScore: 92,
      duration: "1:48",
      verified: "verified",
      description: "Explore the journey of Kenya's world-famous coffee from farm to cup.",
      tags: ["educational", "culture", "food"],
      previewGif: "/images/kenyan-landscape.jpg",
      releaseDate: "2023-06-20",
      viewCount: 8320,
    },
    {
      id: 103,
      title: "Family Safari Adventure",
      category: "Family",
      thumbnail: "/images/safari-dreams.jpg",
      matchScore: 88,
      duration: "2:05",
      description: "A heartwarming story of a family's adventure through Kenya's national parks.",
      tags: ["family", "adventure", "wildlife"],
      previewGif: "/images/safari-dreams.jpg",
      releaseDate: "2023-04-10",
      viewCount: 15780,
    },
    {
      id: 104,
      title: "Nairobi Morning Hustle",
      category: "Documentary",
      thumbnail: "/images/nairobi-hustle.jpg",
      matchScore: 85,
      duration: "1:55",
      verified: "premium",
      description: "Experience the energy of Nairobi as the city comes to life each morning.",
      tags: ["urban", "culture", "lifestyle"],
      previewGif: "/images/nairobi-hustle.jpg",
      releaseDate: "2023-07-05",
      viewCount: 6890,
    },
  ],
  AFTERNOON: [
    {
      id: 201,
      title: "Maasai Warriors",
      category: "Action",
      thumbnail: "/images/maasai-warriors.jpg",
      matchScore: 94,
      duration: "2:22",
      verified: "premium",
      description: "An action-packed adventure following the legendary Maasai warriors.",
      tags: ["action", "cultural", "adventure"],
      previewGif: "/images/maasai-warriors.jpg",
      releaseDate: "2023-03-15",
      viewCount: 9450,
    },
    {
      id: 202,
      title: "Nairobi Chase",
      category: "Action",
      thumbnail: "/images/nairobi-by-night.jpg",
      matchScore: 91,
      duration: "2:10",
      verified: "verified",
      description: "A high-octane chase through the streets of Nairobi.",
      tags: ["action", "thriller", "urban"],
      previewGif: "/images/nairobi-by-night.jpg",
      releaseDate: "2023-05-22",
      viewCount: 11230,
    },
    {
      id: 203,
      title: "Laughing in Lamu",
      category: "Comedy",
      thumbnail: "/images/coastal-love.jpg",
      matchScore: 89,
      duration: "1:52",
      description: "A hilarious comedy set in the beautiful island town of Lamu.",
      tags: ["comedy", "island", "vacation"],
      previewGif: "/images/coastal-love.jpg",
      releaseDate: "2023-06-10",
      viewCount: 7650,
    },
    {
      id: 204,
      title: "Serengeti Race",
      category: "Adventure",
      thumbnail: "/images/serengeti-tales.jpg",
      matchScore: 86,
      duration: "2:15",
      verified: "official",
      description: "An adventure across the Serengeti plains in a race against time.",
      tags: ["adventure", "action", "wildlife"],
      previewGif: "/images/serengeti-tales.jpg",
      releaseDate: "2023-04-05",
      viewCount: 10320,
    },
  ],
  EVENING: [
    {
      id: 301,
      title: "Nairobi Nights",
      category: "Drama",
      thumbnail: "/images/nairobi-nights.jpg",
      matchScore: 96,
      duration: "2:30",
      verified: "official",
      description: "A gripping drama about relationships and ambitions in Kenya's capital.",
      tags: ["drama", "relationships", "urban"],
      previewGif: "/images/nairobi-nights.jpg",
      releaseDate: "2023-02-28",
      viewCount: 13450,
    },
    {
      id: 302,
      title: "Coastal Love",
      category: "Romance",
      thumbnail: "/images/coastal-love.jpg",
      matchScore: 93,
      duration: "2:12",
      verified: "verified",
      description: "A romantic story set against the backdrop of Kenya's beautiful coast.",
      tags: ["romance", "beach", "relationships"],
      previewGif: "/images/coastal-love.jpg",
      releaseDate: "2023-07-15",
      viewCount: 9840,
    },
    {
      id: 303,
      title: "Mombasa Memories",
      category: "Drama",
      thumbnail: "/images/mombasa-memories.jpg",
      matchScore: 90,
      duration: "2:18",
      verified: "premium",
      description: "A family drama that unfolds during an evening in Mombasa.",
      tags: ["drama", "family", "coastal"],
      previewGif: "/images/mombasa-memories.jpg",
      releaseDate: "2023-05-10",
      viewCount: 8970,
    },
    {
      id: 304,
      title: "Sunset Promises",
      category: "Romance",
      thumbnail: "/images/kenyan-sunsets.jpg",
      matchScore: 87,
      duration: "2:05",
      description: "A romantic tale that begins with a promise made at sunset.",
      tags: ["romance", "sunset", "promises"],
      previewGif: "/images/kenyan-sunsets.jpg",
      releaseDate: "2023-06-30",
      viewCount: 14780,
    },
  ],
  NIGHT: [
    {
      id: 401,
      title: "Nairobi After Dark",
      category: "Thriller",
      thumbnail: "/images/nairobi-by-night.jpg",
      matchScore: 97,
      duration: "2:28",
      verified: "verified",
      description: "A suspenseful thriller that explores the dark side of Nairobi.",
      tags: ["thriller", "suspense", "urban"],
      previewGif: "/images/nairobi-by-night.jpg",
      releaseDate: "2023-03-20",
      viewCount: 12540,
    },
    {
      id: 402,
      title: "Kilimanjaro Secrets",
      category: "Horror",
      thumbnail: "/images/kilimanjaro-mystery.jpg",
      matchScore: 94,
      duration: "2:15",
      verified: "official",
      description: "A terrifying journey to uncover the ancient secrets of Mount Kilimanjaro.",
      tags: ["horror", "mountain", "mystery"],
      previewGif: "/images/kilimanjaro-mystery.jpg",
      releaseDate: "2023-04-15",
      viewCount: 8320,
    },
    {
      id: 403,
      title: "Lake Victoria Mystery",
      category: "Mystery",
      thumbnail: "/images/lake-victoria.jpg",
      matchScore: 91,
      duration: "2:20",
      verified: "premium",
      description: "A detective story set on the shores of Lake Victoria.",
      tags: ["mystery", "detective", "lake"],
      previewGif: "/images/lake-victoria.jpg",
      releaseDate: "2023-05-05",
      viewCount: 15780,
    },
    {
      id: 404,
      title: "Shadows of the Savannah",
      category: "Horror",
      thumbnail: "/images/lions-pride.jpg",
      matchScore: 88,
      duration: "1:58",
      description: "A horror film where the savannah becomes a place of terror after sunset.",
      tags: ["horror", "savannah", "wildlife"],
      previewGif: "/images/lions-pride.jpg",
      releaseDate: "2023-06-15",
      viewCount: 6890,
    },
  ],
}

export default function TimeBasedRecommendations() {
  const [currentPeriod, setCurrentPeriod] = useState<keyof typeof TIME_PERIODS>("MORNING")
  const [trailers, setTrailers] = useState(timeBasedTrailers.MORNING)
  const [filteredTrailers, setFilteredTrailers] = useState(timeBasedTrailers.MORNING)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState("")
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [isTimeSliderActive, setIsTimeSliderActive] = useState(false)
  const [selectedWeather, setSelectedWeather] = useState<keyof typeof WEATHER_CONDITIONS | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareTrailer, setShareTrailer] = useState<any>(null)

  // Determine time period based on hour
  const determineTimePeriod = (hour: number) => {
    if (hour >= TIME_PERIODS.MORNING.start && hour <= TIME_PERIODS.MORNING.end) {
      return "MORNING"
    } else if (hour >= TIME_PERIODS.AFTERNOON.start && hour <= TIME_PERIODS.AFTERNOON.end) {
      return "AFTERNOON"
    } else if (hour >= TIME_PERIODS.EVENING.start && hour <= TIME_PERIODS.EVENING.end) {
      return "EVENING"
    } else {
      return "NIGHT"
    }
  }

  // Update time left until next period
  const updateTimeLeft = (hour: number) => {
    const minute = new Date().getMinutes()

    let nextPeriodHour = 0
    let periodName = ""

    if (hour >= TIME_PERIODS.MORNING.start && hour <= TIME_PERIODS.MORNING.end) {
      nextPeriodHour = TIME_PERIODS.AFTERNOON.start
      periodName = TIME_PERIODS.AFTERNOON.name
    } else if (hour >= TIME_PERIODS.AFTERNOON.start && hour <= TIME_PERIODS.AFTERNOON.end) {
      nextPeriodHour = TIME_PERIODS.EVENING.start
      periodName = TIME_PERIODS.EVENING.name
    } else if (hour >= TIME_PERIODS.EVENING.start && hour <= TIME_PERIODS.EVENING.end) {
      nextPeriodHour = TIME_PERIODS.NIGHT.start
      periodName = TIME_PERIODS.NIGHT.name
    } else {
      nextPeriodHour = TIME_PERIODS.MORNING.start
      periodName = TIME_PERIODS.MORNING.name
    }

    // Handle day change
    let hoursLeft = nextPeriodHour - hour - 1
    if (hoursLeft < 0) hoursLeft += 24

    const minutesLeft = 60 - minute

    setTimeLeft(`${hoursLeft}h ${minutesLeft}m until ${periodName} recommendations`)
  }

  // Update period based on current time
  const updatePeriod = (hour: number = new Date().getHours()) => {
    const period = determineTimePeriod(hour)
    setCurrentPeriod(period as keyof typeof TIME_PERIODS)
    setTrailers(timeBasedTrailers[period as keyof typeof timeBasedTrailers])
    setFilteredTrailers(timeBasedTrailers[period as keyof typeof timeBasedTrailers])
    updateTimeLeft(hour)
  }

  // Initialize and set up interval for updates
  useEffect(() => {
    const hour = new Date().getHours()
    setCurrentHour(hour)
    updatePeriod(hour)

    // Update every minute to keep time remaining accurate
    const intervalId = setInterval(() => {
      if (!isTimeSliderActive) {
        const newHour = new Date().getHours()
        setCurrentHour(newHour)
        updatePeriod(newHour)
      }
    }, 60000)

    return () => clearInterval(intervalId)
  }, [isTimeSliderActive])

  // Handle time slider change
  const handleTimeSliderChange = (value: number[]) => {
    const hour = Math.floor(value[0])
    setCurrentHour(hour)
    setIsTimeSliderActive(true)
    updatePeriod(hour)
  }

  // Reset to current time
  const resetToCurrentTime = () => {
    const currentHour = new Date().getHours()
    setCurrentHour(currentHour)
    setIsTimeSliderActive(false)
    updatePeriod(currentHour)
    setSelectedWeather(null)
    setActiveFilters([])
  }

  // Apply weather-based filtering
  const applyWeatherFilter = (weather: keyof typeof WEATHER_CONDITIONS | null) => {
    setSelectedWeather(weather)

    if (!weather) {
      setFilteredTrailers(trailers)
      return
    }

    const recommendedCategories = WEATHER_CONDITIONS[weather].recommendations
    const filtered = trailers.filter((trailer) => {
      // Check if trailer category or tags match recommended categories
      return (
        recommendedCategories.includes(trailer.category.toLowerCase()) ||
        trailer.tags.some((tag) => recommendedCategories.includes(tag))
      )
    })

    setFilteredTrailers(filtered.length > 0 ? filtered : trailers)
  }

  // Apply tag filters
  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) => {
      const newFilters = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]

      // Apply filters
      if (newFilters.length === 0) {
        setFilteredTrailers(trailers)
      } else {
        const filtered = trailers.filter(
          (trailer) =>
            trailer.tags.some((t) => newFilters.includes(t)) || newFilters.includes(trailer.category.toLowerCase()),
        )
        setFilteredTrailers(filtered.length > 0 ? filtered : trailers)
      }

      return newFilters
    })
  }

  // Handle trailer hover for preview
  const handleTrailerHover = (trailer: any) => {
    setHoveredId(trailer.id)

    // Clear any existing timeout
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
    }

    // Set timeout to show preview after a short delay
    previewTimeoutRef.current = setTimeout(() => {
      setPreviewData(trailer)
      setShowPreview(true)
    }, 800)
  }

  // Handle trailer hover end
  const handleTrailerLeave = () => {
    setHoveredId(null)

    // Clear timeout if it exists
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }

    // Hide preview with a small delay to allow clicking
    setTimeout(() => {
      setShowPreview(false)
    }, 300)
  }

  // Toggle favorite status
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  // Open share modal
  const openShareModal = (trailer: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setShareTrailer(trailer)
    setShowShareModal(true)
  }

  // Get all unique tags from current trailers
  const allTags = Array.from(new Set(trailers.flatMap((trailer) => [...trailer.tags, trailer.category.toLowerCase()])))

  const currentPeriodInfo = TIME_PERIODS[currentPeriod]
  const CurrentWeatherIcon = selectedWeather ? WEATHER_CONDITIONS[selectedWeather].icon : currentPeriodInfo.icon
  const weatherColor = selectedWeather ? WEATHER_CONDITIONS[selectedWeather].color : ""

  return (
    <div className="space-y-6">
      {/* Header with time period info and controls */}
      <div
        className={`p-6 rounded-xl ${currentPeriodInfo.gradient} border border-amber-900/30 transition-all duration-500`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-amber-400">{currentPeriodInfo.name} Picks</h2>
              <CurrentWeatherIcon className={`h-6 w-6 ${weatherColor || "text-amber-500"}`} />
            </div>
            <p className="text-amber-200/80 mt-1">{currentPeriodInfo.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-amber-300/70 bg-amber-950/30 px-3 py-1.5 rounded-full border border-amber-900/50">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>{timeLeft}</span>
            </div>

            {isTimeSliderActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetToCurrentTime}
                className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
              >
                Reset to Current Time
              </Button>
            )}
          </div>
        </div>

        {/* Interactive time slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-amber-300/70">Morning</span>
            <span className="text-sm text-amber-300/70">Afternoon</span>
            <span className="text-sm text-amber-300/70">Evening</span>
            <span className="text-sm text-amber-300/70">Night</span>
          </div>
          <Slider
            value={[currentHour]}
            min={0}
            max={23}
            step={1}
            onValueChange={handleTimeSliderChange}
            className="[&>span:first-child]:h-2 [&>span:first-child]:bg-amber-950/50 [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:border-2 [&_[role=slider]]:border-amber-600 [&>span:first-child_span]:bg-gradient-to-r [&>span:first-child_span]:from-amber-500 [&>span:first-child_span]:to-amber-600"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-amber-300/70">12 AM</span>
            <span className="text-xs text-amber-300/70">6 AM</span>
            <span className="text-xs text-amber-300/70">12 PM</span>
            <span className="text-xs text-amber-300/70">6 PM</span>
            <span className="text-xs text-amber-300/70">12 AM</span>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-amber-300">Enhance with:</span>

          {/* Weather integration */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`border-amber-700/50 ${selectedWeather ? weatherColor : "text-amber-400"} hover:bg-amber-900/30 gap-2`}
              >
                {selectedWeather ? (
                  <>
                    {React.createElement(WEATHER_CONDITIONS[selectedWeather].icon, { className: "h-4 w-4" })}
                    {WEATHER_CONDITIONS[selectedWeather].name} Weather
                  </>
                ) : (
                  <>
                    <Cloud className="h-4 w-4" />
                    Weather Mood
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-amber-950 border-amber-900/50">
              {Object.entries(WEATHER_CONDITIONS).map(([key, weather]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => applyWeatherFilter(key as keyof typeof WEATHER_CONDITIONS)}
                  className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer gap-2"
                >
                  {React.createElement(weather.icon, { className: `h-4 w-4 ${weather.color}` })}
                  {weather.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => applyWeatherFilter(null)}
                className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer"
              >
                Clear Weather Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tag filters */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2"
              >
                <Filter className="h-4 w-4" />
                {activeFilters.length > 0 ? `Filters (${activeFilters.length})` : "Filter by Mood"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-amber-950 border-amber-900/50 p-2">
              <div className="grid grid-cols-2 gap-1 mb-2">
                {allTags.map((tag) => (
                  <div
                    key={tag}
                    onClick={() => toggleFilter(tag)}
                    className={`px-2 py-1 rounded text-sm cursor-pointer flex items-center gap-1 ${
                      activeFilters.includes(tag) ? "bg-amber-600 text-white" : "text-amber-300 hover:bg-amber-900/50"
                    }`}
                  >
                    {activeFilters.includes(tag) && <span className="text-xs">✓</span>}
                    {tag}
                  </div>
                ))}
              </div>
              {activeFilters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilters([])}
                  className="w-full text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 text-xs"
                >
                  Clear All Filters
                </Button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Current mood indicator */}
          <div className="ml-auto flex items-center gap-2 text-sm bg-amber-950/30 px-3 py-1.5 rounded-full border border-amber-900/50">
            <span className="text-amber-300/70">Current Mood:</span>
            <span className="font-medium text-amber-400">{currentPeriodInfo.mood}</span>
          </div>
        </div>
      </div>

      {/* Trailer grid with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPeriod}-${selectedWeather}-${activeFilters.join("-")}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredTrailers.length > 0 ? (
            filteredTrailers.map((trailer, index) => (
              <motion.div
                key={trailer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-amber-950/30 rounded-lg overflow-hidden border border-amber-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/20"
                onMouseEnter={() => handleTrailerHover(trailer)}
                onMouseLeave={handleTrailerLeave}
              >
                <div className="relative aspect-video">
                  <Image
                    src={trailer.thumbnail || "/placeholder.svg?height=180&width=320"}
                    alt={trailer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Match Score */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-amber-600/90 text-white text-xs font-bold px-2 py-1 rounded-md">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{trailer.matchScore}% Match</span>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {trailer.duration}
                  </div>

                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-10 right-2 h-8 w-8 rounded-full bg-black/50 ${
                      favorites.includes(trailer.id) ? "text-red-500" : "text-white/70"
                    } hover:text-red-500 hover:bg-black/70 transition-all duration-200`}
                    onClick={(e) => toggleFavorite(trailer.id, e)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(trailer.id) ? "fill-current" : ""}`} />
                  </Button>

                  {/* Share button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-10 left-2 h-8 w-8 rounded-full bg-black/50 text-white/70 hover:text-amber-400 hover:bg-black/70 transition-all duration-200"
                    onClick={(e) => openShareModal(trailer, e)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>

                  {/* Play Button Overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredId === trailer.id ? "opacity-100" : "opacity-0"
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
                      <h3 className="font-bold text-white">{trailer.title}</h3>
                      {trailer.verified && (
                        <VerificationBadge type={trailer.verified as "official" | "premium" | "verified"} size="sm" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                      {trailer.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-amber-300/70 mb-3 line-clamp-2">{trailer.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {trailer.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300 border border-amber-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-amber-400/70">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Perfect for {currentPeriodInfo.name.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(trailer.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={`/trailers/${trailer.id}`} className="absolute inset-0">
                  <span className="sr-only">Watch {trailer.title}</span>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-amber-300 text-lg mb-4">No trailers match your current filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveFilters([])
                  setSelectedWeather(null)
                }}
                className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Trailer preview popup */}
      <AnimatePresence>
        {showPreview && previewData && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-80 bg-amber-950/95 backdrop-blur-sm rounded-lg overflow-hidden border border-amber-800/50 shadow-xl"
          >
            <div className="relative aspect-video">
              <Image
                src={previewData.previewGif || "/placeholder.svg"}
                alt={previewData.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1">{previewData.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-amber-400 border-amber-700/50 text-xs">
                  {previewData.category}
                </Badge>
                <span className="text-xs text-amber-300/70">{previewData.duration}</span>
                <span className="text-xs text-amber-300/70">{previewData.viewCount.toLocaleString()} views</span>
              </div>
              <p className="text-sm text-amber-300/70 mb-3 line-clamp-3">{previewData.description}</p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 gap-2">
                <Play className="h-4 w-4 fill-white" />
                Watch Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share modal */}
      <AnimatePresence>
        {showShareModal && shareTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-amber-950 border border-amber-900/50 rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-amber-400">Share This Trailer</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-amber-300 hover:bg-amber-900/30"
                  onClick={() => setShowShareModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={shareTrailer.thumbnail || "/placeholder.svg"}
                    alt={shareTrailer.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{shareTrailer.title}</h4>
                  <p className="text-sm text-amber-300/70">
                    {shareTrailer.category} • {shareTrailer.duration}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-amber-300/70 mb-2">Share with time context:</p>
                <div className="bg-amber-900/30 p-3 rounded-md text-amber-200 text-sm">
                  Check out this {shareTrailer.category.toLowerCase()} trailer "{shareTrailer.title}" - perfect for{" "}
                  {currentPeriodInfo.name.toLowerCase()} viewing on Tucheki!
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 flex flex-col items-center p-2 h-auto"
                >
                  <Facebook className="h-5 w-5 mb-1" />
                  <span className="text-xs">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 flex flex-col items-center p-2 h-auto"
                >
                  <Twitter className="h-5 w-5 mb-1" />
                  <span className="text-xs">Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 flex flex-col items-center p-2 h-auto"
                >
                  <Mail className="h-5 w-5 mb-1" />
                  <span className="text-xs">Email</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 flex flex-col items-center p-2 h-auto"
                >
                  <LinkIcon className="h-5 w-5 mb-1" />
                  <span className="text-xs">Copy Link</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30">
          View All {currentPeriodInfo.name} Recommendations
        </Button>
      </div>
    </div>
  )
}
