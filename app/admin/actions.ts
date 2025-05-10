"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// Types
type TrailerData = {
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
}

type AdData = {
  title: string
  description: string
  image_url: string
  link_url: string
  start_date: string
  end_date: string
  placement: string
  active: boolean
}

// Admin Authentication
export async function checkAdminStatus() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { isAdmin: false }
  }

  // Get user data to check admin role
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single()

  if (userError || !userData) {
    return { isAdmin: false }
  }

  return { isAdmin: userData.role === "admin" }
}

// Trailer Management
export async function getTrailers() {
  const supabase = createClient()

  const { data, error } = await supabase.from("trailers").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching trailers:", error)
    return { trailers: [], error: error.message }
  }

  return { trailers: data || [], error: null }
}

export async function getTrailerById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("trailers").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching trailer with ID ${id}:`, error)
    return { trailer: null, error: error.message }
  }

  return { trailer: data, error: null }
}

export async function createTrailer(trailerData: TrailerData) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  const { data, error } = await supabase.from("trailers").insert([trailerData]).select()

  if (error) {
    console.error("Error creating trailer:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/trailers")
  revalidatePath("/")

  return { success: true, data }
}

export async function updateTrailer(id: string, trailerData: Partial<TrailerData>) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  const { data, error } = await supabase.from("trailers").update(trailerData).eq("id", id).select()

  if (error) {
    console.error(`Error updating trailer with ID ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath(`/trailers/${id}`)
  revalidatePath("/trailers")
  revalidatePath("/")

  return { success: true, data }
}

export async function deleteTrailer(id: string) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  // First delete related records (comments, likes, views)
  await supabase.from("comments").delete().eq("trailer_id", id)
  await supabase.from("likes").delete().eq("trailer_id", id)
  await supabase.from("views").delete().eq("trailer_id", id)

  // Then delete the trailer
  const { error } = await supabase.from("trailers").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting trailer with ID ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/trailers")
  revalidatePath("/")

  return { success: true }
}

// Ad Management
export async function getAds() {
  const supabase = createClient()

  const { data, error } = await supabase.from("ads").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching ads:", error)
    return { ads: [], error: error.message }
  }

  return { ads: data || [], error: null }
}

export async function getAdById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("ads").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching ad with ID ${id}:`, error)
    return { ad: null, error: error.message }
  }

  return { ad: data, error: null }
}

export async function createAd(adData: AdData) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  const { data, error } = await supabase.from("ads").insert([adData]).select()

  if (error) {
    console.error("Error creating ad:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")

  return { success: true, data }
}

export async function updateAd(id: string, adData: Partial<AdData>) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  const { data, error } = await supabase.from("ads").update(adData).eq("id", id).select()

  if (error) {
    console.error(`Error updating ad with ID ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")

  return { success: true, data }
}

export async function deleteAd(id: string) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  const { error } = await supabase.from("ads").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting ad with ID ${id}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/")

  return { success: true }
}

// Analytics
export async function getTrailerAnalytics() {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  // Get view counts for each trailer
  const { data: viewData, error: viewError } = await supabase
    .from("views")
    .select("trailer_id, count")
    .order("count", { ascending: false })

  if (viewError) {
    console.error("Error fetching view analytics:", viewError)
    return { success: false, error: viewError.message }
  }

  // Get like counts for each trailer
  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .select("trailer_id, count(*)")
    .group("trailer_id")

  if (likeError) {
    console.error("Error fetching like analytics:", likeError)
    return { success: false, error: likeError.message }
  }

  // Get comment counts for each trailer
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .select("trailer_id, count(*)")
    .group("trailer_id")

  if (commentError) {
    console.error("Error fetching comment analytics:", commentError)
    return { success: false, error: commentError.message }
  }

  // Get trailer details
  const { data: trailerData, error: trailerError } = await supabase.from("trailers").select("id, title")

  if (trailerError) {
    console.error("Error fetching trailer details:", trailerError)
    return { success: false, error: trailerError.message }
  }

  // Combine the data
  const analytics =
    trailerData?.map((trailer) => {
      const views = viewData?.find((v) => v.trailer_id === trailer.id)?.count || 0
      const likes = likeData?.find((l) => l.trailer_id === trailer.id)?.count || 0
      const comments = commentData?.find((c) => c.trailer_id === trailer.id)?.count || 0

      return {
        id: trailer.id,
        title: trailer.title,
        views,
        likes,
        comments,
        engagement: (Number(likes) + Number(comments)) / (Number(views) || 1),
      }
    }) || []

  return { success: true, analytics }
}

export async function getUserAnalytics() {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  // Get total user count
  const { count: totalUsers, error: userCountError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })

  if (userCountError) {
    console.error("Error fetching user count:", userCountError)
    return { success: false, error: userCountError.message }
  }

  // Get active users (users who have viewed content in the last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: activeUserData, error: activeUserError } = await supabase
    .from("views")
    .select("user_id")
    .gt("created_at", sevenDaysAgo.toISOString())
    .order("user_id")

  if (activeUserError) {
    console.error("Error fetching active users:", activeUserError)
    return { success: false, error: activeUserError.message }
  }

  // Count unique active users
  const activeUsers = new Set(activeUserData?.map((view) => view.user_id)).size

  // Get user registration over time (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: registrationData, error: registrationError } = await supabase
    .from("profiles")
    .select("created_at")
    .gt("created_at", thirtyDaysAgo.toISOString())
    .order("created_at")

  if (registrationError) {
    console.error("Error fetching user registrations:", registrationError)
    return { success: false, error: registrationError.message }
  }

  // Group registrations by day
  const registrationsByDay: Record<string, number> = {}

  registrationData?.forEach((user) => {
    const date = new Date(user.created_at).toISOString().split("T")[0]
    registrationsByDay[date] = (registrationsByDay[date] || 0) + 1
  })

  // Fill in missing days with zero
  const registrationTrend = []
  const currentDate = new Date(thirtyDaysAgo)
  const endDate = new Date()

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0]
    registrationTrend.push({
      date: dateString,
      count: registrationsByDay[dateString] || 0,
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return {
    success: true,
    analytics: {
      totalUsers: totalUsers || 0,
      activeUsers,
      registrationTrend,
    },
  }
}

// File Upload
export async function uploadFile(file: File, path: string) {
  const supabase = createClient()

  // Check admin status
  const { isAdmin } = await checkAdminStatus()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized: Admin access required" }
  }

  // Convert File to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()
  const fileBuffer = new Uint8Array(arrayBuffer)

  const { data, error } = await supabase.storage.from("tucheki").upload(path, fileBuffer, {
    contentType: file.type,
    upsert: true,
  })

  if (error) {
    console.error("Error uploading file:", error)
    return { success: false, error: error.message }
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("tucheki").getPublicUrl(data.path)

  return { success: true, url: publicUrl }
}
