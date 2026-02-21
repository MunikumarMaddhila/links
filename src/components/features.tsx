"use client"

import { useState } from "react"
import { Zap, BarChart3, Palette, Shield, Rocket, Globe, Users, Lock, ArrowRight, Play } from "lucide-react"

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Rocket,
      title: "Boost Click Performance",
      description: "Increase engagement rates and drive more traffic to your content",
      stat: "+30%",
      color: "bg-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: Palette,
      title: "Beautiful Designs",
      description: "Create eye-catching pages with professional layouts and themes",
      stat: "50+",
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: BarChart3,
      title: "Track Your Success",
      description: "Monitor performance with comprehensive data and insights",
      stat: "24/7",
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: "Organize Everything",
      description: "Keep all your important links organized in one convenient place",
      stat: "∞",
      color: "bg-green-500",
      bgColor: "bg-green-50"
    }
  ]

  return (
    <section id="features" className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-gray-700 text-sm font-medium mb-6 shadow-lg border">
            <Play className="w-4 h-4 text-purple-500" />
            Powerful Features
          </div> */}
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            Why Choose
            <span className="text-purple-600 block">
              LinkHub
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to turn your audience into revenue
          </p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Feature List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = activeFeature === index
              
              return (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`relative p-6 rounded-2xl transition-all duration-500 ${
                    isActive 
                      ? `${feature.bgColor} shadow-2xl border-2 border-white` 
                      : 'bg-white/60 hover:bg-white/80 shadow-lg'
                  }`}>
                    {/* Active Indicator */}
                    {isActive && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${feature.color} rounded-l-2xl`}></div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center transition-transform duration-300 ${
                        isActive ? 'scale-110 rotate-3' : 'group-hover:scale-105'
                      }`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                          isActive ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                      
                      {/* Stat */}
                      <div className={`text-3xl font-black text-${feature.color.replace('bg-', '')} transition-all duration-300 ${
                        isActive ? 'scale-125' : 'scale-100'
                      }`}>
                        {feature.stat}
                      </div>
                      
                      {/* Arrow */}
                      <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-gray-900 translate-x-1' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side - Visual Demo */}
          <div className="relative">
            {/* Main Demo Container */}
            <div className={`relative ${features[activeFeature].color} rounded-3xl p-8 shadow-2xl transform transition-all duration-700 hover:rotate-1 hover:scale-105`}>
              {/* Mock Bio Link Interface */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    AB
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">Alex Bio</div>
                    <div className="text-gray-500 text-sm">@alexbio • San Francisco</div>
                    <div className="text-xs text-gray-400 mt-1">Digital creator sharing amazing content daily</div>
                  </div>
                </div>
                
                {/* Social Stats */}
                <div className="flex gap-6 mb-6 text-center">
                  <div>
                    <div className="font-bold text-gray-900">8.2K</div>
                    <div className="text-xs text-gray-500">followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">234</div>
                    <div className="text-xs text-gray-500">following</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">89</div>
                    <div className="text-xs text-gray-500">posts</div>
                  </div>
                </div>
                
                {/* Demo Links based on active feature */}
                <div className="space-y-3">
                  {activeFeature === 0 && (
                    <>
                      <div className="p-4 rounded-xl bg-orange-500 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">�</span>
                            <span className="font-medium">Premium Content Access</span>
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">�</span>
                            <span className="text-gray-700">Free Resources</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">✉️</span>
                            <span className="text-gray-700">Get In Touch</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {activeFeature === 1 && (
                    <>
                      <div className="p-4 rounded-xl bg-purple-500 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">🎨</span>
                            <span className="font-medium">Creative Portfolio</span>
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">✨</span>
                            <span className="text-gray-700">Design Showcase</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">�</span>
                            <span className="text-gray-700">Shop My Work</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {activeFeature === 2 && (
                    <>
                      <div className="p-4 rounded-xl bg-blue-500 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">📊</span>
                            <span className="font-medium">View Analytics</span>
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">📈</span>
                            <span className="text-gray-700">Growth Metrics</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">🎯</span>
                            <span className="text-gray-700">Traffic Sources</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </>
                  )}
                  
                  {activeFeature === 3 && (
                    <>
                      <div className="p-4 rounded-xl bg-green-500 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">🔗</span>
                            <span className="font-medium">My Link Hub</span>
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">📱</span>
                            <span className="text-gray-700">Social Profiles</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">🌐</span>
                            <span className="text-gray-700">Main Website</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
                <div className="text-2xl font-bold text-gray-900">{features[activeFeature].stat}</div>
                <div className="text-xs text-gray-500">boost</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl transform rotate-3 scale-105"></div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-purple-600 mb-2">5M+</div>
              <div className="text-gray-600">Links Created</div>
            </div>
            <div>
              <div className="text-3xl font-black text-pink-600 mb-2">25K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-600 mb-2">99.8%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
