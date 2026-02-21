"use client"

import { Check, Star, Zap } from "lucide-react"
import { useState } from "react"
import LoginModal from "./login-modal"
import SignupModal from "./signup-modal"

// Updated component with cache busting
export default function Pricing() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  const handleStartForFree = () => {
    setIsSignupModalOpen(true)
  }
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/mo",
      description: "Perfect for getting started",
      features: [
        "Up to 1 Page",
        "Unlimited Links", 
        "Landing Page",
        "Beautiful Designs",
        "Basic Templates",
        "AI Beautification", 
        "No Extra Fees"
      ],
      popular: false,
      buttonText: "Start for Free",
      buttonColor: "bg-gray-900 hover:bg-gray-800"
    },
    {
      name: "Professional",
      price: "₹99",
      period: "/mo", 
      description: "For solo professionals",
      pricePerPage: "₹19.8/page",
      features: [
        "Everything in Free",
        "Up to 5 Pages",
        "Up to 2 System Domains",
        "Up to 1 Own Domain",
        "Geo Filter", 
        "Real-Time Analytics",
        "Click Tracking",
        "Custom Tracking",
        "Engagement Boost",
        "White Label Experience"
      ],
      popular: true,
      badge: "Popular", 
      buttonText: "Start for Free",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      name: "Business Pro",
      price: "₹199", 
      period: "/mo",
      description: "For teams & businesses",
      pricePerPage: "₹6.6/page",
      features: [
        "Everything in Professional",
        "Up to 30 Pages",
        "Up to 6 System Domains",
        "Up to 6 Own Domains", 
        "VIP Support",
        "Pro-only Themes",
        "Early Access Templates",
        "Priority Support",
        "1-on-1 Guidance"
      ],
      popular: false,
      badge: "Best Value",
      buttonText: "Start for Free", 
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ]

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,168,212,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-gray-700 text-sm font-medium mb-8 shadow-lg border">
            <Star className="w-4 h-4 text-yellow-500" />
            Simple Pricing
          </div> */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular ? "md:scale-105 z-20" : ""
              }`}
            >
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col shadow-xl border border-gray-100">
                {/* Popular/Best Value Badge - moved inside card */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-lg ${
                      plan.badge === "Popular" ? "bg-purple-600" : "bg-green-600"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-lg text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.pricePerPage && (
                    <div className="text-sm text-gray-500 mb-2">{plan.pricePerPage}</div>
                  )}
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleStartForFree}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-white ${plan.buttonColor}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => setIsSignupModalOpen(true)}
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => setIsLoginModalOpen(true)}
      />
    </section>
  )
}