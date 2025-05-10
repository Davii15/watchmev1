import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Download, TrendingUp, Calendar } from "lucide-react"
import VideoPlayer from "@/components/video-player"
import CommentSection from "@/components/comment-section"
import RelatedTrailers from "@/components/related-trailers"
import { getTrailerDetails } from "@/app/actions"
import SocialShareButtons from "@/components/social-share-buttons"
import LikeButton from "@/components/like-button"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AdDisplay from "@/components/ad-display"



// Fallback data in case database fetch fails
const fallbackTrailerData = {
  id: "1",
  title: "Savannah Sunrise",
  description:
    "Experience the breathtaking beauty of Kenya's savannah in this emotional journey of a wildlife photographer who discovers more than just amazing shots. A story of conservation, connection, and the circle of life.",
  category: "Drama",
  thumbnail: "/placeholder.svg?height=720&width=1280",
  video_src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  views: 12540,
  likes: 3240,
  comments: 89,
  trending: true,
  release_date: "2023-09-15",
  director: "Wanjiku Mwangi",
  cast: ["John Kamau", "Aisha Omar", "David Ochieng"],
  duration: "2:15",
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Try to fetch trailer data
  const { trailer, success } = await getTrailerDetails(params.id)

  // Use fetched data or fallback
  const trailerData = success && trailer ? trailer : fallbackTrailerData

  return {
    title: `${trailerData.title} | Tucheki Trailers`,
    description: trailerData.description,
    openGraph: {
      title: `${trailerData.title} | Tucheki Trailers`,
      description: trailerData.description,
      images: [trailerData.thumbnail],
    },
  }
}

export default async function TrailerPage({ params }: { params: { id: string } }) {
  // Try to fetch trailer data from database
  const { trailer, success } = await getTrailerDetails(params.id)

  // If trailer not found and database query was successful, show 404
  if (!trailer && success) {
    notFound()
  }

  // Use fetched data or fallback if fetch failed
  const trailerData = success && trailer ? trailer : fallbackTrailerData

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
        <AdDisplay type="banner" position="top" />

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-amber-400">{trailerData.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-amber-200/70">
            <Badge variant="outline" className="text-amber-400 border-amber-700/50">
              {trailerData.category}
            </Badge>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {trailerData.release_date}
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {trailerData.views.toLocaleString()} views
            </div>
            {trailerData.trending && (
              <Badge className="bg-amber-600 hover:bg-amber-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-8 rounded-lg overflow-hidden border border-amber-900/50">
          <VideoPlayer videoSrc={trailerData.video_src} poster={trailerData.thumbnail} trailerId={params.id} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <LikeButton trailerId={params.id} initialLikes={trailerData.likes} />

          <SocialShareButtons trailerId={params.id} title={trailerData.title} />

          <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
            <Download className="h-5 w-5" />
            Download
          </Button>
        </div>

        {/* Description */}
        <div className="mb-8 bg-amber-950/30 p-6 rounded-lg border border-amber-900/50">
          <h2 className="text-xl font-bold mb-4 text-amber-400">About This Trailer</h2>
          <p className="text-amber-100/90 mb-4">{trailerData.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-sm font-medium text-amber-400/70 mb-1">Director</h3>
              <p className="text-amber-100">{trailerData.director || "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-400/70 mb-1">Cast</h3>
              <p className="text-amber-100">
                {Array.isArray(trailerData.cast) && trailerData.cast.length > 0
                  ? trailerData.cast.join(", ")
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-amber-900/30" />
    
        {/* In-feed Ad */}
       <div className="my-6">
              <AdDisplay type="infeed" />
            </div>

        {/* Comments Section */}
        <CommentSection trailerId={params.id} commentCount={trailerData.comments} />

        <Separator className="my-8 bg-amber-900/30" />
    
          {/* Sidebar */}
         <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Sidebar Ad */}
              <AdDisplay type="sidebar" />



        {/* Related Trailers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">You May Also Like</h2>
          <RelatedTrailers currentId={params.id} category={trailerData.category} />
        </div>
      </div>
      </div>
      </div>
    </main>
  )
}
