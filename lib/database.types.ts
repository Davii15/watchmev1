export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      ads: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          link_url: string | null
          start_date: string
          end_date: string
          placement: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          link_url?: string | null
          start_date: string
          end_date: string
          placement?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          link_url?: string | null
          start_date?: string
          end_date?: string
          placement?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          trailer_id: string
          user_id: string
          content: string
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trailer_id: string
          user_id: string
          content: string
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trailer_id?: string
          user_id?: string
          content?: string
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          trailer_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          trailer_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          trailer_id?: string
          user_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string | null
          type: string | null
          is_read: boolean
          related_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content?: string | null
          type?: string | null
          is_read?: boolean
          related_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string | null
          type?: string | null
          is_read?: boolean
          related_id?: string | null
          created_at?: string
        }
      }
      playlist_items: {
        Row: {
          id: string
          playlist_id: string
          trailer_id: string
          position: number | null
          created_at: string
        }
        Insert: {
          id?: string
          playlist_id: string
          trailer_id: string
          position?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          playlist_id?: string
          trailer_id?: string
          position?: number | null
          created_at?: string
        }
      }
      playlists: {
        Row: {
          id: string
          name: string
          description: string | null
          user_id: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          user_id: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          user_id?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      shares: {
        Row: {
          id: string
          trailer_id: string
          user_id: string | null
          platform: string
          created_at: string
        }
        Insert: {
          id?: string
          trailer_id: string
          user_id?: string | null
          platform: string
          created_at?: string
        }
        Update: {
          id?: string
          trailer_id?: string
          user_id?: string | null
          platform?: string
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      trailer_tags: {
        Row: {
          id: string
          trailer_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          id?: string
          trailer_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          id?: string
          trailer_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      trailers: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          thumbnail: string
          video_src: string
          director: string | null
          cast: string[] | null
          duration: string
          release_date: string
          views: number
          likes: number
          comments: number
          trending: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          thumbnail: string
          video_src: string
          director?: string | null
          cast?: string[] | null
          duration: string
          release_date: string
          views?: number
          likes?: number
          comments?: number
          trending?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          thumbnail?: string
          video_src?: string
          director?: string | null
          cast?: string[] | null
          duration?: string
          release_date?: string
          views?: number
          likes?: number
          comments?: number
          trending?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      users: {
        Row: {
          id: string
          username: string | null
          email: string
          avatar_url: string | null
          role: string | null
          bio: string | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          email: string
          avatar_url?: string | null
          role?: string | null
          bio?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          email?: string
          avatar_url?: string | null
          role?: string | null
          bio?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      views: {
        Row: {
          id: string
          trailer_id: string
          user_id: string | null
          session_id: string
          created_at: string
        }
        Insert: {
          id?: string
          trailer_id: string
          user_id?: string | null
          session_id: string
          created_at?: string
        }
        Update: {
          id?: string
          trailer_id?: string
          user_id?: string | null
          session_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_trailer_comments: {
        Args: {
          trailer_id: string
        }
        Returns: undefined
      }
      increment_trailer_likes: {
        Args: {
          trailer_id: string
        }
        Returns: undefined
      }
      increment_trailer_views: {
        Args: {
          trailer_id: string
        }
        Returns: undefined
      }
      decrement_trailer_likes: {
        Args: {
          trailer_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
