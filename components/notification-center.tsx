"use client"

import { useState, useEffect } from "react"
import { Bell, X, Settings, Film, Heart, MessageSquare, Award, Gift, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Mock notification data
const mockNotifications = {
  all: [
    {
      id: 1,
      type: "new_trailer",
      title: "New Trailer Available",
      message: "Savannah Sunrise is now available to watch",
      time: "10 minutes ago",
      read: false,
      image: "/images/safari-wildlife.jpg",
      link: "/trailers/101",
      icon: Film,
    },
    {
      id: 2,
      type: "like",
      title: "Your Review Was Liked",
      message: "Aisha Omar liked your review of Nairobi Nights",
      time: "2 hours ago",
      read: false,
      image: "/images/nairobi-nights.jpg",
      link: "/trailers/301",
      icon: Heart,
    },
    {
      id: 3,
      type: "comment",
      title: "New Comment",
      message: "David Ochieng commented on your review of Mombasa Memories",
      time: "Yesterday",
      read: true,
      image: "/images/mombasa-memories.jpg",
      link: "/trailers/303",
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've watched 100 trailers! You've earned the Film Buff badge.",
      time: "2 days ago",
      read: true,
      image: "/placeholder.svg?height=80&width=80",
      link: "/profile",
      icon: Award,
    },
    {
      id: 5,
      type: "prize",
      title: "You Won a Prize!",
      message: "Congratulations! You've won 100 KES airtime in our weekly giveaway.",
      time: "3 days ago",
      read: true,
      image: "/placeholder.svg?height=80&width=80",
      link: "/prizes",
      icon: Gift,
    },
  ],
  system: [
    {
      id: 1,
      type: "new_trailer",
      title: "New Trailer Available",
      message: "Savannah Sunrise is now available to watch",
      time: "10 minutes ago",
      read: false,
      image: "/images/safari-wildlife.jpg",
      link: "/trailers/101",
      icon: Film,
    },
    {
      id: 4,
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've watched 100 trailers! You've earned the Film Buff badge.",
      time: "2 days ago",
      read: true,
      image: "/placeholder.svg?height=80&width=80",
      link: "/profile",
      icon: Award,
    },
    {
      id: 5,
      type: "prize",
      title: "You Won a Prize!",
      message: "Congratulations! You've won 100 KES airtime in our weekly giveaway.",
      time: "3 days ago",
      read: true,
      image: "/placeholder.svg?height=80&width=80",
      link: "/prizes",
      icon: Gift,
    },
  ],
  social: [
    {
      id: 2,
      type: "like",
      title: "Your Review Was Liked",
      message: "Aisha Omar liked your review of Nairobi Nights",
      time: "2 hours ago",
      read: false,
      image: "/images/nairobi-nights.jpg",
      link: "/trailers/301",
      icon: Heart,
    },
    {
      id: 3,
      type: "comment",
      title: "New Comment",
      message: "David Ochieng commented on your review of Mombasa Memories",
      time: "Yesterday",
      read: true,
      image: "/images/mombasa-memories.jpg",
      link: "/trailers/303",
      icon: MessageSquare,
    },
  ],
  upcoming: [
    {
      id: 6,
      type: "event",
      title: "Upcoming Premiere",
      message: "Don't miss the online premiere of 'Kenyan Legends' this Friday at 8PM",
      time: "In 2 days",
      read: false,
      image: "/placeholder.svg?height=80&width=80",
      link: "/events",
      icon: Calendar,
    },
  ],
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationSettings, setNotificationSettings] = useState({
    newTrailers: true,
    socialActivity: true,
    achievements: true,
    prizes: true,
    events: true,
    emailNotifications: false,
    pushNotifications: true,
  })

  // Calculate unread count
  useEffect(() => {
    const count = notifications.all.filter((notification) => !notification.read).length
    setUnreadCount(count)
  }, [notifications])

  const toggleNotificationCenter = () => {
    setIsOpen(!isOpen)
  }

  const markAsRead = (id: number) => {
    const updatedNotifications = {
      all: notifications.all.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
      system: notifications.system.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
      social: notifications.social.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
      upcoming: notifications.upcoming.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    }
    setNotifications(updatedNotifications)
  }

  const markAllAsRead = () => {
    const updatedNotifications = {
      all: notifications.all.map((notification) => ({ ...notification, read: true })),
      system: notifications.system.map((notification) => ({ ...notification, read: true })),
      social: notifications.social.map((notification) => ({ ...notification, read: true })),
      upcoming: notifications.upcoming.map((notification) => ({ ...notification, read: true })),
    }
    setNotifications(updatedNotifications)
  }

  const deleteNotification = (id: number) => {
    const updatedNotifications = {
      all: notifications.all.filter((notification) => notification.id !== id),
      system: notifications.system.filter((notification) => notification.id !== id),
      social: notifications.social.filter((notification) => notification.id !== id),
      upcoming: notifications.upcoming.filter((notification) => notification.id !== id),
    }
    setNotifications(updatedNotifications)
  }

  const clearAllNotifications = () => {
    setNotifications({
      all: [],
      system: [],
      social: [],
      upcoming: [],
    })
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value,
    })
  }

  return (
    <div className="relative z-50">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-amber-400 hover:text-amber-300 hover:bg-amber-900/20"
        onClick={toggleNotificationCenter}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 md:w-96 bg-amber-950 border border-amber-900/50 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-amber-900/30">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-amber-400">Notifications</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-amber-900/30">
                  <TabsList className="w-full bg-transparent border-0 p-0">
                    <TabsTrigger
                      value="all"
                      className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-amber-300/70"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="system"
                      className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-amber-300/70"
                    >
                      System
                    </TabsTrigger>
                    <TabsTrigger
                      value="social"
                      className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-amber-300/70"
                    >
                      Social
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-amber-300/70"
                    >
                      <Settings className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="max-h-[70vh] overflow-y-auto">
                  <TabsContent value="all" className="m-0">
                    <div className="p-2">
                      {notifications.all.length > 0 ? (
                        <>
                          <div className="flex justify-between items-center p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                              onClick={markAllAsRead}
                            >
                              Mark all as read
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
                              onClick={clearAllNotifications}
                            >
                              Clear all
                            </Button>
                          </div>

                          <div className="space-y-1">
                            {notifications.all.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-3 rounded-md hover:bg-amber-900/30 transition-colors ${
                                  !notification.read ? "bg-amber-900/20" : ""
                                }`}
                              >
                                <div className="flex gap-3">
                                  <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                                    <Image
                                      src={notification.image || "/placeholder.svg"}
                                      alt=""
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <h3 className="font-medium text-amber-300 text-sm">{notification.title}</h3>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 -mr-1 text-amber-400/50 hover:text-amber-400 hover:bg-amber-900/30"
                                        onClick={() => deleteNotification(notification.id)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <p className="text-xs text-amber-200/70 line-clamp-2">{notification.message}</p>
                                    <div className="flex justify-between items-center mt-1">
                                      <span className="text-xs text-amber-400/50">{notification.time}</span>
                                      {!notification.read && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 py-0 px-2"
                                          onClick={() => markAsRead(notification.id)}
                                        >
                                          Mark as read
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <Link
                                  href={notification.link}
                                  className="absolute inset-0"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <span className="sr-only">View notification</span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                          <Bell className="h-12 w-12 text-amber-500/30 mb-4" />
                          <h3 className="text-lg font-medium text-amber-400 mb-2">No notifications</h3>
                          <p className="text-sm text-amber-300/70">
                            You're all caught up! We'll notify you when there's something new.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="system" className="m-0">
                    <div className="p-2">
                      {notifications.system.length > 0 ? (
                        <div className="space-y-1">
                          {notifications.system.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-md hover:bg-amber-900/30 transition-colors ${
                                !notification.read ? "bg-amber-900/20" : ""
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                                  <Image
                                    src={notification.image || "/placeholder.svg"}
                                    alt=""
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-amber-300 text-sm">{notification.title}</h3>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 -mr-1 text-amber-400/50 hover:text-amber-400 hover:bg-amber-900/30"
                                      onClick={() => deleteNotification(notification.id)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-amber-200/70 line-clamp-2">{notification.message}</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-amber-400/50">{notification.time}</span>
                                    {!notification.read && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 py-0 px-2"
                                        onClick={() => markAsRead(notification.id)}
                                      >
                                        Mark as read
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Link
                                href={notification.link}
                                className="absolute inset-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <span className="sr-only">View notification</span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                          <Film className="h-12 w-12 text-amber-500/30 mb-4" />
                          <h3 className="text-lg font-medium text-amber-400 mb-2">No system notifications</h3>
                          <p className="text-sm text-amber-300/70">
                            You'll be notified about new trailers, achievements, and prizes.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="m-0">
                    <div className="p-2">
                      {notifications.social.length > 0 ? (
                        <div className="space-y-1">
                          {notifications.social.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-md hover:bg-amber-900/30 transition-colors ${
                                !notification.read ? "bg-amber-900/20" : ""
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                                  <Image
                                    src={notification.image || "/placeholder.svg"}
                                    alt=""
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-amber-300 text-sm">{notification.title}</h3>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 -mr-1 text-amber-400/50 hover:text-amber-400 hover:bg-amber-900/30"
                                      onClick={() => deleteNotification(notification.id)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-amber-200/70 line-clamp-2">{notification.message}</p>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-amber-400/50">{notification.time}</span>
                                    {!notification.read && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 py-0 px-2"
                                        onClick={() => markAsRead(notification.id)}
                                      >
                                        Mark as read
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Link
                                href={notification.link}
                                className="absolute inset-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <span className="sr-only">View notification</span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                          <MessageSquare className="h-12 w-12 text-amber-500/30 mb-4" />
                          <h3 className="text-lg font-medium text-amber-400 mb-2">No social notifications</h3>
                          <p className="text-sm text-amber-300/70">
                            When others interact with your content, you'll see it here.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="m-0">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-amber-400 mb-4">Notification Settings</h3>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-amber-300">Notification Types</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Film className="h-4 w-4 text-amber-500" />
                                <Label htmlFor="newTrailers" className="text-sm text-amber-200">
                                  New Trailers
                                </Label>
                              </div>
                              <Switch
                                id="newTrailers"
                                checked={notificationSettings.newTrailers}
                                onCheckedChange={(checked) => handleSettingChange("newTrailers", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-amber-500" />
                                <Label htmlFor="socialActivity" className="text-sm text-amber-200">
                                  Social Activity
                                </Label>
                              </div>
                              <Switch
                                id="socialActivity"
                                checked={notificationSettings.socialActivity}
                                onCheckedChange={(checked) => handleSettingChange("socialActivity", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-amber-500" />
                                <Label htmlFor="achievements" className="text-sm text-amber-200">
                                  Achievements
                                </Label>
                              </div>
                              <Switch
                                id="achievements"
                                checked={notificationSettings.achievements}
                                onCheckedChange={(checked) => handleSettingChange("achievements", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-amber-500" />
                                <Label htmlFor="prizes" className="text-sm text-amber-200">
                                  Prizes & Rewards
                                </Label>
                              </div>
                              <Switch
                                id="prizes"
                                checked={notificationSettings.prizes}
                                onCheckedChange={(checked) => handleSettingChange("prizes", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-amber-500" />
                                <Label htmlFor="events" className="text-sm text-amber-200">
                                  Events & Premieres
                                </Label>
                              </div>
                              <Switch
                                id="events"
                                checked={notificationSettings.events}
                                onCheckedChange={(checked) => handleSettingChange("events", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-amber-900/30" />

                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-amber-300">Delivery Methods</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="emailNotifications" className="text-sm text-amber-200">
                                Email Notifications
                              </Label>
                              <Switch
                                id="emailNotifications"
                                checked={notificationSettings.emailNotifications}
                                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="pushNotifications" className="text-sm text-amber-200">
                                Push Notifications
                              </Label>
                              <Switch
                                id="pushNotifications"
                                checked={notificationSettings.pushNotifications}
                                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                                className="data-[state=checked]:bg-amber-600"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">Save Preferences</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
