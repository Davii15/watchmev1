import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { cookies } from "next/headers"
import type { Database } from "./database.types"

// Create a Supabase client for server components
export function createClient(cookieStore?: ReturnType<typeof cookies>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables. Please check your .env file.")
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      // If cookieStore is provided, use it to get cookies
      ...(cookieStore && {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }),
    },
  })
}

// Create a Supabase client for client components
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables. Please check your .env file.")
}

export const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseKey)

// Database types based on our schema
export type User = {
  id: string
  email: string
  username: string
  avatar_url?: string
  role: string
  created_at: string
}

export type Trailer = {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  video_src: string
  director: string
  cast: string[]
  duration: string
  release_date: string
  created_at: string
  views: number
  likes: number
  comments: number
  trending: boolean
}

export type Comment = {
  id: string
  trailer_id: string
  user_id: string
  content: string
  created_at: string
  likes: number
  user?: User
}

export type Like = {
  id: string
  trailer_id: string
  user_id: string
  created_at: string
}

export type View = {
  id: string
  trailer_id: string
  user_id?: string
  created_at: string
  session_id: string
}

export type Share = {
  id: string
  trailer_id: string
  user_id?: string
  platform: string
  created_at: string
}
