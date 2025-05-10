"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"

// Sample genres
const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
]

// Sample languages
const LANGUAGES = [
  "English",
  "Swahili",
  "French",
  "Arabic",
  "Amharic",
  "Somali",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Zulu",
  "Xhosa",
  "Portuguese",
]

// Sample countries
const COUNTRIES = [
  "Kenya",
  "Nigeria",
  "South Africa",
  "Tanzania",
  "Uganda",
  "Ghana",
  "Ethiopia",
  "Egypt",
  "Morocco",
  "Senegal",
  "Rwanda",
  "Zimbabwe",
]

// Sample years
const YEARS = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())

// Sample ratings
const RATINGS = ["G", "PG", "PG-13", "R", "NC-17", "TV-Y", "TV-G", "TV-PG", "TV-14", "TV-MA"]

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedRating, setSelectedRating] = useState<string>("")
  const [durationRange, setDurationRange] = useState<number[]>([0, 180])
  const [includeVerifiedOnly, setIncludeVerifiedOnly] = useState(false)
  const [includeSubtitles, setIncludeSubtitles] = useState(false)
  const [includeClosedCaptions, setIncludeClosedCaptions] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Kenyan comedy",
    "Nairobi drama",
    "Wildlife documentary",
    "African action",
  ])
  const [popularSearches, setPopularSearches] = useState<string[]>([
    "New releases",
    "Award winning",
    "Trending now",
    "Local favorites",
  ])

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  // Toggle country selection
  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery)
      console.log("Selected Genres:", selectedGenres)
      console.log("Selected Languages:", selectedLanguages)
      console.log("Selected Countries:", selectedCountries)
      console.log("Selected Year:", selectedYear)
      console.log("Selected Rating:", selectedRating)
      console.log("Duration Range:", durationRange)
      console.log("Include Verified Only:", includeVerifiedOnly)
      console.log("Include Subtitles:", includeSubtitles)
      console.log("Include Closed Captions:", includeClosedCaptions)
      console.log("Sort By:", sortBy)
    }
  }

  return (
    <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-6">
      <form onSubmit={handleSearch} className="space-y-6">
        <div>
          <Label htmlFor="search" className="text-amber-300">
            Search Trailers
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 h-5 w-5" />
            <Input
              type="text"
              id="search"
              placeholder="Enter keywords..."
              className="pl-10 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            className="border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            {filtersOpen ? "Hide Filters" : "Show Advanced Filters"}
          </Button>
        </div>

        {filtersOpen && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-amber-300">Genres</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {GENRES.map((genre) => (
                    <Button
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      className={
                        selectedGenres.includes(genre)
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                      }
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-amber-300">Languages</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {LANGUAGES.map((language) => (
                    <Button
                      key={language}
                      variant={selectedLanguages.includes(language) ? "default" : "outline"}
                      className={
                        selectedLanguages.includes(language)
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                      }
                      onClick={() => toggleLanguage(language)}
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-amber-300">Countries</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {COUNTRIES.map((country) => (
                    <Button
                      key={country}
                      variant={selectedCountries.includes(country) ? "default" : "outline"}
                      className={
                        selectedCountries.includes(country)
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "border-amber-700/50 text-amber-400 hover:bg-amber-900/30"
                      }
                      onClick={() => toggleCountry(country)}
                    >
                      {country}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="year" className="text-amber-300">
                  Year
                </Label>
                <select
                  id="year"
                  className="w-full bg-amber-950/50 border-amber-800/50 text-amber-100"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Any</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating" className="text-amber-300">
                  Rating
                </Label>
                <select
                  id="rating"
                  className="w-full bg-amber-950/50 border-amber-800/50 text-amber-100"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                >
                  <option value="">Any</option>
                  {RATINGS.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-amber-300">Duration (minutes)</Label>
                <Slider
                  defaultValue={[0, 180]}
                  max={180}
                  step={1}
                  onValueChange={(value) => setDurationRange(value)}
                  className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-amber-500"
                />
                <div className="flex justify-between text-sm text-amber-300/70 mt-1">
                  <span>{durationRange[0]}</span>
                  <span>{durationRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="verifiedOnly"
                className="border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                checked={includeVerifiedOnly}
                onCheckedChange={(checked) => setIncludeVerifiedOnly(checked)}
              />
              <Label htmlFor="verifiedOnly" className="text-sm text-amber-300">
                Include Verified Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="subtitles"
                className="border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                checked={includeSubtitles}
                onCheckedChange={(checked) => setIncludeSubtitles(checked)}
              />
              <Label htmlFor="subtitles" className="text-sm text-amber-300">
                Include Subtitles
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="closedCaptions"
                className="border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                checked={includeClosedCaptions}
                onCheckedChange={(checked) => setIncludeClosedCaptions(checked)}
              />
              <Label htmlFor="closedCaptions" className="text-sm text-amber-300">
                Include Closed Captions
              </Label>
            </div>

            <div>
              <Label htmlFor="sortBy" className="text-amber-300">
                Sort By
              </Label>
              <select
                id="sortBy"
                className="w-full bg-amber-950/50 border-amber-800/50 text-amber-100"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="date">Date</option>
                <option value="views">Views</option>
              </select>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
          Search
        </Button>
      </form>
    </div>
  )
}
