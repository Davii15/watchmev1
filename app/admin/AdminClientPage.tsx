"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Film,
  Upload,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  DollarSign,
  LayoutDashboard,
  FileVideo,
  UserCircle,
  Bell,
  Gift,
  Eye,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import AdManager from "@/components/ad-manager"
import { Textarea } from "@/components/ui/textarea"
import { SelectItem, SelectContent, SelectValue, SelectTrigger, Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  checkAdminAccess,
  getTrailersForAdmin,
  getUsersForAdmin,
  deleteTrailer,
  updateUserRole,
  getSettings,
  updateSettings,
  uploadTrailer,
} from "./actions"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminClientPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [trailers, setTrailers] = useState([])
  const [users, setUsers] = useState([])
  const [settings, setSettings] = useState<any>({})
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAccess = async () => {
      setLoading(true)
      try {
        const { isAdmin } = await checkAdminAccess()
        setIsAdmin(isAdmin)

        if (!isAdmin) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin area.",
            variant: "destructive",
          })
          router.push("/home")
          return
        }

        // Load initial data based on active tab
        if (activeTab === "trailers") {
          fetchTrailers()
        } else if (activeTab === "users") {
          fetchUsers()
        } else if (activeTab === "settings") {
          fetchSettings()
        }
      } catch (error) {
        console.error("Error checking admin access:", error)
        toast({
          title: "Error",
          description: "Failed to verify admin access. Please try again.",
          variant: "destructive",
        })
        router.push("/home")
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [router, toast])

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === "trailers") {
        fetchTrailers()
      } else if (activeTab === "users") {
        fetchUsers()
      } else if (activeTab === "settings") {
        fetchSettings()
      }
    }
  }, [activeTab, isAdmin])

  const fetchTrailers = async () => {
    setLoading(true)
    try {
      const result = await getTrailersForAdmin()
      if (result.success) {
        setTrailers(result.trailers)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch trailers. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching trailers:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const result = await getUsersForAdmin()
      if (result.success) {
        setUsers(result.users)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch users. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const result = await getSettings()
      if (result.success) {
        setSettings(result.settings)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch settings. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTrailer = async (trailerId: string) => {
    if (confirm("Are you sure you want to delete this trailer? This action cannot be undone.")) {
      try {
        const result = await deleteTrailer(trailerId)
        if (result.success) {
          toast({
            title: "Success",
            description: "Trailer deleted successfully.",
          })
          fetchTrailers()
        } else {
          toast({
            title: "Error",
            description: "Failed to delete trailer. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error deleting trailer:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const result = await updateUserRole(userId, newRole)
      if (result.success) {
        toast({
          title: "Success",
          description: "User role updated successfully.",
        })
        fetchUsers()
      } else {
        toast({
          title: "Error",
          description: "Failed to update user role. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating user role:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveSettings = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const result = await updateSettings(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: "Settings updated successfully.",
        })
        fetchSettings()
      } else {
        toast({
          title: "Error",
          description: "Failed to update settings. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating settings:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUploadTrailer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const result = await uploadTrailer(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: "Trailer uploaded successfully.",
        })
        // Reset form
        event.currentTarget.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to upload trailer. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading trailer:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter trailers based on search query
  const filteredTrailers = trailers.filter(
    (trailer: any) =>
      trailer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trailer.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user: any) =>
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading && !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1A0F07]">
        <div className="text-center">
          <Skeleton className="h-12 w-12 rounded-full bg-amber-900/30 mx-auto mb-4" />
          <Skeleton className="h-6 w-48 bg-amber-900/30 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 bg-amber-900/30 mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#1A0F07]">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold text-amber-400">Tucheki Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "trailers"}
                  onClick={() => setActiveTab("trailers")}
                  tooltip="Manage Trailers"
                >
                  <FileVideo className="h-5 w-5" />
                  <span>Trailers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "upload"}
                  onClick={() => setActiveTab("upload")}
                  tooltip="Upload Trailer"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                  tooltip="Manage Users"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "ads"}
                  onClick={() => setActiveTab("ads")}
                  tooltip="Ad Manager"
                >
                  <DollarSign className="h-5 w-5" />
                  <span>Ads</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "notifications"}
                  onClick={() => setActiveTab("notifications")}
                  tooltip="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "prizes"}
                  onClick={() => setActiveTab("prizes")}
                  tooltip="Manage Prizes"
                >
                  <Gift className="h-5 w-5" />
                  <span>Prizes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                  tooltip="Settings"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/home")} tooltip="Logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-[#2A1A10] text-white">
          <div className="p-6 overflow-auto h-full">
            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "ads" && <AdManager />}

            {activeTab === "trailers" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-amber-400">Manage Trailers</h1>
                  <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setActiveTab("upload")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Trailer
                  </Button>
                </div>

                <div className="mb-6 flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 h-5 w-5" />
                    <Input
                      placeholder="Search trailers..."
                      className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="rounded-md border border-amber-900/50 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-amber-950/50">
                      <TableRow className="hover:bg-amber-900/30 border-amber-900/50">
                        <TableHead className="text-amber-400">Title</TableHead>
                        <TableHead className="text-amber-400">Category</TableHead>
                        <TableHead className="text-amber-400">Upload Date</TableHead>
                        <TableHead className="text-amber-400">Views</TableHead>
                        <TableHead className="text-amber-400">Status</TableHead>
                        <TableHead className="text-amber-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <TableRow key={i} className="hover:bg-amber-900/30 border-amber-900/50">
                              <TableCell>
                                <Skeleton className="h-4 w-32 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-20 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-24 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-16 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-20 bg-amber-900/30 rounded-full" />
                              </TableCell>
                              <TableCell className="text-right">
                                <Skeleton className="h-8 w-8 bg-amber-900/30 rounded-md ml-auto" />
                              </TableCell>
                            </TableRow>
                          ))
                      ) : filteredTrailers.length > 0 ? (
                        filteredTrailers.map((trailer: any) => (
                          <TableRow key={trailer.id} className="hover:bg-amber-900/30 border-amber-900/50">
                            <TableCell className="font-medium text-amber-100">{trailer.title}</TableCell>
                            <TableCell>{trailer.category}</TableCell>
                            <TableCell>{new Date(trailer.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{trailer.views.toLocaleString()}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                                Published
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0 text-amber-400 hover:bg-amber-900/30">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-amber-950 border-amber-900/50">
                                  <DropdownMenuItem
                                    className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer"
                                    onClick={() => router.push(`/admin/edit-trailer/${trailer.id}`)}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer"
                                    onClick={() => router.push(`/trailers/${trailer.id}`)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-400 hover:bg-red-900/30 hover:text-red-300 cursor-pointer"
                                    onClick={() => handleDeleteTrailer(trailer.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-amber-400/70">
                            <div className="flex flex-col items-center">
                              <AlertTriangle className="h-8 w-8 mb-2 text-amber-500/70" />
                              {searchQuery ? (
                                <p>No trailers found matching "{searchQuery}"</p>
                              ) : (
                                <p>No trailers found. Add your first trailer!</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div>
                <h1 className="text-2xl font-bold text-amber-400 mb-6">Upload New Trailer</h1>
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <form className="space-y-6" onSubmit={handleUploadTrailer}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-amber-300">
                          Trailer Title
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter trailer title"
                          className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-amber-300">
                          Category
                        </Label>
                        <Select name="category" required>
                          <SelectTrigger className="bg-amber-950/50 border-amber-800/50 text-amber-100">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-amber-950 border-amber-900/50">
                            <SelectItem value="action">Action</SelectItem>
                            <SelectItem value="drama">Drama</SelectItem>
                            <SelectItem value="comedy">Comedy</SelectItem>
                            <SelectItem value="romance">Romance</SelectItem>
                            <SelectItem value="thriller">Thriller</SelectItem>
                            <SelectItem value="documentary">Documentary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-amber-300">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter trailer description"
                        className="min-h-32 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="director" className="text-amber-300">
                          Director
                        </Label>
                        <Input
                          id="director"
                          name="director"
                          placeholder="Enter director name"
                          className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cast" className="text-amber-300">
                          Cast (comma separated)
                        </Label>
                        <Input
                          id="cast"
                          name="cast"
                          placeholder="Enter cast names"
                          className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-amber-300">
                          Duration
                        </Label>
                        <Input
                          id="duration"
                          name="duration"
                          placeholder="e.g. 2:30"
                          className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="releaseDate" className="text-amber-300">
                          Release Date
                        </Label>
                        <Input
                          id="releaseDate"
                          name="releaseDate"
                          type="date"
                          className="bg-amber-950/50 border-amber-800/50 text-amber-100"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-amber-300">Upload Trailer</Label>
                      <div className="border-2 border-dashed border-amber-800/50 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-amber-500/70" />
                        <p className="text-amber-300 mb-2">Drag and drop your video file here</p>
                        <p className="text-amber-400/70 text-sm mb-4">MP4, MOV, or WebM formats (max 500MB)</p>
                        <Input
                          id="video"
                          name="video"
                          type="file"
                          accept="video/mp4,video/mov,video/webm"
                          className="hidden"
                          required
                        />
                        <Button
                          type="button"
                          className="bg-amber-600 hover:bg-amber-700"
                          onClick={() => document.getElementById("video")?.click()}
                        >
                          Select File
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-amber-300">Thumbnail Image</Label>
                      <div className="border-2 border-dashed border-amber-800/50 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-3 text-amber-500/70" />
                        <p className="text-amber-300 mb-2">Upload a thumbnail image</p>
                        <p className="text-amber-400/70 text-sm mb-4">JPG, PNG, or WebP (16:9 ratio recommended)</p>
                        <Input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                          onClick={() => document.getElementById("thumbnail")?.click()}
                        >
                          Select Image
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                        onClick={() => setActiveTab("trailers")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        Publish Trailer
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-amber-400">Manage Users</h1>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </div>

                <div className="mb-6 flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 h-5 w-5" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="rounded-md border border-amber-900/50 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-amber-950/50">
                      <TableRow className="hover:bg-amber-900/30 border-amber-900/50">
                        <TableHead className="text-amber-400">Name</TableHead>
                        <TableHead className="text-amber-400">Email</TableHead>
                        <TableHead className="text-amber-400">Join Date</TableHead>
                        <TableHead className="text-amber-400">Role</TableHead>
                        <TableHead className="text-amber-400">Status</TableHead>
                        <TableHead className="text-amber-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <TableRow key={i} className="hover:bg-amber-900/30 border-amber-900/50">
                              <TableCell>
                                <Skeleton className="h-4 w-32 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-40 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-24 bg-amber-900/30" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-20 bg-amber-900/30 rounded-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-20 bg-amber-900/30 rounded-full" />
                              </TableCell>
                              <TableCell className="text-right">
                                <Skeleton className="h-8 w-8 bg-amber-900/30 rounded-md ml-auto" />
                              </TableCell>
                            </TableRow>
                          ))
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user: any) => (
                          <TableRow key={user.id} className="hover:bg-amber-900/30 border-amber-900/50">
                            <TableCell className="font-medium text-amber-100">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === "admin"
                                    ? "bg-purple-900/30 text-purple-400"
                                    : user.role === "premium"
                                      ? "bg-amber-900/30 text-amber-400"
                                      : "bg-blue-900/30 text-blue-400"
                                }`}
                              >
                                {user.role || "User"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === "suspended"
                                    ? "bg-red-900/30 text-red-400"
                                    : "bg-green-900/30 text-green-400"
                                }`}
                              >
                                {user.status || "Active"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0 text-amber-400 hover:bg-amber-900/30">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-amber-950 border-amber-900/50">
                                  <DropdownMenuItem className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer">
                                    <Users className="h-4 w-4 mr-2" />
                                    Change Role
                                    <DropdownMenu>
                                      <DropdownMenuTrigger className="ml-2">
                                        <MoreVertical className="h-3 w-3" />
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent className="bg-amber-950 border-amber-900/50">
                                        <DropdownMenuItem
                                          className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer"
                                          onClick={() => handleUpdateUserRole(user.id, "user")}
                                        >
                                          User
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer"
                                          onClick={() => handleUpdateUserRole(user.id, "premium")}
                                        >
                                          Premium
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-amber-300 hover:bg-amber-900/50 hover:text-amber-200 cursor-pointer"
                                          onClick={() => handleUpdateUserRole(user.id, "admin")}
                                        >
                                          Admin
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-400 hover:bg-red-900/30 hover:text-red-300 cursor-pointer">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-amber-400/70">
                            <div className="flex flex-col items-center">
                              <AlertTriangle className="h-8 w-8 mb-2 text-amber-500/70" />
                              {searchQuery ? <p>No users found matching "{searchQuery}"</p> : <p>No users found.</p>}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold text-amber-400 mb-6">Platform Settings</h1>
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
                  <form className="space-y-8" onSubmit={handleSaveSettings}>
                    <div>
                      <h2 className="text-xl font-semibold text-amber-300 mb-4">General Settings</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="platformName" className="text-amber-300">
                              Platform Name
                            </Label>
                            <Input
                              id="platformName"
                              name="platformName"
                              defaultValue={settings.platform_name || "Tucheki"}
                              className="bg-amber-950/50 border-amber-800/50 text-amber-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactEmail" className="text-amber-300">
                              Contact Email
                            </Label>
                            <Input
                              id="contactEmail"
                              name="contactEmail"
                              type="email"
                              defaultValue={settings.contact_email || "info@tucheki.com"}
                              className="bg-amber-950/50 border-amber-800/50 text-amber-100"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="platformDescription" className="text-amber-300">
                            Platform Description
                          </Label>
                          <Textarea
                            id="platformDescription"
                            name="platformDescription"
                            defaultValue={
                              settings.platform_description ||
                              "Discover Kenya's cinematic treasures through our curated collection of movie trailers and exclusive content."
                            }
                            className="min-h-24 bg-amber-950/50 border-amber-800/50 text-amber-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-amber-300 mb-4">Content Settings</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-amber-200 font-medium">Auto-approve Uploads</h3>
                            <p className="text-amber-400/70 text-sm">Automatically approve new trailer uploads</p>
                          </div>
                          <Switch
                            id="autoApproveUploads"
                            name="autoApproveUploads"
                            defaultChecked={settings.auto_approve_uploads}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-amber-200 font-medium">Content Moderation</h3>
                            <p className="text-amber-400/70 text-sm">Enable AI-powered content moderation</p>
                          </div>
                          <Switch
                            id="contentModeration"
                            name="contentModeration"
                            defaultChecked={settings.content_moderation !== false}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-amber-200 font-medium">Allow User Comments</h3>
                            <p className="text-amber-400/70 text-sm">Enable user comments on trailers</p>
                          </div>
                          <Switch
                            id="allowUserComments"
                            name="allowUserComments"
                            defaultChecked={settings.allow_user_comments !== false}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-amber-300 mb-4">Advertising Settings</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-amber-200 font-medium">Enable Advertisements</h3>
                            <p className="text-amber-400/70 text-sm">Show advertisements on the platform</p>
                          </div>
                          <Switch id="enableAds" name="enableAds" defaultChecked={settings.enable_ads !== false} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-amber-200 font-medium">Pre-roll Ads</h3>
                            <p className="text-amber-400/70 text-sm">Show ads before trailer playback</p>
                          </div>
                          <Switch id="prerollAds" name="prerollAds" defaultChecked={settings.preroll_ads !== false} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="adFrequency" className="text-amber-300">
                            Ad Frequency
                          </Label>
                          <Select name="adFrequency" defaultValue={settings.ad_frequency || "medium"}>
                            <SelectTrigger className="bg-amber-950/50 border-amber-800/50 text-amber-100">
                              <SelectValue placeholder="Select ad frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-amber-950 border-amber-900/50">
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
