"use client"

import { useState } from "react"
import { ShoppingBag, Star, ArrowRight, Tag, Heart, ShoppingCart } from "lucide-react"

export default function Shopping() {
  const collections = [
    {
      title: "Digital Products",
      subtitle: "New Collection",
      description: "Ebooks, courses, templates & more",
      buttonText: "DISCOVER NOW",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      productImage: "�"
    },
    {
      title: "Creative Services", 
      subtitle: "Great Collection",
      description: "Design, consulting & coaching",
      buttonText: "DISCOVER NOW",
      bgColor: "bg-pink-50", 
      textColor: "text-pink-600",
      productImage: "🎨"
    },
    {
      title: "Premium Tools",
      subtitle: "Flash Sales",
      description: "Software, apps & digital tools",
      buttonText: "DISCOVER NOW",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600", 
      productImage: "⚡"
    }
  ]

  return (
    <section id="shopping" className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-orange-200/30 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-6 shadow-sm">
            <ShoppingBag className="w-4 h-4" />
            Build Your Store
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Turn Your Links Into a Shop
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful product collections and start selling directly from your bio link.
          </p>
        </div>

        {/* Main Featured Section - Exact layout from image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-12 bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Left side - Featured content */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 lg:p-12 flex flex-col justify-center relative">
            {/* Shopping bag icon in top left */}
            <div className="absolute top-6 left-6">
              <ShoppingBag className="w-16 h-16 text-orange-200" />
            </div>
            
            <div className="relative z-10 max-w-sm">
              <div className="inline-block bg-black text-white text-sm font-bold px-4 py-2 rounded mb-6">
                UP TO 50% OFF
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Start Your Store
              </h3>
              <p className="text-gray-700 mb-8 text-base leading-relaxed">
                Transform your bio link into a complete online store. Sell digital products, services, and more with zero setup fees.
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors uppercase tracking-wide">
                SHOP NOW!
              </button>
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-8 lg:p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl lg:text-8xl mb-6 shadow-2xl">
                🛍️
              </div>
              <p className="text-lg font-medium text-gray-700">Start selling in minutes</p>
            </div>
          </div>
        </div>

        {/* Collection Cards - Exact 3-card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {collections.map((collection, index) => (
            <div key={index} className={`${collection.bgColor} rounded-2xl p-8 relative overflow-hidden group hover:shadow-lg transition-all`}>
              {/* Product image in top right */}
              <div className="absolute top-6 right-6 text-4xl opacity-60 group-hover:scale-110 transition-transform">
                {collection.productImage}
              </div>
              
              <div className="relative z-10">
                <div className={`text-sm font-bold ${collection.textColor} mb-3 uppercase tracking-wide`}>
                  {collection.subtitle}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {collection.title}
                </h3>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  {collection.description}
                </p>
                <button className={`text-sm font-bold ${collection.textColor} hover:underline uppercase tracking-wide`}>
                  {collection.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Setup</h3>
            <p className="text-gray-600 leading-relaxed">Upload products, set prices, and go live in minutes with our intuitive builder</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Beautiful Design</h3>
            <p className="text-gray-600 leading-relaxed">Professional layouts that make your products look amazing and convert visitors</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
            <p className="text-gray-600 leading-relaxed">Accept payments safely with Stripe, PayPal and 15+ other payment methods</p>
          </div>
        </div>
      </div>
    </section>
  )
}