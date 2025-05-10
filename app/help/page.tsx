import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, FileText, Video, Gift, User } from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] text-white py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Help Center
          </h1>
          <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
            Find answers to common questions and learn how to get the most out of Tucheki
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 h-5 w-5" />
            <Input
              placeholder="Search for help topics..."
              className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50 h-12"
            />
          </div>
        </div>

        {/* Help Categories */}
        <Tabs defaultValue="faq" className="mb-12">
          <TabsList className="bg-amber-950/50 border border-amber-900/50 p-1 mb-8 overflow-x-auto flex flex-nowrap max-w-full">
            <TabsTrigger value="faq" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Account & Profile
            </TabsTrigger>
            <TabsTrigger value="trailers" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Trailers & Videos
            </TabsTrigger>
            <TabsTrigger value="prizes" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
              Prizes & Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-amber-900/30">
                <AccordionTrigger className="text-amber-300 hover:text-amber-400">What is Tucheki?</AccordionTrigger>
                <AccordionContent className="text-amber-100/80">
                  Tucheki is a platform dedicated to showcasing Kenyan movie trailers. We provide a curated collection
                  of trailers from Kenya's vibrant film industry, allowing users to discover new films, watch trailers,
                  and engage with content creators.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-amber-900/30">
                <AccordionTrigger className="text-amber-300 hover:text-amber-400">
                  Is Tucheki free to use?
                </AccordionTrigger>
                <AccordionContent className="text-amber-100/80">
                  Yes, Tucheki is free to use for basic features. We also offer premium content and features for
                  subscribers. Creating an account is free and gives you access to personalized recommendations, the
                  ability to save favorites, and participate in our rewards program.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-amber-900/30">
                <AccordionTrigger className="text-amber-300 hover:text-amber-400">
                  How do I know if a trailer is official?
                </AccordionTrigger>
                <AccordionContent className="text-amber-100/80">
                  Official trailers are marked with a blue verification badge. These trailers come directly from studios
                  or official distributors. Premium content is marked with an amber badge, and content that has been
                  verified for authenticity has a green badge.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-amber-900/30">
                <AccordionTrigger className="text-amber-300 hover:text-amber-400">
                  Can I download trailers?
                </AccordionTrigger>
                <AccordionContent className="text-amber-100/80">
                  Yes, many trailers on Tucheki can be downloaded for offline viewing. Look for the download icon on
                  trailer cards. Some premium content may have download restrictions or may only be available to
                  subscribers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-amber-900/30">
                <AccordionTrigger className="text-amber-300 hover:text-amber-400">
                  How do I win prizes?
                </AccordionTrigger>
                <AccordionContent className="text-amber-100/80">
                  You can win prizes by participating in our QR code scanning program. QR codes can be found on
                  promotional materials, at the end of selected trailers, or at partner locations. Scan these codes to
                  enter draws for airtime, movie tickets, and exclusive merchandise.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="account">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Creating an Account
                  </CardTitle>
                  <CardDescription className="text-amber-300/70">Learn how to sign up and get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Creating an account on Tucheki is simple. Click the "Sign In" button in the top right corner and
                    select "Create Account". You can sign up using your email address or through Google or Facebook.
                  </p>
                  <p>
                    Once registered, you'll have access to personalized recommendations, the ability to save favorites,
                    and participate in our rewards program.
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700 mt-2">
                    <Link href="/auth/register">Create Account</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Managing Your Profile
                  </CardTitle>
                  <CardDescription className="text-amber-300/70">
                    Update your information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    After signing in, you can access your profile by clicking on your profile picture in the top right
                    corner and selecting "Profile".
                  </p>
                  <p>
                    From your profile page, you can update your personal information, change your password, manage
                    notification preferences, and view your watch history and favorites.
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700 mt-2">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trailers">
            <div className="space-y-6">
              <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Watching Trailers
                  </CardTitle>
                  <CardDescription className="text-amber-300/70">
                    How to get the best viewing experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Tucheki offers a high-quality viewing experience for all trailers. Simply click on any trailer
                    thumbnail to start watching. You can adjust video quality, enable full-screen mode, and control
                    volume using the player controls.
                  </p>
                  <p>
                    For the best experience, we recommend using a modern browser like Chrome, Firefox, or Safari. Make
                    sure your internet connection is stable for smooth playback.
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700 mt-2">
                    <Link href="/trailers">Browse Trailers</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Understanding Verification Badges
                  </CardTitle>
                  <CardDescription className="text-amber-300/70">Learn what the different badges mean</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Tucheki uses three types of verification badges to help you identify content:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-blue-500 font-medium">Blue Badge (Official)</span>: Content published by
                      official studios or distributors
                    </li>
                    <li>
                      <span className="text-amber-500 font-medium">Amber Badge (Premium)</span>: Premium content
                      available to subscribers
                    </li>
                    <li>
                      <span className="text-green-500 font-medium">Green Badge (Verified)</span>: Content verified for
                      authenticity
                    </li>
                  </ul>
                  <p>
                    These badges help ensure you're watching authentic content from trusted sources. We verify all
                    content before it appears on our platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prizes">
            <Card className="bg-amber-950/30 border-amber-900/50 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Prizes & Rewards Program
                </CardTitle>
                <CardDescription className="text-amber-300/70">
                  Learn how to win exciting prizes through Tucheki
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Tucheki offers an exciting rewards program where you can win airtime, movie tickets, and exclusive
                  merchandise. Here's how it works:
                </p>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    <span className="font-medium text-amber-300">Find QR Codes</span>: Look for QR codes on promotional
                    materials, at the end of selected trailers, or at partner locations.
                  </li>
                  <li>
                    <span className="font-medium text-amber-300">Scan the Code</span>: Use the Tucheki app or website to
                    scan the QR code.
                  </li>
                  <li>
                    <span className="font-medium text-amber-300">Enter Draws</span>: Each scan gives you entries into
                    our prize draws.
                  </li>
                  <li>
                    <span className="font-medium text-amber-300">Win Prizes</span>: Winners are selected randomly and
                    notified via email or SMS.
                  </li>
                </ol>
                <p className="mt-4">
                  The more you engage with Tucheki content, the more opportunities you'll have to win. Make sure your
                  account details are up to date so we can contact you if you win!
                </p>
                <Button asChild className="bg-amber-600 hover:bg-amber-700 mt-2">
                  <Link href="/prizes">Learn More About Prizes</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 p-8 rounded-xl text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4 text-amber-400" />
          <h2 className="text-2xl font-bold mb-2 text-amber-400">Still Need Help?</h2>
          <p className="text-amber-200/80 mb-6 max-w-2xl mx-auto">
            Our support team is ready to assist you with any questions or issues you may have.
          </p>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
