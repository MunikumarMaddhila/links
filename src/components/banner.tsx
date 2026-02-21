"use client"

import Link from "next/link"
import { ChevronRight, ChevronLeft, Instagram, Twitter, Youtube, ShoppingBag, Sparkles, Globe, Briefcase, Mail, Video, Users, Camera, MessageCircle, Headphones, Calendar } from "lucide-react"
import { useState, useEffect } from "react"

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Profile cards with different designs and real avatars (5 cards)
  const allCards = [
    {
      name: "Sarah Chen",
      bio: "Beauty Artist",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      gradient: "from-purple-600 via-pink-500 to-red-500",
      verified: true,
      followers: "125K",
      design: "modern",
      socialLinks: [
        { platform: "Listen On Apple Podcasts", url: "#", icon: <Headphones className="w-4 h-4" />, color: "bg-gray-800" },
        { platform: "Get Special Episodes", url: "#", icon: <Instagram className="w-4 h-4" />, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
        { platform: "Weekly Newsletter", url: "#", icon: <Mail className="w-4 h-4" />, color: "bg-blue-600" },
        { platform: "Shop New Merch", url: "#", icon: <ShoppingBag className="w-4 h-4" />, color: "bg-yellow-500" }
      ]
    },
    {
      name: "Marcus Johnson",
      bio: "Content Creator",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      verified: true,
      followers: "89K",
      design: "glass",
      socialLinks: [
        { platform: "Watch My YouTube", url: "#", icon: <Youtube className="w-4 h-4" />, color: "bg-red-500" },
        { platform: "Follow on Instagram", url: "#", icon: <Instagram className="w-4 h-4" />, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
        { platform: "Photography Portfolio", url: "#", icon: <Camera className="w-4 h-4" />, color: "bg-gray-700" },
        { platform: "Book a Session", url: "#", icon: <Calendar className="w-4 h-4" />, color: "bg-green-600" }
      ]
    },
    {
      name: "Alex Rivera",
      bio: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      gradient: "from-blue-600 via-indigo-500 to-purple-600",
      verified: true,
      followers: "67K",
      design: "minimal",
      socialLinks: [
        { platform: "Follow on Twitter", url: "#", icon: <Twitter className="w-4 h-4" />, color: "bg-blue-500" },
        { platform: "View GitHub Projects", url: "#", icon: <Globe className="w-4 h-4" />, color: "bg-gray-800" },
        { platform: "Connect on LinkedIn", url: "#", icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-700" },
        { platform: "Read My Blog", url: "#", icon: <MessageCircle className="w-4 h-4" />, color: "bg-orange-500" }
      ]
    },
    {
      name: "Luna Park",
      bio: "Musician & Producer",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      verified: true,
      followers: "203K",
      design: "vibrant",
      socialLinks: [
        { platform: "Stream on Spotify", url: "#", icon: <Headphones className="w-4 h-4" />, color: "bg-green-500" },
        { platform: "Watch Music Videos", url: "#", icon: <Youtube className="w-4 h-4" />, color: "bg-red-500" },
        { platform: "Follow on TikTok", url: "#", icon: <Video className="w-4 h-4" />, color: "bg-black" },
        { platform: "Concert Tickets", url: "#", icon: <Calendar className="w-4 h-4" />, color: "bg-purple-600" }
      ]
    },
    {
      name: "David Kim",
      bio: "Business Coach",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      verified: true,
      followers: "156K",
      design: "professional",
      socialLinks: [
        { platform: "Book Free Consultation", url: "#", icon: <Calendar className="w-4 h-4" />, color: "bg-green-600" },
        { platform: "Join My Course", url: "#", icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-700" },
        { platform: "Business Newsletter", url: "#", icon: <Mail className="w-4 h-4" />, color: "bg-orange-500" },
        { platform: "Visit Website", url: "#", icon: <Globe className="w-4 h-4" />, color: "bg-gray-600" }
      ]
    }
  ]

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
    
    // Auto-move carousel every 2.5 seconds for faster flow
    const interval = setInterval(() => {
      if (!isPaused) {
        handleNext()
      }
    }, 2500)
    
    return () => clearInterval(interval)
  }, [isPaused])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % allCards.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + allCards.length) % allCards.length)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  // Get visible cards for continuous flow (show 4 cards)
  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % allCards.length
      cards.push({ ...allCards[index], index, position: i })
    }
    return cards
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-600 py-24 sm:py-32">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4),transparent)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.3),transparent)]"></div>
      </div>
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[Instagram, Twitter, Youtube, ShoppingBag, Globe, Mail, Camera, Users].map((Icon, i) => (
          <div
            key={i}
            className="absolute text-white/10 animate-bounce"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + (i * 0.5)}s`,
            }}
          >
            <Icon size={i % 2 === 0 ? 32 : 24} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Side */}
          <div className="space-y-10">
            <div
              className={`space-y-8 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="space-y-4">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  <Sparkles size={16} />
                  Ultimate Link in Bio Tool
                </div> */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
                  ONE LINK <br />
                  <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                    ALL YOUR SOCIALS
                  </span>
                </h1>
              </div>
              <p className="text-xl text-teal-100 leading-relaxed max-w-lg">
                Create your ultimate social media hub. Share all your links, showcase your content, 
                and grow your audience with one powerful link in bio tool.
              </p>
            </div>

            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 rounded-full font-bold text-lg hover:from-amber-300 hover:to-orange-300 transition-all duration-300 shadow-2xl hover:shadow-amber-400/25 transform hover:scale-105"
                >
                  CREATE HUB
                  <ChevronRight size={24} />
                </Link>
              </div>
              
            </div>
          </div>

          {/* Travel-Style Overlapping Cards Carousel */}
          <div 
            className="relative h-[600px] flex items-center justify-center overflow-visible"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* Cards Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Continuous Flow Cards */}
              <div className="relative w-full max-w-6xl h-full flex items-center justify-center overflow-hidden">
                {getVisibleCards().map((card, displayIndex) => {
                  // Continuous flow positions: far-left (hidden), left, center, right
                  const positions = [
                    { 
                      translateX: -320, 
                      translateY: 30,
                      zIndex: 15, 
                      rotation: -15,
                      scale: 0.7,
                      opacity: 0.3
                    },
                    { 
                      translateX: -160, 
                      translateY: 15,
                      zIndex: 20, 
                      rotation: -8,
                      scale: 0.8,
                      opacity: 0.6
                    },
                    { 
                      translateX: 0, 
                      translateY: 0,
                      zIndex: 30, 
                      rotation: 0,
                      scale: 1.0,
                      opacity: 1
                    },
                    { 
                      translateX: 160, 
                      translateY: 15,
                      zIndex: 25,
                      rotation: 8,
                      scale: 0.9,
                      opacity: 0.8
                    }
                  ];
                  
                  const pos = positions[displayIndex];
                  
                  return (
                    <div
                      key={`${currentIndex}-${card.index}-${displayIndex}`}
                      className={`absolute w-80 h-[600px] left-1/2 top-1/2 overflow-hidden cursor-pointer group transition-all duration-700 ease-out ${
                        card.design === 'modern' ? 'bg-white rounded-3xl shadow-xl backdrop-blur-sm border border-gray-100' :
                        card.design === 'glass' ? 'bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20' :
                        card.design === 'minimal' ? 'bg-white rounded-2xl shadow-lg border-2 border-gray-50' :
                        card.design === 'vibrant' ? 'bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-transparent' :
                        'bg-gray-50 rounded-xl shadow-lg border border-gray-200'
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) translateX(${pos.translateX}px) translateY(${pos.translateY}px) rotate(${pos.rotation}deg) scale(${pos.scale})`,
                        zIndex: pos.zIndex,
                        opacity: pos.opacity,
                        willChange: 'transform, opacity'
                      }}
                      onClick={() => {
                        if (displayIndex === 2) return // Center card is focused
                        if (displayIndex < 2) {
                          handlePrev()
                        } else {
                          handleNext()
                        }
                      }}
                    >
                      {/* Header Section */}
                      <div className={`h-24 bg-gradient-to-br ${card.gradient} relative ${
                        card.design === 'glass' ? 'backdrop-blur-sm bg-opacity-80' : ''
                      }`}>
                        {/* Verified Badge */}
                        {card.verified && (
                          <div className="absolute top-3 right-3">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Design-specific decorations */}
                        {card.design === 'vibrant' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                        )}
                        
                        {card.design === 'glass' && (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        )}
                      </div>
                      
                      {/* Avatar Section */}
                      <div className="relative -mt-12 flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
                          <img 
                            src={card.avatar} 
                            alt={card.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="px-6 pb-6 bg-transparent">
                        {/* Profile Info */}
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {card.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mb-2">
                            {card.bio}
                          </p>
                          <div className="inline-flex items-center gap-1 text-xs text-gray-400">
                            <Users className="w-3 h-3" />
                            <span>{card.followers} followers</span>
                          </div>
                        </div>
                        
                        {/* Social Media Links */}
                        <div className="space-y-3">
                          {card.socialLinks.map((social, i) => (
                            <a
                              key={i} 
                              href={social.url}
                              className={`w-full text-gray-700 p-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-3 hover:scale-[1.02] hover:shadow-sm group ${
                                card.design === 'glass' 
                                  ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50' 
                                  : card.design === 'vibrant'
                                  ? 'bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 border-2 border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                                  : card.design === 'professional'
                                  ? 'bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200'
                                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm ${social.color}`}>
                                {social.icon}
                              </div>
                              <span className="flex-1 text-left">{social.platform}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Navigation Arrows for Continuous Flow */}
              <button 
                onClick={handlePrev}
                disabled={isTransitioning}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-teal-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-teal-700/90 transition-all duration-300 shadow-lg disabled:opacity-50 border border-white/20 hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              
              <button 
                onClick={handleNext}
                disabled={isTransitioning}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-teal-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-teal-700/90 transition-all duration-300 shadow-lg disabled:opacity-50 border border-white/20 hover:scale-110 active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
