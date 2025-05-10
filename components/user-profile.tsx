"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  Settings,
  LogOut,
  Heart,
  Clock,
  Eye,
  Star,
  Calendar,
  Film,
  Share2,
  BarChart3,
  Award,
  Bookmark,
  Play,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import VerificationBadge from "@/components/verification-badge"

// Mock user data
const userData = {
  id: "user123",
  name: "John Kamau",
  username: "@johnkamau",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Film enthusiast and wildlife documentary lover. Always looking for the next great Kenyan story.",
  location: "Nairobi, Kenya",
  memberSince: "May 2023",
  stats: {
    watched: 127,
    favorites: 42,
    reviews: 18,
    followers: 56,
    following: 34,
  },
  badges: [
    { name: "Early Adopter", icon: Award },
    { name: "Top Reviewer", icon: Star },
    { name: "Film Buff", icon: Film },
  ],
  preferences: {
    categories: ["Documentary", "Drama", "Action"],
    notifications: true,
    privateAccount: false,
    language: "English",
    theme: "Dark",
  },
  watchHistory: [
    {
      id: 1,
      title: "Savannah Sunrise",
      category: "Documentary",
      thumbnail: "/images/safari-wildlife.jpg",
      watchedOn: "2023-07-15",
      progress: 100,
      duration: "2:15",
      verified: "official",
    },
    {
      id: 2,
      title: "Nairobi Nights",
      category: "Drama",
      thumbnail: "/images/nairobi-nights.jpg",
      watchedOn: "2023-07-12",
      progress: 100,
      duration: "2:30",
      verified: "verified",
    },
    {
      id: 3,
      title: "Mombasa Memories",
      category: "Romance",
      thumbnail: "/images/mombasa-memories.jpg",
      watchedOn: "2023-07-10",
      progress: 85,
      duration: "2:18",
      verified: "premium",
    },
    {
      id: 4,
      title: "Kilimanjaro Secrets",
      category: "Thriller",
      thumbnail: "/images/kilimanjaro-mystery.jpg",
      watchedOn: "2023-07-05",
      progress: 65,
      duration: "2:15",
    },
  ],
  favorites: [
    {
      id: 101,
      title: "Savannah Sunrise",
      category: "Documentary",
      thumbnail: "/images/safari-wildlife.jpg",
      addedOn: "2023-06-20",
      duration: "2:15",
      verified: "official",
    },
    {
      id: 102,
      title: "Maasai Warriors",
      category: "Action",
      thumbnail: "/images/maasai-warriors.jpg",
      addedOn: "2023-06-15",
      duration: "2:22",
      verified: "premium",
    },
    {
      id: 103,
      title: "Lake Victoria Mystery",
      category: "Mystery",
      thumbnail: "/images/lake-victoria.jpg",
      addedOn: "2023-06-10",
      duration: "2:20",
      verified: "premium",
    },
  ],
  watchlist: [
    {
      id: 201,
      title: "Nairobi After Dark",
      category: "Thriller",
      thumbnail: "/images/nairobi-by-night.jpg",
      addedOn: "2023-07-01",
      duration: "2:28",
      verified: "verified",
    },
    {
      id: 202,
      title: "Coastal Love",
      category: "Romance",
      thumbnail: "/images/coastal-love.jpg",
      addedOn: "2023-06-28",
      duration: "2:12",
      verified: "verified",
    },
  ],
  reviews: [
    {
      id: 301,
      trailerTitle: "Savannah Sunrise",
      trailerThumbnail: "/images/safari-wildlife.jpg",
      rating: 5,
      content:
        "Absolutely breathtaking cinematography! This documentary captures the essence of Kenya's wildlife in a way I've never seen before. The storytelling is compelling and the visuals are stunning.",
      date: "2023-07-10",
      likes: 24,
    },
    {
      id: 302,
      trailerTitle: "Nairobi Nights",
      trailerThumbnail: "/images/nairobi-nights.jpg",
      rating: 4,
      content:
        "A gripping drama that showcases the vibrant nightlife of Nairobi. The character development is excellent, though the pacing could be improved in some scenes.",
      date: "2023-06-25",
      likes: 18,
    },
  ],
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] min-h-screen text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="rounded-full object-cover border-4 border-amber-600"
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-600 rounded-full p-1.5">
                <Edit className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-amber-400">{userData.name}</h1>
                    <VerificationBadge type="verified" />
                  </div>
                  <p className="text-amber-300/70">{userData.username}</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                    size="icon"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                    size="icon"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-amber-100/90 mb-4">{userData.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-amber-300/70">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Joined {userData.memberSince}
                </div>
                <div className="flex items-center text-amber-300/70">
                  <Eye className="h-4 w-4 mr-1.5" />
                  {userData.stats.watched} trailers watched
                </div>
                <div className="flex items-center text-amber-300/70">
                  <Heart className="h-4 w-4 mr-1.5" />
                  {userData.stats.favorites} favorites
                </div>
                <div className="flex items-center text-amber-300/70">
                  <Star className="h-4 w-4 mr-1.5" />
                  {userData.stats.reviews} reviews
                </div>
              </div>
            </div>
          </div>

          {/* User Badges */}
          <div className="mt-6 pt-6 border-t border-amber-900/30">
            <h3 className="text-sm font-medium text-amber-300 mb-3">Badges</h3>
            <div className="flex flex-wrap gap-3">
              {userData.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-amber-900/30 px-3 py-1.5 rounded-full">
                  {React.createElement(badge.icon, { className: "h-4 w-4 text-amber-500" })}
                  <span className="text-amber-200 text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-amber-950/50 border border-amber-900/50 p-1 mb-8 overflow-x-auto flex flex-nowrap max-w-full">
            <TabsTrigger value="overview" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Watch History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Favorites
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Statistics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-amber-400 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {userData.watchHistory.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-12 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-medium text-amber-200">{item.title}</h3>
                            {item.verified && (
                              <VerificationBadge
                                type={item.verified as "official" | "premium" | "verified"}
                                size="sm"
                              />
                            )}
                          </div>
                          <p className="text-sm text-amber-300/70">Watched on {formatDate(item.watchedOn)}</p>
                        </div>
                      </div>
                    ))}

                    {userData.reviews.slice(0, 1).map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <div className="relative w-20 h-12 flex-shrink-0">
                          <Image
                            src={review.trailerThumbnail || "/placeholder.svg"}
                            alt={review.trailerTitle}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-medium text-amber-200">Reviewed {review.trailerTitle}</h3>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "text-amber-500 fill-amber-500" : "text-amber-500/30"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-amber-300/70">Posted on {formatDate(review.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorites Preview */}
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-amber-400">Favorites</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                      onClick={() => setActiveTab("favorites")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.favorites.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="group relative bg-amber-950/20 rounded overflow-hidden border border-amber-900/30"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {item.duration}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" className="rounded-full bg-amber-600/90 hover:bg-amber-600 h-10 w-10">
                              <Play className="h-5 w-5 fill-white" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-medium text-white text-sm line-clamp-1">{item.title}</h3>
                            {item.verified && (
                              <VerificationBadge
                                type={item.verified as "official" | "premium" | "verified"}
                                size="sm"
                              />
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs text-amber-400 border-amber-700/50">
                            {item.category}
                          </Badge>
                        </div>
                        <Link href={`/trailers/${item.id}`} className="absolute inset-0">
                          <span className="sr-only">Watch {item.title}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* User Stats */}
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-amber-400 mb-4">Your Stats</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Watch Progress</span>
                        <span className="text-amber-300">{userData.stats.watched} / 200</span>
                      </div>
                      <Progress
                        value={(userData.stats.watched / 200) * 100}
                        className="h-2 bg-amber-950/50 [&>div]:bg-amber-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Review Status</span>
                        <span className="text-amber-300">{userData.stats.reviews} / 50</span>
                      </div>
                      <Progress
                        value={(userData.stats.reviews / 50) * 100}
                        className="h-2 bg-amber-950/50 [&>div]:bg-amber-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Favorite Genres</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userData.preferences.categories.map((category) => (
                          <Badge key={category} className="bg-amber-600 hover:bg-amber-700">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Watchlist Preview */}
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-amber-400">Watchlist</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                      onClick={() => setActiveTab("watchlist")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {userData.watchlist.map((item) => (
                      <div key={item.id} className="flex gap-3 group">
                        <div className="relative w-16 h-10 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium text-amber-200 text-sm truncate">{item.title}</h3>
                            {item.verified && (
                              <VerificationBadge
                                type={item.verified as "official" | "premium" | "verified"}
                                size="sm"
                              />
                            )}
                          </div>
                          <p className="text-xs text-amber-300/70">
                            {item.category} • {item.duration}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-amber-400 mb-4">Preferences</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-300/70">Notifications</span>
                      <span className="text-amber-300">{userData.preferences.notifications ? "On" : "Off"}</span>
                    </div>
                    <Separator className="bg-amber-900/30" />
                    <div className="flex justify-between">
                      <span className="text-amber-300/70">Private Account</span>
                      <span className="text-amber-300">{userData.preferences.privateAccount ? "Yes" : "No"}</span>
                    </div>
                    <Separator className="bg-amber-900/30" />
                    <div className="flex justify-between">
                      <span className="text-amber-300/70">Language</span>
                      <span className="text-amber-300">{userData.preferences.language}</span>
                    </div>
                    <Separator className="bg-amber-900/30" />
                    <div className="flex justify-between">
                      <span className="text-amber-300/70">Theme</span>
                      <span className="text-amber-300">{userData.preferences.theme}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Watch History Tab */}
          <TabsContent value="history">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-amber-400">Watch History</h2>
                <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
                  <Clock className="h-4 w-4" />
                  Clear History
                </Button>
              </div>

              <div className="space-y-6">
                {userData.watchHistory.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-amber-900/30 pb-6 last:border-0">
                    <div className="relative w-40 h-24 flex-shrink-0">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="icon" className="rounded-full bg-amber-600/90 hover:bg-amber-600 h-10 w-10">
                          <Play className="h-5 w-5 fill-white" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-medium text-amber-200">{item.title}</h3>
                        {item.verified && (
                          <VerificationBadge type={item.verified as "official" | "premium" | "verified"} size="sm" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-amber-300/70 mb-2">
                        <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                          {item.category}
                        </Badge>
                        <span>{item.duration}</span>
                        <span>Watched on {formatDate(item.watchedOn)}</span>
                      </div>
                      <div className="w-full">
                        <Progress value={item.progress} className="h-1.5 bg-amber-950/50 [&>div]:bg-amber-600" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-amber-400">Favorites</h2>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
                    <Share2 className="h-4 w-4" />
                    Share List
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userData.favorites.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-amber-950/20 rounded-lg overflow-hidden border border-amber-900/30"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" className="rounded-full bg-amber-600/90 hover:bg-amber-600 h-12 w-12">
                          <Play className="h-6 w-6 fill-white" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 left-2 h-8 w-8 rounded-full bg-black/50 text-red-500 hover:bg-black/70"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        {item.verified && (
                          <VerificationBadge type={item.verified as "official" | "premium" | "verified"} size="sm" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-amber-300/70">Added {formatDate(item.addedOn)}</span>
                      </div>
                    </div>
                    <Link href={`/trailers/${item.id}`} className="absolute inset-0">
                      <span className="sr-only">Watch {item.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-amber-400">Watchlist</h2>
                <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
                  <Filter className="h-4 w-4" />
                  Sort By
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userData.watchlist.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-amber-950/20 rounded-lg overflow-hidden border border-amber-900/30"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" className="rounded-full bg-amber-600/90 hover:bg-amber-600 h-12 w-12">
                          <Play className="h-6 w-6 fill-white" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 left-2 h-8 w-8 rounded-full bg-black/50 text-amber-400 hover:bg-black/70"
                      >
                        <Bookmark className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        {item.verified && (
                          <VerificationBadge type={item.verified as "official" | "premium" | "verified"} size="sm" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-amber-300/70">Added {formatDate(item.addedOn)}</span>
                      </div>
                    </div>
                    <Link href={`/trailers/${item.id}`} className="absolute inset-0">
                      <span className="sr-only">Watch {item.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-amber-400 mb-6">Your Reviews</h2>

              <div className="space-y-8">
                {userData.reviews.map((review) => (
                  <div key={review.id} className="border-b border-amber-900/30 pb-8 last:border-0">
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <Image
                          src={review.trailerThumbnail || "/placeholder.svg"}
                          alt={review.trailerTitle}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-200 mb-1">{review.trailerTitle}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-amber-500 fill-amber-500" : "text-amber-500/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-amber-300/70">Posted on {formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-amber-100/90 mb-4">{review.content}</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Review
                      </Button>
                      <div className="flex items-center text-amber-300/70 text-sm">
                        <Heart className="h-4 w-4 mr-1.5 text-red-500" />
                        {review.likes} people found this helpful
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-amber-400">Viewing Statistics</h2>
                <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30 gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Export Data
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Viewing Habits */}
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-amber-400 mb-4">Viewing Habits</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Total Watch Time</span>
                        <span className="text-amber-300">42.5 hours</span>
                      </div>
                      <Progress value={70} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Trailers Watched</span>
                        <span className="text-amber-300">{userData.stats.watched} trailers</span>
                      </div>
                      <Progress value={65} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Average Rating Given</span>
                        <span className="text-amber-300">4.2 / 5</span>
                      </div>
                      <Progress value={84} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Engagement Score</span>
                        <span className="text-amber-300">78 / 100</span>
                      </div>
                      <Progress value={78} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                  </div>
                </div>

                {/* Category Preferences */}
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-amber-400 mb-4">Category Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Documentary</span>
                        <span className="text-amber-300">45%</span>
                      </div>
                      <Progress value={45} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Drama</span>
                        <span className="text-amber-300">30%</span>
                      </div>
                      <Progress value={30} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Action</span>
                        <span className="text-amber-300">15%</span>
                      </div>
                      <Progress value={15} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Others</span>
                        <span className="text-amber-300">10%</span>
                      </div>
                      <Progress value={10} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                  </div>
                </div>

                {/* Viewing Time */}
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-amber-400 mb-4">Viewing Time</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Morning (5AM-12PM)</span>
                        <span className="text-amber-300">20%</span>
                      </div>
                      <Progress value={20} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Afternoon (12PM-5PM)</span>
                        <span className="text-amber-300">15%</span>
                      </div>
                      <Progress value={15} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Evening (5PM-9PM)</span>
                        <span className="text-amber-300">25%</span>
                      </div>
                      <Progress value={25} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">Night (9PM-5AM)</span>
                        <span className="text-amber-300">40%</span>
                      </div>
                      <Progress value={40} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-5">
                  <h3 className="text-lg font-medium text-amber-400 mb-4">Monthly Activity</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">May 2023</span>
                        <span className="text-amber-300">32 trailers</span>
                      </div>
                      <Progress value={64} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">June 2023</span>
                        <span className="text-amber-300">45 trailers</span>
                      </div>
                      <Progress value={90} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-amber-300/70">July 2023</span>
                        <span className="text-amber-300">50 trailers</span>
                      </div>
                      <Progress value={100} className="h-2 bg-amber-950/50 [&>div]:bg-amber-600" />
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 text-xs"
                      >
                        View Full Activity History
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
