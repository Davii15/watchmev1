"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { getTrendingCategories } from "@/app/actions"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback category images
const categoryImages: Record<string, string> = {
  Action: "/images/action-category.jpg",
  Drama: "/images/drama-category.jpg",
  Comedy: "/images/comedy-category.jpg",
  Documentary: "/images/documentary-category.jpg",
  Romance: "/images/romance-category.jpg",
  Thriller: "/images/thriller-category.jpg",
  Horror: "/placeholder.svg?height=200&width=300",
  Adventure: "/placeholder.svg?height=200&width=300",
  Animation: "/placeholder.svg?height=200&width=300",
  "Sci-Fi": "/placeholder.svg?height=200&width=300",
}

// Fallback data in case database fetch fails
const fallbackCategories = [
  { category: "Action", count: 24 },
  { category: "Drama", count: 18 },
  { category: "Comedy", count: 15 },
  { category: "Documentary", count: 12 },
  { category: "Romance", count: 9 },
  { category: "Thriller", count: 7 },
]

export default function TrendingCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories: fetchedCategories, success } = await getTrendingCategories()

        if (success && fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories)
        } else {
          // Use fallback data if fetch fails
          setCategories(fallbackCategories)
        }
      } catch (error) {
        console.error("Error fetching trending categories:", error)
        setCategories(fallbackCategories)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {isLoading
        ? // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="relative aspect-[3/2] rounded-lg overflow-hidden bg-amber-950/30">
              <Skeleton className="h-full w-full" />
            </div>
          ))
        : // Actual categories
          categories.map((item) => (
            <motion.div
              key={item.category}
              className="relative aspect-[3/2] rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/trailers?category=${encodeURIComponent(item.category)}`}>
                <Image
                  src={categoryImages[item.category] || "/placeholder.svg?height=200&width=300"}
                  alt={item.category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.category}</h3>
                  <p className="text-xs sm:text-sm text-amber-300">{item.count} trailers</p>
                </div>
              </Link>
            </motion.div>
          ))}
    </div>
  )
}
