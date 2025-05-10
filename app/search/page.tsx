import AdvancedSearch from "@/components/advanced-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Film, TrendingUp, Clock, Calendar, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import VerificationBadge from "@/components/verification-badge"

// Mock trending searches
const trendingSearches = [
  "Kenyan wildlife",
  "Nairobi drama",
  "Savannah adventure",
  "Maasai culture",
  "Coastal romance",
  "Thriller",
]

// Mock popular categories
const popularCategories = [
  { name: "Documentary", count: 45 },
  { name: "Drama", count: 38 },
  { name: "Action", count: 32 },
  { name: "Romance", count: 24 },
  { name: "Comedy", count: 20 },
  { name: "Thriller", count: 18 },
]

// Mock recent releases
const recentReleases = [
  {
    id: 101,
    title: "Savannah Sunrise",
    category: "Documentary",
    thumbnail: "/images/safari-wildlife.jpg",
    releaseDate: "2023-07-15",
    duration: "2:15",
    verified: "official",
  },
  {
    id: 102,
    title: "Nairobi Nights",
    category: "Drama",
    thumbnail: "/images/nairobi-nights.jpg",
    releaseDate: "2023-07-01",
    duration: "2:30",
    verified: "verified",
  },
  {
    id: 103,
    title: "Mombasa Memories",
    category: "Romance",
    thumbnail: "/images/mombasa-memories.jpg",
    releaseDate: "2023-06-20",
    duration: "2:18",
    verified: "premium",
  },
]

// Mock trending trailers
const trendingTrailers = [
  {
    id: 201,
    title: "Maasai Warriors",
    category: "Action",
    thumbnail: "/images/maasai-warriors.jpg",
    views: 24560,
    duration: "2:22",
    verified: "premium",
  },
  {
    id: 202,
    title: "Lake Victoria Mystery",
    category: "Mystery",
    thumbnail: "/images/lake-victoria.jpg",
    views: 18970,
    duration: "2:20",
    verified: "premium",
  },
  {
    id: 203,
    title: "Coastal Love",
    category: "Romance",
    thumbnail: "/images/coastal-love.jpg",
    views: 15840,
    duration: "2:12",
    verified: "verified",
  },
]

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] text-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Discover Trailers
          </h1>
          <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
            Find the perfect trailers from Kenya's vibrant film industry
          </p>
        </div>

        {/* Advanced Search Component */}
        <AdvancedSearch />

        {/* Tabs for different search views */}
        <Tabs defaultValue="discover" className="mt-12">
          <TabsList className="bg-amber-950/50 border border-amber-900/50 p-1 mb-8 overflow-x-auto flex flex-nowrap max-w-full">
            <TabsTrigger value="discover" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Discover
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Recent Releases
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Trending Searches */}
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-amber-400">Trending Searches</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <Badge key={index} className="bg-amber-900/40 hover:bg-amber-900/60 text-amber-300 cursor-pointer">
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Film className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-amber-400">Popular Categories</h2>
                </div>
                <div className="space-y-2">
                  {popularCategories.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <Link
                        href={`/trailers?category=${category.name.toLowerCase()}`}
                        className="text-amber-300 hover:text-amber-400 transition-colors"
                      >
                        {category.name}
                      </Link>
                      <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Tips */}
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-amber-400 mb-4">Search Tips</h2>
                <ul className="space-y-3 text-amber-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    Use specific keywords for better results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    Filter by category to narrow down results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    Sort by rating to find the highest-rated trailers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    Use the duration filter to find trailers of specific length
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    Search by director or actor names
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Trending Now
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingTrailers.map((trailer) => (
                  <div
                    key={trailer.id}
                    className="group relative bg-amber-950/30 rounded-lg overflow-hidden border border-amber-900/50 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={trailer.thumbnail || "/placeholder.svg"}
                        alt={trailer.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {trailer.duration}
                      </div>

                      <div className="absolute top-2 left-2 bg-amber-600/90 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button className="rounded-full bg-amber-600/90 hover:bg-amber-600 gap-2">Watch Now</Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="font-bold text-white">{trailer.title}</h3>
                        {trailer.verified && (
                          <VerificationBadge type={trailer.verified as "official" | "premium" | "verified"} size="sm" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                          {trailer.category}
                        </Badge>
                        <div className="flex items-center text-sm text-amber-300/70">
                          <Eye className="h-4 w-4 mr-1" />
                          {trailer.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Link href={`/trailers/${trailer.id}`} className="absolute inset-0">
                      <span className="sr-only">Watch {trailer.title}</span>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30">
                  View All Trending Trailers
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Recent Releases Tab */}
          <TabsContent value="recent">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Recent Releases
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentReleases.map((trailer) => (
                  <div
                    key={trailer.id}
                    className="group relative bg-amber-950/30 rounded-lg overflow-hidden border border-amber-900/50 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={trailer.thumbnail || "/placeholder.svg"}
                        alt={trailer.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {trailer.duration}
                      </div>

                      <div className="absolute top-2 left-2 bg-green-600/90 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        New
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button className="rounded-full bg-amber-600/90 hover:bg-amber-600 gap-2">Watch Now</Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="font-bold text-white">{trailer.title}</h3>
                        {trailer.verified && (
                          <VerificationBadge type={trailer.verified as "official" | "premium" | "verified"} size="sm" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-amber-400 border-amber-700/50">
                          {trailer.category}
                        </Badge>
                        <div className="flex items-center text-sm text-amber-300/70">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(trailer.releaseDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <Link href={`/trailers/${trailer.id}`} className="absolute inset-0">
                      <span className="sr-only">Watch {trailer.title}</span>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30">
                  View All Recent Releases
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                <Film className="h-6 w-6" />
                Browse by Category
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "Action",
                  "Adventure",
                  "Comedy",
                  "Documentary",
                  "Drama",
                  "Family",
                  "Horror",
                  "Mystery",
                  "Romance",
                  "Thriller",
                  "Animation",
                  "Fantasy",
                ].map((category) => (
                  <Link
                    key={category}
                    href={`/trailers?category=${category.toLowerCase()}`}
                    className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-4 hover:bg-amber-900/40 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-amber-400 mb-1">{category}</h3>
                    <p className="text-sm text-amber-300/70">{Math.floor(Math.random() * 50) + 10} trailers</p>
                  </Link>
                ))}
              </div>

              <Separator className="bg-amber-900/30 my-8" />

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-amber-400">Popular Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "wildlife",
                    "nature",
                    "urban",
                    "cultural",
                    "inspiring",
                    "educational",
                    "suspense",
                    "relationships",
                    "family",
                    "adventure",
                    "action",
                    "comedy",
                    "beach",
                    "mountain",
                    "lake",
                    "island",
                    "detective",
                    "mystery",
                    "food",
                    "lifestyle",
                    "thriller",
                    "horror",
                    "romance",
                    "sunset",
                    "savannah",
                  ].map((tag, index) => (
                    <Badge key={index} className="bg-amber-900/40 hover:bg-amber-900/60 text-amber-300 cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
