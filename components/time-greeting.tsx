"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Sunrise, Sunset, User } from "lucide-react"

export default function TimeGreeting() {
  const [greeting, setGreeting] = useState("")
  const [icon, setIcon] = useState<React.ReactNode>(null)
  const [userName, setUserName] = useState("Guest")
  const [timeString, setTimeString] = useState("")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      const minutes = new Date().getMinutes()

      // Format time
      const ampm = hour >= 12 ? "PM" : "AM"
      const hour12 = hour % 12 || 12
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes
      setTimeString(`${hour12}:${minutesStr} ${ampm}`)

      // Set greeting based on time of day
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning")
        setIcon(<Sunrise className="h-8 w-8 text-amber-400" />)
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon")
        setIcon(<Sun className="h-8 w-8 text-amber-500" />)
      } else if (hour >= 17 && hour < 20) {
        setGreeting("Good Evening")
        setIcon(<Sunset className="h-8 w-8 text-amber-600" />)
      } else {
        setGreeting("Good Night")
        setIcon(<Moon className="h-8 w-8 text-amber-300" />)
      }
    }

    // Initial update
    updateGreeting()

    // Update every minute
    const interval = setInterval(updateGreeting, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-amber-950/40 to-amber-900/30 rounded-xl p-6 border border-amber-800/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-amber-900/50 rounded-full p-3">{icon}</div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">
                {greeting}, {userName}
              </h2>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                <div className="bg-amber-900/50 rounded-full p-1.5">
                  <User className="h-4 w-4 text-amber-400" />
                </div>
              </motion.div>
            </div>
            <p className="text-amber-200/80">It's {timeString}. Here are some trailers we think you'll enjoy.</p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
            Personalize Your Experience
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
