/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "placeholder.com",
      "via.placeholder.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "picsum.photos",
      "supabase.co",
      "supabase.com",
      "random.imagecdn.app",
      "loremflickr.com",
      "placeimg.com",
      "placekitten.com",
      "placehold.co",
      "placehold.it",
      "placeholdit.imgix.net",
      "placebear.com",
      "placecage.com",
      "placebeard.it",
      "placedog.net",
      "placeskull.com",
      
        
     
        ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
