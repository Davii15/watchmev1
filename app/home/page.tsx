import { Suspense } from "react"
import TimeGreeting from "@/components/time-greeting"
import FeaturedTrailers from "@/components/featured-trailers"
import NewReleases from "@/components/new-releases"
import ContinueWatching from "@/components/continue-watching"
import TrendingCategories from "@/components/trending-categories"
import TimeBasedRecommendations from "@/components/time-based-recommendations"
import PersonalizedRecommendations from "@/components/personalized-recommendations"
import QuickAccessMenu from "@/components/quick-access-menu"
import VideoCarousel from "@/components/video-carousel"
import AdDisplay from "@/components/ad-display"
import { BusinessAdvertising } from "@/components/business-advertising"
import { TrustedPartners } from "@/components/trusted-partners"





export default function HomePage() {
  return (
    <main className="min-h-screen pb-20">
      {/* Hero section with video carousel */}
      <section className="relative h-[70vh] mb-8">
        <VideoCarousel />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome to <span className="text-amber-500">TUCHEKI</span>
            </h1>
            <p className="text-xl text-amber-100/90 mb-6 max-w-2xl">
              Your premier destination for the latest and greatest movie trailers from Kenya and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <QuickAccessMenu />
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 mx-auto">
        {/* Personalized greeting */}
        <div className="mb-8">
          <TimeGreeting />
        </div>

        {/* Continue watching section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">Continue Watching</h2>
          <ContinueWatching />
        </section>

        {/* Featured trailers section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">Featured Trailers</h2>
          <FeaturedTrailers />
        </section>

        {/* Ad display - banner */}
        <AdDisplay type="banner" position="bottom" />

        {/* New releases section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">New Releases</h2>
          <NewReleases />
        </section>

        {/* Time-based recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">For Your Mood</h2>
          <Suspense fallback={<div>Loading recommendations...</div>}>
            <TimeBasedRecommendations />
          </Suspense>
        </section>

        {/* Ad display - infeed */}
        <AdDisplay type="infeed" />

        {/* Trending categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">Browse by Category</h2>
          <TrendingCategories />
        </section>

        {/* Personalized recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">Recommended For You</h2>
          <Suspense fallback={<div>Loading personalized content...</div>}>
            <PersonalizedRecommendations />
          </Suspense>
        </section>
         <BusinessAdvertising />
         <TrustedPartners />
      </div>
    </main>
  )
}
