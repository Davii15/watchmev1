"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, LinkIcon, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { shareTrailer } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"

interface SocialShareButtonsProps {
  trailerId: string
  title: string
}

export default function SocialShareButtons({ trailerId, title }: SocialShareButtonsProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleShare = async (platform: string) => {
    // Record share analytics
    try {
      await shareTrailer(trailerId, platform)
    } catch (error) {
      console.error("Error recording share:", error)
    }

    // Share based on platform
    const shareUrl = `${window.location.origin}/trailers/${trailerId}`
    const shareText = `Check out "${title}" on Tucheki Trailers!`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
        )
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopied(true)
          toast({
            title: "Link copied!",
            description: "Share link has been copied to clipboard",
          })
          setTimeout(() => setCopied(false), 3000)
        })
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              text: shareText,
              url: shareUrl,
            })
          } catch (error) {
            console.error("Error sharing:", error)
          }
        }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
          <Share2 className="h-5 w-5" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-amber-950 border-amber-800">
        <DropdownMenuItem
          className="flex items-center gap-2 text-amber-200 hover:bg-amber-900 cursor-pointer"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-4 w-4 text-blue-500" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 text-amber-200 hover:bg-amber-900 cursor-pointer"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-4 w-4 text-sky-500" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 text-amber-200 hover:bg-amber-900 cursor-pointer"
          onClick={() => handleShare("copy")}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4 text-amber-400" />}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
