"use client"

import Link from "next/link"
import { useState } from "react"
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { Send, ChevronDown } from "lucide-react"

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    userType: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    // Add your form submission logic here
    alert("Thank you for your feedback!")
    setFormData({ name: "", userType: "", message: "" })
  }

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Section 1: Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-white">LinkHub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The easiest way to share all your social links in one beautiful place. Create stunning bio link pages that convert visitors into customers.
            </p>
          </div>

          {/* Section 2: Navigation Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link href="#templates" className="hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Feedback Form */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Share Your Feedback</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                required
              />
              
              <div className="relative">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 appearance-none"
                  required
                >
                  <option value="">I am a...</option>
                  <option value="creator">Content Creator</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="business_owner">Business Owner</option>
                  <option value="marketer">Digital Marketer</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="influencer">Influencer</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your experience or suggestions..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 resize-none"
                required
              />
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-white text-gray-900 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">© 2025 LinkHub. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
