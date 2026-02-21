"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Instagram, ShoppingBag, Briefcase, Palette, Camera, Dumbbell, Heart, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

// Animated Text Component with Typewriter Effect
function AnimatedText() {
  const words = [
    { text: "CREATORS", color: "text-pink-500" },
    { text: "BRANDS", color: "text-cyan-500" },
    { text: "ENTREPRENEURS", color: "text-purple-500" },
    { text: "AGENCIES", color: "text-green-500" }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentWord = words[currentIndex].text
    
    if (isTyping) {
      // Typewriter effect
      if (displayedText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, 120) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Word is fully typed, wait then change to next word
        const timeout = setTimeout(() => {
          setDisplayedText("")
          setCurrentIndex((prev) => (prev + 1) % words.length)
        }, 2500) // Display time before next word
        return () => clearTimeout(timeout)
      }
    }
  }, [displayedText, isTyping, currentIndex, words])

  return (
    <div className="relative h-16 flex items-center justify-center">
      <span className={`font-black text-4xl sm:text-6xl ${words[currentIndex].color}`}>
        {displayedText}
        <span className="animate-pulse ml-1 text-gray-400">|</span>
      </span>
    </div>
  )
}

export default function Templates() {
  const [api, setApi] = useState<CarouselApi>()
  const [isHovered, setIsHovered] = useState(false)

  const templates = [
    {
      id: "fitness-trainer",
      name: "Fitness Trainer",
      category: "Health & Fitness",
      description: "Personal training and fitness coaching bio page",
      bgColor: "bg-blue-500",
      profileImage: "https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "FitLife Training",
      tagline: "PERSONAL TRAINER | PRIVATE GROUP CLASS OFFERING",
      socialStats: { followers: "12.5K", following: "890", posts: "456" },
      features: ["Custom workout plans", "Nutrition guidance", "Online coaching", "Group classes"],
      platforms: ["Instagram", "TikTok", "YouTube"],
      links: [
        { title: "12 WEEK TRAINING PLAN - $50", url: "#", icon: "💪" },
        { title: "SAMPLE PLAN", url: "#", icon: "📋" },
        { title: "PRICING GUIDE", url: "#", icon: "💳" }
      ]
    },
    {
      id: "skincare-brand",
      name: "Skincare Brand",
      category: "Beauty & Wellness",
      description: "Natural skincare and beauty product business",
      bgColor: "bg-green-600",
      profileImage: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "SOONY SKINCARE",
      tagline: "FACIALS FOR YOUR UNIQUE SKIN TYPE",
      socialStats: { followers: "8.3K", following: "234", posts: "187" },
      features: ["Natural ingredients", "Custom facials", "Skin consultations", "Product recommendations"],
      platforms: ["Instagram", "Facebook", "Website"],
      links: [
        { title: "Book a Facial - $85", url: "#", icon: "✨" },
        { title: "Skincare Quiz", url: "#", icon: "🧴" },
        { title: "Product Catalog", url: "#", icon: "🛍️" }
      ]
    },
    {
      id: "content-creator",
      name: "Content Creator",
      category: "Media & Entertainment",
      description: "Digital content creator and influencer",
      bgColor: "bg-indigo-600",
      profileImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "WREN SANTS",
      tagline: "CONTENT CREATOR | BRAND",
      socialStats: { followers: "45.2K", following: "1.2K", posts: "892" },
      features: ["Brand partnerships", "Video content", "Photography", "Social media strategy"],
      platforms: ["Instagram", "TikTok", "YouTube"],
      links: [
        { title: "Video Editing Tutorial $75", url: "#", icon: "🎬" },
        { title: "Brand Collaboration Inquiry", url: "#", icon: "🤝" },
        { title: "Photography Presets", url: "#", icon: "📸" }
      ]
    },
    {
      id: "music-artist",
      name: "Music Artist",
      category: "Music & Entertainment",
      description: "Professional musician and music producer",
      bgColor: "bg-teal-500",
      profileImage: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/3693116/pexels-photo-3693116.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "SCOTTY SIRE",
      tagline: "MUSICIAN | PRODUCER | CREATOR",
      socialStats: { followers: "892K", following: "456", posts: "1.2K" },
      features: ["Original music", "Music production", "Live performances", "Collaborations"],
      platforms: ["Spotify", "Apple Music", "Instagram"],
      links: [
        { title: "Latest Album - Stream Now", url: "#", icon: "🎵" },
        { title: "Book Live Performance", url: "#", icon: "🎤" },
        { title: "Music Production Services", url: "#", icon: "🎛️" }
      ]
    },
    {
      id: "podcast-host",
      name: "Podcast Host",
      category: "Media & Entertainment",
      description: "Professional podcaster and media personality",
      bgColor: "bg-purple-600",
      profileImage: "https://images.pexels.com/photos/7563618/pexels-photo-7563618.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/7563616/pexels-photo-7563616.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "THE MINDSET SHOW",
      tagline: "PODCAST HOST | SPEAKER | ENTREPRENEUR",
      socialStats: { followers: "156K", following: "892", posts: "678" },
      features: ["Weekly episodes", "Guest interviews", "Speaking events", "Business coaching"],
      platforms: ["Spotify", "Apple Podcasts", "YouTube"],
      links: [
        { title: "Listen to Latest Episode", url: "#", icon: "🎧" },
        { title: "Book Speaking Event - $2500", url: "#", icon: "🎙️" },
        { title: "Business Coaching Session", url: "#", icon: "💼" }
      ]
    },
    {
      id: "makeup-artist",
      name: "Makeup Artist",
      category: "Beauty & Fashion",
      description: "Professional makeup artist and beauty educator",
      bgColor: "bg-pink-500",
      profileImage: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "GLAM BY MAYA",
      tagline: "MAKEUP ARTIST | BRIDAL SPECIALIST",
      socialStats: { followers: "34.7K", following: "567", posts: "1.8K" },
      features: ["Bridal makeup", "Special events", "Makeup tutorials", "Product reviews"],
      platforms: ["Instagram", "TikTok", "Pinterest"],
      links: [
        { title: "Bridal Package - $350", url: "#", icon: "💄" },
        { title: "Makeup Tutorial Course", url: "#", icon: "📚" },
        { title: "Product Recommendations", url: "#", icon: "✨" }
      ]
    },
    {
      id: "architect",
      name: "Architect",
      category: "Design & Construction",
      description: "Licensed architect and sustainable design specialist",
      bgColor: "bg-cyan-600",
      profileImage: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "MODERN ARCHITECTURE",
      tagline: "LICENSED ARCHITECT | SUSTAINABLE DESIGN",
      socialStats: { followers: "18.9K", following: "432", posts: "567" },
      features: ["Residential design", "Commercial projects", "3D visualization", "Sustainable solutions"],
      platforms: ["LinkedIn", "Instagram", "Behance"],
      links: [
        { title: "Free Design Consultation", url: "#", icon: "🏗️" },
        { title: "Portfolio & Past Projects", url: "#", icon: "📐" },
        { title: "Architectural Services", url: "#", icon: "🏛️" }
      ]
    },
    {
      id: "interior-designer",
      name: "Interior Designer",
      category: "Design & Lifestyle",
      description: "Interior designer specializing in modern living spaces",
      bgColor: "bg-amber-600",
      profileImage: "https://images.pexels.com/photos/3811082/pexels-photo-3811082.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "LUXE INTERIORS",
      tagline: "INTERIOR DESIGNER | HOME STYLING",
      socialStats: { followers: "67.3K", following: "1.1K", posts: "2.3K" },
      features: ["Room makeovers", "Color consultations", "Furniture selection", "Space planning"],
      platforms: ["Instagram", "Pinterest", "Houzz"],
      links: [
        { title: "Room Makeover - $1500", url: "#", icon: "🏠" },
        { title: "Virtual Design Session", url: "#", icon: "💻" },
        { title: "Design Inspiration Gallery", url: "#", icon: "🎨" }
      ]
    },
    {
      id: "chef",
      name: "Chef & Food Creator",
      category: "Food & Lifestyle",
      description: "Professional chef and culinary content creator",
      bgColor: "bg-orange-600",
      profileImage: "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400",
      coverImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      businessName: "CHEF ALESSANDRO",
      tagline: "PROFESSIONAL CHEF | CULINARY EDUCATOR",
      socialStats: { followers: "89.5K", following: "678", posts: "1.9K" },
      features: ["Cooking classes", "Recipe development", "Private dining", "Food photography"],
      platforms: ["Instagram", "YouTube", "TikTok"],
      links: [
        { title: "Private Chef Service - $200/hr", url: "#", icon: "👨‍🍳" },
        { title: "Online Cooking Masterclass", url: "#", icon: "🍳" },
        { title: "Recipe E-Book Collection", url: "#", icon: "📖" }
      ]
    }
  ]

  // Carousel state management with auto-advance
  useEffect(() => {
    if (!api) return

    // Auto-advance carousel every 4 seconds (only when not hovered)
    const interval = setInterval(() => {
      if (!isHovered) {
        api.scrollNext()
      }
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [api, isHovered])

  return (
    <section id="templates" className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] bg-[size:24px_24px]"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium mb-4 shadow-lg">
            <Star className="w-4 h-4 text-yellow-500" />
            Bio Link Templates
          </div> */}
          
          {/* Animated Title */}
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-2">
              TRUSTED BY MILLIONS OF
            </h2>
            <div className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 h-16 flex items-center justify-center">
              <AnimatedText />
            </div>
          </div>
          
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Launch your free Bio Site in minutes
          </p>
        </div>

        {/* Bio Link Cards Carousel */}
        <div 
          className="relative mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: false,
              containScroll: "trimSnaps",
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-8 md:-ml-12">
              {templates.map((template, index) => (
                <CarouselItem key={template.id} className="pl-8 md:pl-12 basis-[90%] sm:basis-[48%] lg:basis-[25%] xl:basis-[25%] 2xl:basis-[25%]">
                  <div
                    className={`${template.bgColor} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 relative w-full`}
                    style={{ height: '630px' }}
                  >
                    {/* Header Section with Profile */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Cover Image */}
                      <img 
                        src={template.coverImage} 
                        alt="Cover" 
                        className="w-full h-full object-cover opacity-80"
                      />
                      
                      {/* Profile Image */}
                      <div className="absolute bottom-4 left-4">
                        <img 
                          src={template.profileImage} 
                          alt={template.businessName}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
                          {template.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Business Info */}
                    <div className="px-6 py-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{template.businessName}</h3>
                      <p className="text-xs text-white/80 mb-3 uppercase tracking-wide">{template.tagline}</p>
                      
                      {/* Social Media Icons */}
                      <div className="flex gap-3 mb-4">
                        <Instagram className="w-4 h-4 text-white/80 hover:text-white cursor-pointer" />
                        <Heart className="w-4 h-4 text-white/80 hover:text-white cursor-pointer" />
                        <Camera className="w-4 h-4 text-white/80 hover:text-white cursor-pointer" />
                        <Star className="w-4 h-4 text-white/80 hover:text-white cursor-pointer" />
                      </div>
                      
                      {/* Social Stats */}
                      <div className="flex gap-4 text-xs text-white/70 mb-4">
                        <span>{template.socialStats.followers} followers</span>
                        <span>{template.socialStats.posts} posts</span>
                      </div>
                    </div>
                    
                    {/* Action Links */}
                    <div className="px-6 pb-6 space-y-3">
                      {template.links.map((link, i) => (
                        <div 
                          key={i} 
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{link.icon}</span>
                              <span className="text-white text-sm font-medium">{link.title}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Bottom Branding */}
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="text-center">
                        <div className="text-white/40 text-xs">Powered by LinkHub</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        {/* Bottom CTA */}
        {/* <div className="text-center mt-24 mb-12">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-xl max-w-md mx-auto border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to get started?</h3>
            <p className="text-gray-600 mb-6 text-sm">Create your bio link page and start monetizing your audience today</p>
            <button className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Create Your Bio Link - Free
            </button>
            <p className="text-xs text-gray-500 mt-3">No credit card required • Setup in 2 minutes</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}
