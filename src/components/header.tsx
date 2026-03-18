"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"
import LoginModal from "./login-modal"
import SignupModal from "./signup-modal"

interface HeaderProps {
  isScrolled: boolean
}

export default function Header({ isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoginModalOpen(true)
    setIsMenuOpen(false) // Close mobile menu if open
  }

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSignupModalOpen(true)
    setIsMenuOpen(false) // Close mobile menu if open
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline text-foreground">LinkHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#templates" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Templates
          </Link>
          <Link href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          {/* <Link href="#shopping" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Shop
          </Link> */}
          <Link href="#faq" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={handleLoginClick}
            className="login-btn flex items-center gap-2 px-6 py-2 text-sm font-medium text-foreground transition-colors border border-border rounded-full"
          >
            <User size={16} />
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border p-4 flex flex-col gap-4 md:hidden">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <button 
              onClick={handleLoginClick}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
            >
              <User size={16} />
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

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
    </header>
  )
}
