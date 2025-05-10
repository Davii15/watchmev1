"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import { toggleTrailerLike, checkTrailerLike } from "@/app/actions"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

interface LikeButtonProps {
  trailerId: string
  initialLikes: number
}

export default function LikeButton({ trailerId, initialLikes }: LikeButtonProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if user has already liked this trailer
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!user) return

      try {
        const { liked, success } = await checkTrailerLike(trailerId)
        if (success) {
          setIsLiked(liked)
        }
      } catch (error) {
        console.error("Error checking like status:", error)
      }
    }

    checkLikeStatus()
  }, [trailerId, user])

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like trailers",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { success, liked, error } = await toggleTrailerLike(trailerId)

      if (success) {
        setIsLiked(liked)
        setLikes((prev) => (liked ? prev + 1 : prev - 1))
      } else {
        throw new Error(error || "Failed to process like")
      }
    } catch (error) {
      console.error("Error toggling like:", error)
      toast({
        title: "Error",
        description: "Failed to process your like. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      className={`gap-2 ${
        isLiked
          ? "bg-amber-600 hover:bg-amber-700 text-white"
          : "border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
      }`}
      onClick={handleLike}
      disabled={isLoading}
    >
      <ThumbsUp className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
      {isLoading ? "Processing..." : `${likes.toLocaleString()} ${likes === 1 ? "Like" : "Likes"}`}
    </Button>
  )
}
