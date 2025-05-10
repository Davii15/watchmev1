"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import nodemailer from "nodemailer"
import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface SubscriptionData {
  email: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // In a real application, you would use environment variables for these settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "your-email@gmail.com", // This would be an environment variable in production
        pass: "your-password", // This would be an environment variable in production
      },
    })

    // Email content
    const mailOptions = {
      from: `"Tucheki Contact Form" <your-email@gmail.com>`,
      to: "waikwa1@yahoo.com", // Recipient email
      subject: `Tucheki Contact: ${data.subject}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        
        Message:
        ${data.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #b45309;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="background-color: #f9f5eb; padding: 15px; border-radius: 5px;">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    }

    // In a real application, you would actually send the email
    // For now, we'll just simulate success
    console.log("Would send email with the following data:", mailOptions)

    // Simulate a delay to mimic sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}

export async function subscribeToNewsletter(data: SubscriptionData) {
  try {
    // In a real application, you would use environment variables for these settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "your-email@gmail.com", // This would be an environment variable in production
        pass: "your-password", // This would be an environment variable in production
      },
    })

    // Email content
    const mailOptions = {
      from: `"Tucheki Newsletter" <your-email@gmail.com>`,
      to: "waikwa1@yahoo.com", // Recipient email
      subject: `New Newsletter Subscription`,
      text: `
        New subscriber: ${data.email}
        
        This user has subscribed to the Tucheki newsletter.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #b45309;">New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p>This user has subscribed to the Tucheki newsletter.</p>
        </div>
      `,
    }

    // In a real application, you would actually send the email
    // For now, we'll just simulate success
    console.log("Would send subscription notification with the following data:", mailOptions)

    // Simulate a delay to mimic sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error processing subscription:", error)
    throw new Error("Failed to process subscription")
  }
}

// New social interaction functions

// Get or create a session ID for tracking views
export async function getSessionId() {
  const cookieStore = cookies()
  let sessionId = cookieStore.get("tucheki_session_id")?.value

  if (!sessionId) {
    sessionId = uuidv4()
    cookieStore.set("tucheki_session_id", sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })
  }

  return sessionId
}

// Get trailer details
export async function getTrailerDetails(id: string) {
  try {
    const supabase = createClient()

    // Fetch trailer data
    const { data: trailer, error } = await supabase.from("trailers").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching trailer details:", error)
      return { trailer: null, success: false }
    }

    // Track view if trailer exists
    if (trailer) {
      await trackTrailerView(id)
    }

    return { trailer, success: true }
  } catch (error) {
    console.error("Error in getTrailerDetails:", error)
    return { trailer: null, success: false }
  }
}

// Get related trailers
export async function getRelatedTrailers(currentId: string, category: string) {
  try {
    const supabase = createClient()

    // Fetch related trailers with same category but different ID
    const { data: trailers, error } = await supabase
      .from("trailers")
      .select("id, title, thumbnail, views, duration, category")
      .eq("category", category)
      .neq("id", currentId)
      .limit(6)

    if (error) {
      console.error("Error fetching related trailers:", error)
      return { trailers: [], success: false }
    }

    return { trailers, success: true }
  } catch (error) {
    console.error("Error in getRelatedTrailers:", error)
    return { trailers: [], success: false }
  }
}

// Track trailer view
async function trackTrailerView(trailerId: string) {
  try {
    const supabase = createClient()
    const cookieStore = cookies()

    // Get session ID from cookie or create new one
    let sessionId = cookieStore.get("tucheki_session_id")?.value

    if (!sessionId) {
      sessionId = uuidv4()
      cookieStore.set("tucheki_session_id", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    }

    // Get user ID if logged in
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const userId = session?.user?.id

    // Check if this session has already viewed this trailer recently
    const { data: existingView } = await supabase
      .from("views")
      .select("id")
      .eq("trailer_id", trailerId)
      .eq("session_id", sessionId)
      .gte("created_at", new Date(Date.now() - 3600000).toISOString()) // Within last hour
      .maybeSingle()

    // If no recent view, insert new view record
    if (!existingView) {
      await supabase.from("views").insert({
        trailer_id: trailerId,
        user_id: userId || null,
        session_id: sessionId,
      })

      // Increment view count on trailer
      await supabase.rpc("increment_trailer_views", { trailer_id: trailerId })
    }

    return { success: true }
  } catch (error) {
    console.error("Error tracking view:", error)
    return { success: false }
  }
}

// Like/unlike trailer
export async function toggleTrailerLike(trailerId: string) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return { success: false, error: "Authentication required", liked: false }
    }

    const userId = session.user.id

    // Check if user already liked this trailer
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("trailer_id", trailerId)
      .eq("user_id", userId)
      .maybeSingle()

    if (existingLike) {
      // Unlike: Remove like record
      await supabase.from("likes").delete().eq("id", existingLike.id)

      // Decrement like count
      await supabase.rpc("decrement_trailer_likes", { trailer_id: trailerId })

      return { success: true, liked: false }
    } else {
      // Like: Add like record
      await supabase.from("likes").insert({
        trailer_id: trailerId,
        user_id: userId,
      })

      // Increment like count
      await supabase.rpc("increment_trailer_likes", { trailer_id: trailerId })

      return { success: true, liked: true }
    }
  } catch (error) {
    console.error("Error toggling like:", error)
    return { success: false, error: "Failed to process like", liked: false }
  }
}

// Check if user has liked trailer
export async function checkTrailerLike(trailerId: string) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return { liked: false, success: true }
    }

    const userId = session.user.id

    // Check if like record exists
    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("trailer_id", trailerId)
      .eq("user_id", userId)
      .maybeSingle()

    if (error) {
      throw error
    }

    return { liked: !!data, success: true }
  } catch (error) {
    console.error("Error checking like status:", error)
    return { liked: false, success: false }
  }
}

// Add comment to trailer
export async function addComment(trailerId: string, content: string) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return { success: false, error: "Authentication required" }
    }

    const userId = session.user.id

    // Insert comment
    const { data, error } = await supabase
      .from("comments")
      .insert({
        trailer_id: trailerId,
        user_id: userId,
        content,
      })
      .select()

    if (error) {
      throw error
    }

    // Increment comment count
    await supabase.rpc("increment_trailer_comments", { trailer_id: trailerId })

    // Revalidate page to show new comment
    revalidatePath(`/trailers/${trailerId}`)

    return { success: true, comment: data[0] }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { success: false, error: "Failed to add comment" }
  }
}

// Get comments for trailer
export async function getComments(trailerId: string) {
  try {
    const supabase = createClient()

    // Fetch comments with user info
    const { data, error } = await supabase
      .from("comments")
      .select(`
        *,
        user:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .eq("trailer_id", trailerId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { comments: data, success: true }
  } catch (error) {
    console.error("Error fetching comments:", error)
    return { comments: [], success: false }
  }
}

// Share trailer
export async function shareTrailer(trailerId: string, platform: string) {
  try {
    const supabase = createClient()

    // Get user ID if logged in
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const userId = session?.user?.id

    // Record share
    await supabase.from("shares").insert({
      trailer_id: trailerId,
      user_id: userId || null,
      platform,
    })

    return { success: true }
  } catch (error) {
    console.error("Error recording share:", error)
    return { success: false }
  }
}

// Get featured trailers for homepage
export async function getFeaturedTrailers() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("trailers")
      .select("id, title, description, category, thumbnail, duration, views, likes, trending")
      .eq("featured", true)
      .limit(6)

    if (error) {
      throw error
    }

    return { trailers: data, success: true }
  } catch (error) {
    console.error("Error fetching featured trailers:", error)
    return { trailers: [], success: false }
  }
}

// Get new releases
export async function getNewReleases() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("trailers")
      .select("id, title, category, thumbnail, duration, release_date")
      .order("release_date", { ascending: false })
      .limit(6)

    if (error) {
      throw error
    }

    return { trailers: data, success: true }
  } catch (error) {
    console.error("Error fetching new releases:", error)
    return { trailers: [], success: false }
  }
}

// Get trending categories
export async function getTrendingCategories() {
  try {
    const supabase = createClient()

    // Get distinct categories with trailer counts
    const { data, error } = await supabase.from("trailers").select("category").order("category")

    if (error) {
      throw error
    }

    // Count trailers per category and get unique categories
    const categories = Array.from(new Set(data.map((item) => item.category)))
      .map((category) => {
        const count = data.filter((item) => item.category === category).length
        return { category, count }
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    return { categories, success: true }
  } catch (error) {
    console.error("Error fetching trending categories:", error)
    return { categories: [], success: false }
  }
}

// Get continue watching for user
export async function getContinueWatching() {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Get session ID from cookie
    const cookieStore = cookies()
    const sessionId = cookieStore.get("tucheki_session_id")?.value

    if (!session?.user && !sessionId) {
      return { trailers: [], success: true }
    }

    // Query based on user ID if logged in, otherwise session ID
    let query = supabase
      .from("views")
      .select(`
        trailer_id,
        created_at,
        trailers:trailer_id (
          id,
          title,
          thumbnail,
          duration,
          category
        )
      `)
      .order("created_at", { ascending: false })
      .limit(6)

    if (session?.user) {
      query = query.eq("user_id", session.user.id)
    } else if (sessionId) {
      query = query.eq("session_id", sessionId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Format data and remove duplicates (keep most recent view of each trailer)
    const uniqueTrailers = data.reduce((acc: any[], current) => {
      const trailer = current.trailers
      const exists = acc.find((item) => item.id === trailer.id)

      if (!exists && trailer) {
        acc.push({
          id: trailer.id,
          title: trailer.title,
          thumbnail: trailer.thumbnail,
          duration: trailer.duration,
          category: trailer.category,
          last_watched: current.created_at,
        })
      }

      return acc
    }, [])

    return { trailers: uniqueTrailers, success: true }
  } catch (error) {
    console.error("Error fetching continue watching:", error)
    return { trailers: [], success: false }
  }
}

// Get all trailers with pagination
export async function getAllTrailers(page = 1, limit = 12, category?: string, search?: string) {
  try {
    const supabase = createClient()
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from("trailers")
      .select("id, title, description, category, thumbnail, duration, views, likes, trending, release_date", {
        count: "exact",
      })

    // Apply filters if provided
    if (category) {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1).order("release_date", { ascending: false })

    const { data, error, count } = await query

    if (error) {
      throw error
    }

    return {
      trailers: data || [],
      success: true,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    }
  } catch (error) {
    console.error("Error fetching all trailers:", error)
    return {
      trailers: [],
      success: false,
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    }
  }
}
