"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash2, Calendar } from "lucide-react"
import { getAds, createAd, updateAd, deleteAd, uploadFile } from "@/app/admin/actions"

// Types
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

export default function AdManager() {
  // State for data
  const [ads, setAds] = useState<Ad[]>([])

  // State for loading
  const [isLoading, setIsLoading] = useState(true)

  // State for form
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

  const [editingAdId, setEditingAdId] = useState<string | null>(null)

  // State for file upload
  const [adImageFile, setAdImageFile] = useState<File | null>(null)

  // Fetch ads on component mount
  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true)

      try {
        const { ads: adData } = await getAds()
        setAds(adData)
      } catch (error) {
        console.error("Error fetching ads:", error)
        toast({
          title: "Error",
          description: "Failed to load ads. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAds()
  }, [])

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

  return (
    <div className="space-y-6">
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
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(ad.start_date).toLocaleDateString()} - {new Date(ad.end_date).toLocaleDateString()}
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
    </div>
  )
}
