"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface AdDisplayProps {
  type: "banner" | "sidebar" | "infeed" | "popup"
  position?: "top" | "bottom" | "left" | "right" | "center"
  delay?: number // Delay in milliseconds before showing popup ads
  onClose?: () => void
}

export default function AdDisplay({ type = "banner", position = "top", delay = 3000, onClose }: AdDisplayProps) {
  const [isVisible, setIsVisible] = useState(type !== "popup")
  const [adData, setAdData] = useState({
    imageUrl: "/placeholder.svg?height=300&width=728",
    linkUrl: "#",
    title: "Advertisement",
    description: "Sponsored content",
    sponsor: "TUCHEKI Partner",
  })

  // Simulate fetching ad data
  useEffect(() => {
    // This would be replaced with an actual API call in production
    const mockAds = {
      banner: {
        imageUrl: "/placeholder.svg?height=90&width=728",
        linkUrl: "#",
        title: "Premium Streaming Experience",
        description: "Upgrade your account today for exclusive content",
        sponsor: "TUCHEKI Premium",
      },
      sidebar: {
        imageUrl: "/placeholder.svg?height=600&width=300",
        linkUrl: "#",
        title: "New Movie Release",
        description: "Watch the trailer now",
        sponsor: "Kenyan Film Studios",
      },
      infeed: {
        imageUrl: "/placeholder.svg?height=250&width=300",
        linkUrl: "#",
        title: "Local Business Spotlight",
        description: "Supporting Kenyan businesses",
        sponsor: "Nairobi Chamber of Commerce",
      },
      popup: {
        imageUrl: "/placeholder.svg?height=400&width=600",
        linkUrl: "#",
        title: "Special Offer",
        description: "Limited time promotion",
        sponsor: "TUCHEKI Partners",
      },
    }

    setAdData(mockAds[type])

    // For popup ads, show after delay
    if (type === "popup") {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [type, delay])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  // Banner ad (horizontal, typically at top or bottom)
  if (type === "banner") {
    return (
      <div
        className={`w-full bg-amber-950/80 border border-amber-800/50 rounded-md overflow-hidden ${
          position === "top" ? "mb-6" : "mt-6"
        }`}
      >
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 bg-black/40 hover:bg-black/60 text-white z-10"
            onClick={handleClose}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close ad</span>
          </Button>
          <Link href={adData.linkUrl} className="block relative">
            <div className="flex items-center justify-center h-[90px] w-full">
              <Image
                src={adData.imageUrl || "/placeholder.svg"}
                alt={adData.title}
                width={728}
                height={90}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-2 text-[10px] bg-black/40 text-white px-1 rounded">
              Ad • {adData.sponsor}
            </div>
          </Link>
        </div>
      </div>
    )
  }

  // Sidebar ad (vertical, typically on left or right)
  if (type === "sidebar") {
    return (
      <div className="w-full max-w-[300px] bg-amber-950/80 border border-amber-800/50 rounded-md overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 bg-black/40 hover:bg-black/60 text-white z-10"
            onClick={handleClose}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close ad</span>
          </Button>
          <Link href={adData.linkUrl} className="block">
            <div className="flex items-center justify-center h-[600px] w-full">
              <Image
                src={adData.imageUrl || "/placeholder.svg"}
                alt={adData.title}
                width={300}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-2 text-[10px] bg-black/40 text-white px-1 rounded">
              Ad • {adData.sponsor}
            </div>
          </Link>
        </div>
      </div>
    )
  }

  // In-feed ad (appears within content)
  if (type === "infeed") {
    return (
      <div className="w-full bg-amber-950/80 border border-amber-800/50 rounded-md overflow-hidden my-4">
        <div className="relative p-3">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 bg-black/40 hover:bg-black/60 text-white z-10"
            onClick={handleClose}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close ad</span>
          </Button>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href={adData.linkUrl} className="block flex-shrink-0">
              <Image
                src={adData.imageUrl || "/placeholder.svg"}
                alt={adData.title}
                width={300}
                height={250}
                className="rounded-md w-full md:w-[300px] h-auto object-cover"
              />
            </Link>
            <div className="flex flex-col justify-center">
              <div className="text-xs text-amber-400/70 mb-1">Sponsored</div>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">{adData.title}</h3>
              <p className="text-amber-200/80 mb-3">{adData.description}</p>
              <div className="mt-auto">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">Learn More</Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-amber-400/70">Ad • {adData.sponsor}</div>
        </div>
      </div>
    )
  }

  // Popup ad (modal overlay)
  if (type === "popup") {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="relative bg-amber-950 border border-amber-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-black/40 hover:bg-black/60 text-white z-10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close ad</span>
          </Button>
          <div className="p-6">
            <div className="text-xs text-amber-400/70 mb-1">Sponsored</div>
            <h3 className="text-xl font-semibold text-amber-300 mb-4">{adData.title}</h3>
            <div className="flex justify-center mb-4">
              <Image
                src={adData.imageUrl || "/placeholder.svg"}
                alt={adData.title}
                width={600}
                height={400}
                className="rounded-md w-full h-auto object-cover"
              />
            </div>
            <p className="text-amber-200/80 mb-6">{adData.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-amber-400/70">Ad • {adData.sponsor}</span>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                  onClick={handleClose}
                >
                  No Thanks
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Link href={adData.linkUrl} className="block">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
