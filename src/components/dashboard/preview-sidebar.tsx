"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Eye,
  X,
  Copy
} from "lucide-react"
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaWhatsapp, FaFacebook, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { UserProfile, LinkItem } from "@/hooks/use-dashboard-data"

interface PreviewSidebarProps {
  profile: UserProfile
  links: LinkItem[]
  isCollapsed: boolean
  onToggleCollapse: () => void
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  }
  selectedTheme?: string
}

export default function PreviewSidebar({
  profile,
  links,
  isCollapsed,
  onToggleCollapse,
  contactInfo,
  selectedTheme = "theme1"
}: PreviewSidebarProps) {
  const [width, setWidth] = useState(380) // Increased default width
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Theme configurations
  const themes: Record<string, any> = {
    theme1: {
      design: "gradientpop",
      background: "#667eea",
      text: "#ffffff",
      accent: "#f093fb",
      cardBg: "rgba(255, 255, 255, 0.15)",
      cardHoverBg: "rgba(255, 255, 255, 0.25)",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
    },
    theme2: {
      design: "darkelegance",
      background: "#0f0f0f",
      text: "#e5d4b5",
      accent: "#d4af37",
      cardBg: "#1a1a1a",
      cardHoverBg: "#2a2a2a",
      gradient: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)"
    },
    theme3: {
      design: "wedding",
      background: "#fdf6ed",
      text: "#8b7355",
      accent: "#d4af37",
      cardBg: "#ffffff",
      cardHoverBg: "#fef3e2",
      gradient: "linear-gradient(135deg, #fdf6ed 0%, #fff5e6 50%, #fdf6ed 100%)"
    },
    theme4: {
      design: "musicartist",
      background: "#1a1a2e",
      text: "#ffffff",
      accent: "#ff006e",
      cardBg: "#16213e",
      cardHoverBg: "#0f3460",
      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1620 100%)"
    },
    theme5: {
      design: "photostudio",
      background: "#ffffff",
      text: "#2d3436",
      accent: "#0984e3",
      cardBg: "#f8f9fa",
      cardHoverBg: "#e9ecef",
      gradient: "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)"
    },
    theme6: {
      design: "beautycreator",
      background: "#fff5f7",
      text: "#6d4c41",
      accent: "#ff6b9d",
      cardBg: "#ffffff",
      cardHoverBg: "#ffe0e9",
      gradient: "linear-gradient(135deg, #fff5f7 0%, #ffe0e9 50%, #fff5f7 100%)"
    },
    theme7: {
      design: "foodblogger",
      background: "#fffbf0",
      text: "#5d4e37",
      accent: "#ff6f00",
      cardBg: "#ffffff",
      cardHoverBg: "#fff8e1",
      gradient: "linear-gradient(135deg, #fffbf0 0%, #fff8e1 50%, #fffbf0 100%)"
    },
    theme8: {
      design: "interiordesign",
      background: "#f5f5f0",
      text: "#4a4a4a",
      accent: "#b8986d",
      cardBg: "#ffffff",
      cardHoverBg: "#eeede8",
      gradient: "linear-gradient(135deg, #f5f5f0 0%, #eeede8 50%, #f5f5f0 100%)"
    },
    theme9: {
      design: "techstartup",
      background: "#0a0e27",
      text: "#e0e7ff",
      accent: "#6366f1",
      cardBg: "#1e293b",
      cardHoverBg: "#334155",
      gradient: "linear-gradient(135deg, #0a0e27 0%, #1e293b 50%, #0f172a 100%)"
    },
    theme10: {
      design: "fashionmodel",
      background: "#000000",
      text: "#ffffff",
      accent: "#ffd700",
      cardBg: "#1a1a1a",
      cardHoverBg: "#2d2d2d",
      gradient: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)"
    },
    theme11: {
      design: "fitnesscoach",
      background: "#e8f5e9",
      text: "#1b5e20",
      accent: "#00c853",
      cardBg: "#ffffff",
      cardHoverBg: "#f1f8f4",
      gradient: "linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 50%, #e8f5e9 100%)"
    },
    theme12: {
      design: "natureblog",
      background: "#e8f4f8",
      text: "#004d40",
      accent: "#00897b",
      cardBg: "#ffffff",
      cardHoverBg: "#e0f2f1",
      gradient: "linear-gradient(135deg, #e8f4f8 0%, #e0f2f1 50%, #e8f4f8 100%)"
    },
    theme13: {
      design: "minimalistpro",
      background: "#ffffff",
      text: "#1a1a1a",
      accent: "#0066cc",
      cardBg: "#fafafa",
      cardHoverBg: "#f5f5f5",
      gradient: "linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)"
    },
    theme14: {
      design: "neoncyber",
      background: "#0d0221",
      text: "#ffffff",
      accent: "#00ff41",
      cardBg: "#1a0b2e",
      cardHoverBg: "#2d1b4e",
      gradient: "linear-gradient(135deg, #0d0221 0%, #1a0b2e 50%, #0d0221 100%)"
    },
    theme15: {
      design: "categorygrid",
      background: "#f0f0f0",
      text: "#333333",
      accent: "#e91e63",
      cardBg: "#ffffff",
      cardHoverBg: "#f5f5f5",
      gradient: "linear-gradient(135deg, #f0f0f0 0%, #ffffff 50%, #f0f0f0 100%)"
    }
  };

  const currentTheme = themes[selectedTheme] || themes.theme1;

  // Load width from localStorage on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('previewSidebarWidth')
    if (savedWidth) {
      setWidth(parseInt(savedWidth))
    }
  }, [])

  // Save width to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('previewSidebarWidth', width.toString())
  }, [width])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "whatsapp": return { Icon: FaWhatsapp, color: "#25D366" };
      case "instagram": return { Icon: FaInstagram, color: "#E4405F" };
      case "linkedin": return { Icon: FaLinkedin, color: "#0077B5" };
      case "facebook": return { Icon: FaFacebook, color: "#1877F3" };
      case "youtube": return { Icon: FaYoutube, color: "#FF0000" };
      case "github": return { Icon: FaGithub, color: "#333" };
      case "x": return { Icon: FaXTwitter, color: "#000" };
      case "other": return { Icon: FaGlobe, color: "#38bdf8" };
      default: return { Icon: ExternalLink, color: "#A0AEC0" };
    }
  }

  const activeSocials = Object.entries(profile.socialHandles)
    .filter(([_, value]) => value && value.trim() !== "")
    .map(([platform, handle]) => ({ platform, handle }))

  const activeLinks = links.filter(link => link.isActive)

  // Mouse event handlers for resizing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    e.preventDefault()
    const newWidth = window.innerWidth - e.clientX
    const minWidth = 300 // Minimum width
    const maxWidth = 800 // Increased maximum width
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth)
    }
  }, [isResizing])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mouseleave', handleMouseUp) // Stop resizing if mouse leaves window
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      // @ts-ignore - Browser specific properties
      document.body.style.webkitUserSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      // @ts-ignore - Browser specific properties
      document.body.style.webkitUserSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      // @ts-ignore - Browser specific properties
      document.body.style.webkitUserSelect = ''
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

if (isCollapsed) {
  return (
    <div className="w-16 bg-white border-l border-gray-200 h-screen flex flex-col items-center justify-center">
      <Button
        variant="ghost"
        size="lg"
        onClick={onToggleCollapse}
        className="flex flex-row items-center justify-center gap-2 p-0 h-auto text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
        style={{ transform: "rotate(90deg)" }}
        title="Click to show preview"
      >
        <Eye className="h-5 w-5 text-gray-600" />
        <p className="text-xs text-gray-400 whitespace-nowrap">Preview</p>
      </Button>
    </div>
  )
}

  return (
    <div 
      ref={sidebarRef}
      className="bg-white border-l border-gray-200 h-screen flex relative"
      style={{ width: width }}
    >
      {/* Resize Handle - More visible */}
      <div
        className="absolute left-0 top-0 w-4 h-full cursor-col-resize bg-transparent hover:bg-blue-100 transition-all z-20 group border-l-2 border-transparent hover:border-blue-400"
        onMouseDown={handleMouseDown}
        title="Drag to resize preview panel"
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-gray-400 group-hover:bg-blue-500 transition-colors rounded-full"></div>
        <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-gray-300 group-hover:bg-blue-400 transition-colors rounded-full"></div>
        <div className="absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-gray-300 group-hover:bg-blue-400 transition-colors rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-1.5 h-auto text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-sm mx-auto">
            {/* URL Bar */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-xs font-mono text-gray-700 flex items-center" style={{ maxWidth: '280px' }}>
                <span className="text-gray-400 mr-1">http://localhost:3000/</span>
                <span className="font-semibold text-gray-700 truncate">{profile.name ? profile.name.replace(/\s+/g, '').toLowerCase() : ''}</span>
                <button
                  className="ml-2 p-1 rounded hover:bg-gray-200"
                  title="Copy URL"
                  onClick={() => {
                    const url = `http://localhost:3000/${profile.name ? profile.name.replace(/\s+/g, '').toLowerCase() : ''}`;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            {/* Mobile Frame */}
            <div className="bg-black rounded-[2.5rem] p-2 mx-auto" style={{ width: '280px', border: '1px solid #000' }}>
              <div className="rounded-[2rem] overflow-auto" style={{ background: currentTheme.gradient || currentTheme.background, minHeight: '500px', maxHeight: '500px' }}>
                {(currentTheme.design === "gradientpop" || currentTheme.design === "musicartist" || currentTheme.design === "techstartup" || currentTheme.design === "neoncyber") && (
                  <div className="p-4 min-h-full flex flex-col items-center justify-center">
                    {/* Avatar */}
                    <Avatar className="mb-3 h-14 w-14 ring-2 ring-white/20">
                      <AvatarImage src={profile.profileImage} alt={profile.name} />
                      <AvatarFallback className="text-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: currentTheme.text }}>
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-base font-bold mb-1 text-white text-center">
                      {profile.name}
                    </h2>
                    
                    {profile.bio && (
                      <p className="text-xs leading-relaxed mb-4 text-white text-center opacity-90">
                        {profile.bio}
                      </p>
                    )}

                    {/* Banner Alert */}
                    {activeLinks.length > 0 && activeLinks[0] && (
                      <div className="w-full mb-3 p-2 rounded-xl backdrop-blur-sm border border-white/30" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                        <div className="flex items-center gap-2 text-white text-xs">
                          <span>✨</span>
                          <span className="flex-1 font-semibold">{activeLinks[0].title}</span>
                          <span className="text-white/60">×</span>
                        </div>
                      </div>
                    )}

                    {/* White Buttons */}
                    <div className="w-full space-y-2 mb-4">
                      {activeLinks.slice(1).map((link) => (
                        <button
                          key={link.id}
                          className="w-full p-3 rounded-xl text-center shadow-md"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#333' }}
                          onClick={() => window.open(formatUrl(link.url), '_blank')}
                        >
                          <span className="font-bold text-xs">{link.title}</span>
                        </button>
                      ))}
                    </div>

                    {/* Social Icons */}
                    {activeSocials.length > 0 && (
                      <div className="flex justify-center gap-2">
                        {activeSocials.map(({ platform, handle }) => {
                          const { Icon, color } = getSocialIcon(platform)
                          return (
                            <button key={platform} className="p-2 rounded-full" style={{ background: color }}>
                              <Icon className="h-3 w-3 text-white" />
                            </button>
                          )
                        })}
                      </div>
                    )}

                    <p className="text-xs text-white opacity-60 mt-4">Created with CreatorHub</p>
                  </div>
                )}

                {(currentTheme.design === "darkelegance" || currentTheme.design === "wedding" || currentTheme.design === "interiordesign" || currentTheme.design === "fashionmodel" || currentTheme.design === "minimalistpro") && (
                  <div className="p-4 min-h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: currentTheme.accent }}/>
                    
                    <Avatar className="mb-3 h-16 w-16 ring-2" style={{ borderColor: currentTheme.accent }}>
                      <AvatarImage src={profile.profileImage} alt={profile.name} />
                      <AvatarFallback className="text-sm" style={{ backgroundColor: currentTheme.cardBg, color: currentTheme.text }}>
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-base font-bold mb-1 text-center italic" style={{ color: currentTheme.text, fontFamily: 'serif' }}>
                      {profile.name}
                    </h2>
                    
                    {profile.bio && (
                      <p className="text-xs leading-relaxed mb-6 text-center" style={{ color: currentTheme.text, opacity: 0.7 }}>
                        {profile.bio}
                      </p>
                    )}

                    <div className="w-full space-y-2 mb-4">
                      {activeLinks.map((link) => (
                        <button
                          key={link.id}
                          className="w-full p-3 rounded-lg text-center border-2"
                          style={{ borderColor: currentTheme.accent, backgroundColor: 'transparent', color: currentTheme.text }}
                          onClick={() => window.open(formatUrl(link.url), '_blank')}
                        >
                          <span className="font-semibold text-xs">{link.title}</span>
                        </button>
                      ))}
                    </div>

                    <div className="w-full h-px mb-3" style={{ backgroundColor: currentTheme.accent, opacity: 0.3 }}/>
                    <p className="text-xs mb-3" style={{ color: currentTheme.text, opacity: 0.6 }}>CONTACT ME</p>

                    {activeSocials.length > 0 && (
                      <div className="flex justify-center gap-2">
                        {activeSocials.map(({ platform }) => {
                          const { Icon } = getSocialIcon(platform)
                          return (
                            <div key={platform} className="w-4 h-4 rounded-sm" style={{ backgroundColor: currentTheme.accent, opacity: 0.6 }}>
                              <Icon className="h-3 w-3 text-white m-auto" />
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <p className="text-xs mt-4" style={{ color: currentTheme.text, opacity: 0.4 }}>Created with CreatorHub</p>
                  </div>
                )}

                {(currentTheme.design === "photostudio" || currentTheme.design === "beautycreator" || currentTheme.design === "foodblogger" || currentTheme.design === "fitnesscoach" || currentTheme.design === "natureblog") && (
                  <div className="p-4 min-h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                        <AvatarImage src={profile.profileImage} alt={profile.name} />
                        <AvatarFallback className="text-xs font-bold" style={{ backgroundColor: currentTheme.accent, color: '#fff' }}>
                          {getInitials(profile.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-sm font-bold" style={{ color: currentTheme.text }}>
                          {profile.name}
                        </h2>
                        {profile.bio && (
                          <p className="text-xs" style={{ color: currentTheme.text, opacity: 0.6 }}>
                            {profile.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {activeSocials.length > 0 && (
                      <div className="flex justify-center gap-2 mb-4">
                        {activeSocials.map(({ platform }) => {
                          const { Icon, color } = getSocialIcon(platform)
                          return (
                            <button key={platform} className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: currentTheme.cardBg }}>
                              <Icon className="h-3 w-3" style={{ color }} />
                            </button>
                          )
                        })}
                      </div>
                    )}

                    <div className="space-y-3">
                      {activeLinks.map((link) => (
                        <button
                          key={link.id}
                          className="w-full rounded-xl overflow-hidden shadow-md text-left"
                          style={{ backgroundColor: currentTheme.cardBg }}
                          onClick={() => window.open(formatUrl(link.url), '_blank')}
                        >
                          <div className="h-20 relative" style={{ backgroundColor: currentTheme.accent, opacity: 0.4 }}>
                            {profile.profileImage && (
                              <div className="absolute bottom-2 left-2 w-10 h-10 rounded-lg overflow-hidden border border-white">
                                <Avatar className="w-full h-full">
                                  <AvatarImage src={profile.profileImage} alt={link.title} />
                                  <AvatarFallback style={{ backgroundColor: currentTheme.accent, color: '#fff', fontSize: '10px' }}>
                                    {link.title.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-bold text-xs mb-1" style={{ color: currentTheme.text }}>
                              {link.title}
                            </h3>
                            <p className="text-xs mb-2" style={{ color: currentTheme.text, opacity: 0.6 }}>
                              Check out my work
                            </p>
                            <div className="inline-block px-3 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: currentTheme.accent, color: '#fff' }}>
                              Let's Collaborate!
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-center text-xs mt-auto pt-4" style={{ color: currentTheme.text, opacity: 0.4 }}>
                      Created with CreatorHub
                    </p>
                  </div>
                )}

                {currentTheme.design === "categorygrid" && (
                  <div className="p-3 min-h-full">
                    <div className="grid grid-cols-2 gap-2 h-full">
                      {activeLinks.slice(0, 4).map((link, index) => {
                        const cardColors = ['#ec407a', '#0288d1', '#f57c00', '#ff5722']
                        const cardColor = cardColors[index % 4]
                        
                        return (
                          <button
                            key={link.id}
                            className="rounded-xl overflow-hidden flex flex-col"
                            style={{ backgroundColor: cardColor, minHeight: '220px' }}
                            onClick={() => window.open(formatUrl(link.url), '_blank')}
                          >
                            <div className="h-14 relative" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                              <Avatar className="absolute top-2 left-2 h-8 w-8 ring-2 ring-white">
                                <AvatarImage src={profile.profileImage} alt={profile.name} />
                                <AvatarFallback className="text-xs font-bold bg-white text-gray-800">
                                  {getInitials(profile.name)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            
                            <div className="p-2 flex-1 flex flex-col text-left">
                              <h3 className="font-bold text-xs mb-0.5 text-white">
                                {link.title}
                              </h3>
                              <p className="text-xs text-white opacity-80 mb-2">
                                {profile.bio || profile.name}
                              </p>
                              
                              <div className="flex gap-1 mb-2">
                                {activeSocials.slice(0, 4).map(({ platform }, idx) => {
                                  const { Icon } = getSocialIcon(platform)
                                  return (
                                    <div key={idx} className="w-4 h-4 rounded-sm bg-white bg-opacity-80 flex items-center justify-center">
                                      <Icon className="h-2 w-2 text-gray-700" />
                                    </div>
                                  )
                                })}
                              </div>
                              
                              <p className="text-xs text-white opacity-70 mb-2">
                                {["34.7K followers", "18.9K followers", "67.3K followers", "89.5K followers"][index]}
                              </p>
                              
                              <div className="mt-auto">
                                <div className="w-full h-6 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                                  <span className="text-xs text-white font-semibold">View More</span>
                                </div>
                              </div>
                              
                              <p className="text-xs text-white opacity-40 mt-2 text-center">
                                Powered by LinkHub
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}