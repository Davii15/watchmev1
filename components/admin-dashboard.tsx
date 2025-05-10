"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import {
  BarChart,
  Film,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  Trash2,
  Edit,
  Calendar,
  Clock,
  Tag,
  User,
  Award,
} from "lucide-react"
import {
  getTrailers,
  getAds,
  createTrailer,
  updateTrailer,
  deleteTrailer,
  createAd,
  updateAd,
  deleteAd,
  getTrailerAnalytics,
  getUserAnalytics,
  uploadFile,
} from "@/app/admin/actions"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title)

// Types
type Trailer = {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  genre: string
  release_date: string
  director: string
  cast: string
  duration: number
  featured: boolean
  created_at: string
}

type Ad = {
  id: string
  title: string
  description: string
  image_url: string
  link_url: string
  start_date: string
  end_date: string
  placement: string
  active: boolean
  created_at: string
}

type TrailerAnalytics = {
  id: string
  title: string
  views: number
  likes: number
  comments: number
  engagement: number
}

type UserAnalytics = {
  totalUsers: number
  activeUsers: number
  registrationTrend: { date: string; count: number }[]
}

export default function AdminDashboard() {
  // State for tabs
  const [activeTab, setActiveTab] = useState("overview")

  // State for data
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [trailerAnalytics, setTrailerAnalytics] = useState<TrailerAnalytics[]>([])
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics | null>(null)

  // State for loading
  const [isLoading, setIsLoading] = useState(true)

  // State for forms
  const [newTrailer, setNewTrailer] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    genre: "",
    release_date: "",
    director: "",
    cast: "",
    duration: 0,
    featured: false,
  })

  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    image_url: "",
    link_url: "",
    start_date: "",
    end_date: "",
    placement: "home",
    active: true,
  })

  const [editingTrailerId, setEditingTrailerId] = useState<string | null>(null)
  const [editingAdId, setEditingAdId] = useState<string | null>(null)

  // State for file uploads
  const [trailerThumbnailFile, setTrailerThumbnailFile] = useState<File | null>(null)
  const [adImageFile, setAdImageFile] = useState<File | null>(null)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        // Fetch trailers
        const { trailers: trailerData } = await getTrailers()
        setTrailers(trailerData)

        // Fetch ads
        const { ads: adData } = await getAds()
        setAds(adData)

        // Fetch analytics
        if (activeTab === "overview" || activeTab === "analytics") {
          const { analytics: trailerAnalyticsData } = await getTrailerAnalytics()
          setTrailerAnalytics(trailerAnalyticsData)

          const { analytics: userAnalyticsData } = await getUserAnalytics()
          setUserAnalytics(userAnalyticsData)
        }
      } catch (error) {
        console.error("Error fetching admin data:", error)
        toast({
          title: "Error",
          description: "Failed to load admin data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  // Handle trailer form submission
  const handleTrailerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let thumbnailUrl = newTrailer.thumbnail_url

      // Upload thumbnail if provided
      if (trailerThumbnailFile) {
        const fileName = `trailers/${Date.now()}-${trailerThumbnailFile.name}`
        const { success, url } = await uploadFile(trailerThumbnailFile, fileName)

        if (success && url) {
          thumbnailUrl = url
        } else {
          throw new Error("Failed to upload thumbnail")
        }
      }

      const trailerData = {
        ...newTrailer,
        thumbnail_url: thumbnailUrl,
      }

      if (editingTrailerId) {
        // Update existing trailer
        const { success } = await updateTrailer(editingTrailerId, trailerData)

        if (success) {
          toast({
            title: "Success",
            description: "Trailer updated successfully",
          })

          // Refresh trailers
          const { trailers: updatedTrailers } = await getTrailers()
          setTrailers(updatedTrailers)

          // Reset form
          setNewTrailer({
            title: "",
            description: "",
            video_url: "",
            thumbnail_url: "",
            genre: "",
            release_date: "",
            director: "",
            cast: "",
            duration: 0,
            featured: false,
          })
          setEditingTrailerId(null)
          setTrailerThumbnailFile(null)
        } else {
          throw new Error("Failed to update trailer")
        }
      } else {
        // Create new trailer
        const { success } = await createTrailer(trailerData)

        if (success) {
          toast({
            title: "Success",
            description: "Trailer created successfully",
          })

          // Refresh trailers
          const { trailers: updatedTrailers } = await getTrailers()
          setTrailers(updatedTrailers)

          // Reset form
          setNewTrailer({
            title: "",
            description: "",
            video_url: "",
            thumbnail_url: "",
            genre: "",
            release_date: "",
            director: "",
            cast: "",
            duration: 0,
            featured: false,
          })
          setTrailerThumbnailFile(null)
        } else {
          throw new Error("Failed to create trailer")
        }
      }
    } catch (error) {
      console.error("Error submitting trailer:", error)
      toast({
        title: "Error",
        description: "Failed to save trailer. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle ad form submission
  const handleAdSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = newAd.image_url

      // Upload image if provided
      if (adImageFile) {
        const fileName = `ads/${Date.now()}-${adImageFile.name}`
        const { success, url } = await uploadFile(adImageFile, fileName)

        if (success && url) {
          imageUrl = url
        } else {
          throw new Error("Failed to upload ad image")
        }
      }

      const adData = {
        ...newAd,
        image_url: imageUrl,
      }

      if (editingAdId) {
        // Update existing ad
        const { success } = await updateAd(editingAdId, adData)

        if (success) {
          toast({
            title: "Success",
            description: "Ad updated successfully",
          })

          // Refresh ads
          const { ads: updatedAds } = await getAds()
          setAds(updatedAds)

          // Reset form
          setNewAd({
            title: "",
            description: "",
            image_url: "",
            link_url: "",
            start_date: "",
            end_date: "",
            placement: "home",
            active: true,
          })
          setEditingAdId(null)
          setAdImageFile(null)
        } else {
          throw new Error("Failed to update ad")
        }
      } else {
        // Create new ad
        const { success } = await createAd(adData)

        if (success) {
          toast({
            title: "Success",
            description: "Ad created successfully",
          })

          // Refresh ads
          const { ads: updatedAds } = await getAds()
          setAds(updatedAds)

          // Reset form
          setNewAd({
            title: "",
            description: "",
            image_url: "",
            link_url: "",
            start_date: "",
            end_date: "",
            placement: "home",
            active: true,
          })
          setAdImageFile(null)
        } else {
          throw new Error("Failed to create ad")
        }
      }
    } catch (error) {
      console.error("Error submitting ad:", error)
      toast({
        title: "Error",
        description: "Failed to save ad. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle trailer edit
  const handleEditTrailer = (trailer: Trailer) => {
    setNewTrailer({
      title: trailer.title,
      description: trailer.description,
      video_url: trailer.video_url,
      thumbnail_url: trailer.thumbnail_url,
      genre: trailer.genre,
      release_date: trailer.release_date,
      director: trailer.director,
      cast: trailer.cast,
      duration: trailer.duration,
      featured: trailer.featured,
    })
    setEditingTrailerId(trailer.id)
    setActiveTab("trailers")
  }

  // Handle ad edit
  const handleEditAd = (ad: Ad) => {
    setNewAd({
      title: ad.title,
      description: ad.description,
      image_url: ad.image_url,
      link_url: ad.link_url,
      start_date: ad.start_date,
      end_date: ad.end_date,
      placement: ad.placement,
      active: ad.active,
    })
    setEditingAdId(ad.id)
    setActiveTab("ads")
  }

  // Handle trailer delete
  const handleDeleteTrailer = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this trailer? This action cannot be undone.")) {
      try {
        const { success } = await deleteTrailer(id)

        if (success) {
          toast({
            title: "Success",
            description: "Trailer deleted successfully",
          })

          // Remove from state
          setTrailers(trailers.filter((trailer) => trailer.id !== id))
        } else {
          throw new Error("Failed to delete trailer")
        }
      } catch (error) {
        console.error("Error deleting trailer:", error)
        toast({
          title: "Error",
          description: "Failed to delete trailer. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Handle ad delete
  const handleDeleteAd = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this ad? This action cannot be undone.")) {
      try {
        const { success } = await deleteAd(id)

        if (success) {
          toast({
            title: "Success",
            description: "Ad deleted successfully",
          })

          // Remove from state
          setAds(ads.filter((ad) => ad.id !== id))
        } else {
          throw new Error("Failed to delete ad")
        }
      } catch (error) {
        console.error("Error deleting ad:", error)
        toast({
          title: "Error",
          description: "Failed to delete ad. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Prepare chart data
  const prepareViewsChartData = () => {
    if (!trailerAnalytics.length) return null

    const sortedData = [...trailerAnalytics].sort((a, b) => b.views - a.views).slice(0, 5)

    return {
      labels: sortedData.map((item) => item.title),
      datasets: [
        {
          label: "Views",
          data: sortedData.map((item) => item.views),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }
  }

  const prepareEngagementChartData = () => {
    if (!trailerAnalytics.length) return null

    const sortedData = [...trailerAnalytics].sort((a, b) => b.engagement - a.engagement).slice(0, 5)

    return {
      labels: sortedData.map((item) => item.title),
      datasets: [
        {
          label: "Engagement Rate",
          data: sortedData.map((item) => item.engagement.toFixed(2)),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }
  }

  const prepareUserRegistrationChartData = () => {
    if (!userAnalytics?.registrationTrend) return null

    return {
      labels: userAnalytics.registrationTrend.map((item) => item.date),
      datasets: [
        {
          label: "New Users",
          data: userAnalytics.registrationTrend.map((item) => item.count),
          fill: false,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.1,
        },
      ],
    }
  }

  const viewsChartData = prepareViewsChartData()
  const engagementChartData = prepareEngagementChartData()
  const userRegistrationChartData = prepareUserRegistrationChartData()

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage trailers, ads, and view analytics for Tucheki Streaming</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-[600px] mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trailers">Trailers</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Trailers</CardTitle>
                <Film className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{trailers.length}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{userAnalytics?.totalUsers || 0}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{userAnalytics?.activeUsers || 0}</div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Trailers by Views</CardTitle>
                <CardDescription>The most viewed trailers on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : viewsChartData ? (
                  <div className="h-[300px]">
                    <Bar
                      data={viewsChartData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Registrations</CardTitle>
                <CardDescription>New user registrations over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : userRegistrationChartData ? (
                  <div className="h-[300px]">
                    <Line
                      data={userRegistrationChartData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trailers</CardTitle>
                <CardDescription>Recently added trailers</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : trailers.length > 0 ? (
                  <div className="space-y-4">
                    {trailers.slice(0, 5).map((trailer) => (
                      <div key={trailer.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            <img
                              src={trailer.thumbnail_url || "/placeholder.svg?height=48&width=48"}
                              alt={trailer.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{trailer.title}</h4>
                            <p className="text-sm text-muted-foreground">{trailer.genre}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditTrailer(trailer)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteTrailer(trailer.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No trailers available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trailers Tab */}
        <TabsContent value="trailers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingTrailerId ? "Edit Trailer" : "Add New Trailer"}</CardTitle>
              <CardDescription>
                {editingTrailerId ? "Update trailer information" : "Add a new trailer to the platform"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrailerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTrailer.title}
                      onChange={(e) => setNewTrailer({ ...newTrailer, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select
                      value={newTrailer.genre}
                      onValueChange={(value) => setNewTrailer({ ...newTrailer, genre: value })}
                      required
                    >
                      <SelectTrigger id="genre">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="drama">Drama</SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="horror">Horror</SelectItem>
                        <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                        <SelectItem value="animation">Animation</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTrailer.description}
                    onChange={(e) => setNewTrailer({ ...newTrailer, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL</Label>
                    <Input
                      id="video_url"
                      value={newTrailer.video_url}
                      onChange={(e) => setNewTrailer({ ...newTrailer, video_url: e.target.value })}
                      placeholder="YouTube or direct video URL"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                    <Input
                      id="thumbnail_url"
                      value={newTrailer.thumbnail_url}
                      onChange={(e) => setNewTrailer({ ...newTrailer, thumbnail_url: e.target.value })}
                      placeholder="Leave empty to upload a file"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail_file">Upload Thumbnail</Label>
                  <Input
                    id="thumbnail_file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setTrailerThumbnailFile(e.target.files[0])
                      }
                    }}
                  />
                  {trailerThumbnailFile && (
                    <p className="text-sm text-muted-foreground">Selected file: {trailerThumbnailFile.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="release_date">Release Date</Label>
                    <Input
                      id="release_date"
                      type="date"
                      value={newTrailer.release_date}
                      onChange={(e) => setNewTrailer({ ...newTrailer, release_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="director">Director</Label>
                    <Input
                      id="director"
                      value={newTrailer.director}
                      onChange={(e) => setNewTrailer({ ...newTrailer, director: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newTrailer.duration}
                      onChange={(e) => setNewTrailer({ ...newTrailer, duration: Number.parseInt(e.target.value) || 0 })}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cast">Cast</Label>
                  <Input
                    id="cast"
                    value={newTrailer.cast}
                    onChange={(e) => setNewTrailer({ ...newTrailer, cast: e.target.value })}
                    placeholder="Comma separated list of actors"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={newTrailer.featured}
                    onCheckedChange={(checked) => setNewTrailer({ ...newTrailer, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Trailer</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  {editingTrailerId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNewTrailer({
                          title: "",
                          description: "",
                          video_url: "",
                          thumbnail_url: "",
                          genre: "",
                          release_date: "",
                          director: "",
                          cast: "",
                          duration: 0,
                          featured: false,
                        })
                        setEditingTrailerId(null)
                        setTrailerThumbnailFile(null)
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit">{editingTrailerId ? "Update Trailer" : "Add Trailer"}</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Trailers</CardTitle>
              <CardDescription>View and manage all trailers</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : trailers.length > 0 ? (
                <div className="space-y-4">
                  {trailers.map((trailer) => (
                    <div key={trailer.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-9 rounded-md overflow-hidden">
                          <img
                            src={trailer.thumbnail_url || "/placeholder.svg?height=36&width=64"}
                            alt={trailer.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{trailer.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {trailer.genre}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(trailer.release_date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {Math.floor(trailer.duration / 60)}:{(trailer.duration % 60).toString().padStart(2, "0")}
                            </span>
                            {trailer.featured && (
                              <span className="flex items-center text-yellow-500">
                                <Award className="h-3 w-3 mr-1" />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTrailer(trailer)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteTrailer(trailer.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No trailers available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ads Tab */}
        <TabsContent value="ads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingAdId ? "Edit Ad" : "Add New Ad"}</CardTitle>
              <CardDescription>
                {editingAdId ? "Update ad information" : "Add a new advertisement to the platform"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad_title">Title</Label>
                    <Input
                      id="ad_title"
                      value={newAd.title}
                      onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ad_placement">Placement</Label>
                    <Select
                      value={newAd.placement}
                      onValueChange={(value) => setNewAd({ ...newAd, placement: value })}
                      required
                    >
                      <SelectTrigger id="ad_placement">
                        <SelectValue placeholder="Select placement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Page</SelectItem>
                        <SelectItem value="trailers">Trailers Page</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="player">Video Player</SelectItem>
                        <SelectItem value="search">Search Results</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad_description">Description</Label>
                  <Textarea
                    id="ad_description"
                    value={newAd.description}
                    onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad_image_url">Image URL</Label>
                    <Input
                      id="ad_image_url"
                      value={newAd.image_url}
                      onChange={(e) => setNewAd({ ...newAd, image_url: e.target.value })}
                      placeholder="Leave empty to upload a file"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ad_link_url">Link URL</Label>
                    <Input
                      id="ad_link_url"
                      value={newAd.link_url}
                      onChange={(e) => setNewAd({ ...newAd, link_url: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad_image_file">Upload Image</Label>
                  <Input
                    id="ad_image_file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAdImageFile(e.target.files[0])
                      }
                    }}
                  />
                  {adImageFile && <p className="text-sm text-muted-foreground">Selected file: {adImageFile.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad_start_date">Start Date</Label>
                    <Input
                      id="ad_start_date"
                      type="date"
                      value={newAd.start_date}
                      onChange={(e) => setNewAd({ ...newAd, start_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ad_end_date">End Date</Label>
                    <Input
                      id="ad_end_date"
                      type="date"
                      value={newAd.end_date}
                      onChange={(e) => setNewAd({ ...newAd, end_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ad_active"
                    checked={newAd.active}
                    onCheckedChange={(checked) => setNewAd({ ...newAd, active: checked })}
                  />
                  <Label htmlFor="ad_active">Active</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  {editingAdId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNewAd({
                          title: "",
                          description: "",
                          image_url: "",
                          link_url: "",
                          start_date: "",
                          end_date: "",
                          placement: "home",
                          active: true,
                        })
                        setEditingAdId(null)
                        setAdImageFile(null)
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit">{editingAdId ? "Update Ad" : "Add Ad"}</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Ads</CardTitle>
              <CardDescription>View and manage all advertisements</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : ads.length > 0 ? (
                <div className="space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-9 rounded-md overflow-hidden">
                          <img
                            src={ad.image_url || "/placeholder.svg?height=36&width=64"}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{ad.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{ad.placement}</span>
                            <span>
                              {new Date(ad.start_date).toLocaleDateString()} -{" "}
                              {new Date(ad.end_date).toLocaleDateString()}
                            </span>
                            <span className={ad.active ? "text-green-500" : "text-red-500"}>
                              {ad.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditAd(ad)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteAd(ad.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No ads available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Trailers by Views</CardTitle>
                <CardDescription>The most viewed trailers on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : viewsChartData ? (
                  <div className="h-[300px]">
                    <Bar
                      data={viewsChartData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Trailers by Engagement</CardTitle>
                <CardDescription>Trailers with highest engagement rate (likes + comments / views)</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : engagementChartData ? (
                  <div className="h-[300px]">
                    <Bar
                      data={engagementChartData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Registrations</CardTitle>
              <CardDescription>New user registrations over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : userRegistrationChartData ? (
                <div className="h-[300px]">
                  <Line
                    data={userRegistrationChartData}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No data available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trailer Performance</CardTitle>
              <CardDescription>Detailed performance metrics for all trailers</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : trailerAnalytics.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center">
                            <Eye className="h-4 w-4 mr-1" />
                            Views
                          </div>
                        </th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Likes
                          </div>
                        </th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Comments
                          </div>
                        </th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center">
                            <BarChart className="h-4 w-4 mr-1" />
                            Engagement
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trailerAnalytics.map((trailer) => (
                        <tr key={trailer.id} className="border-b">
                          <td className="py-3 px-4">{trailer.title}</td>
                          <td className="text-center py-3 px-4">{trailer.views}</td>
                          <td className="text-center py-3 px-4">{trailer.likes}</td>
                          <td className="text-center py-3 px-4">{trailer.comments}</td>
                          <td className="text-center py-3 px-4">{trailer.engagement.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
