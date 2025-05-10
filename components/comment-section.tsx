"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, ThumbsUp } from "lucide-react"
import { addComment, getComments } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface CommentSectionProps {
  trailerId: string
  commentCount: number
}

interface Comment {
  id: string
  content: string
  created_at: string
  likes: number
  user: {
    id: string
    username: string
    avatar_url: string | null
  }
}

export default function CommentSection({ trailerId, commentCount }: CommentSectionProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        const { comments: fetchedComments, success } = await getComments(trailerId)

        if (success) {
          setComments(fetchedComments as Comment[])
        } else {
          toast({
            title: "Error loading comments",
            description: "Please try again later",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching comments:", error)
        toast({
          title: "Error loading comments",
          description: "Please try again later",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [trailerId, toast])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment on trailers",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const { success, comment, error } = await addComment(trailerId, newComment)

      if (success && comment) {
        // Add new comment to the list
        const newCommentWithUser = {
          ...comment,
          user: {
            id: user.id,
            username: user.user_metadata?.username || user.email?.split("@")[0] || "User",
            avatar_url: user.user_metadata?.avatar_url || null,
          },
        }

        setComments([newCommentWithUser as unknown as Comment, ...comments])
        setNewComment("")
        toast({
          title: "Comment added",
          description: "Your comment has been posted successfully",
        })
      } else {
        throw new Error(error || "Failed to add comment")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      toast({
        title: "Error",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date to relative time
  const formatCommentDate = (dateString: string) => {
    const commentDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - commentDate.getTime())
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return commentDate.toLocaleDateString()
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Comments</h2>
        <div className="flex items-center ml-3 bg-amber-900/30 px-2 py-1 rounded-full">
          <MessageSquare className="h-4 w-4 text-amber-400 mr-1" />
          <span className="text-sm text-amber-300">{comments.length || commentCount}</span>
        </div>
      </div>

      {/* Comment form */}
      <div className="mb-8 bg-amber-950/30 p-6 rounded-lg border border-amber-900/50">
        {user ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border border-amber-900/50">
                <AvatarImage
                  src={user.user_metadata?.avatar_url || "/placeholder.svg?height=40&width=40"}
                  alt={user.user_metadata?.username || "User"}
                />
                <AvatarFallback className="bg-amber-700 text-amber-100">
                  {getInitials(user.user_metadata?.username || user.email?.split("@")[0] || "User")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts about this trailer..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isSubmitting}
                  className="bg-amber-950/50 border-amber-900/50 focus:border-amber-600 resize-none min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-amber-200 mb-4">Sign in to join the conversation and leave comments</p>
            <div className="flex justify-center gap-4">
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30">
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-16 w-full mb-2" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-amber-950/20 p-4 rounded-lg border border-amber-900/30">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-amber-900/50">
                  <AvatarImage
                    src={comment.user.avatar_url || "/placeholder.svg?height=40&width=40"}
                    alt={comment.user.username}
                  />
                  <AvatarFallback className="bg-amber-700 text-amber-100">
                    {getInitials(comment.user.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-amber-300">{comment.user.username}</h4>
                    <span className="text-xs text-amber-400/60">{formatCommentDate(comment.created_at)}</span>
                  </div>
                  <p className="text-amber-100/90 text-sm whitespace-pre-line mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4 text-sm text-amber-400/70">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-amber-400/70 hover:text-amber-400 hover:bg-amber-900/30 gap-1"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {comment.likes || 0}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-amber-400/70 bg-amber-950/20 rounded-lg border border-amber-900/30">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Be the first to comment on this trailer!</p>
          </div>
        )}
      </div>
    </div>
  )
}
