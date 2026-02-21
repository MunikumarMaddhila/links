"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, ArrowRight, X, ArrowLeft, CheckCircle } from "lucide-react"
import { createPortal } from "react-dom"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onBackToLogin?: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false)
      setEmail("")
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log("Password reset requested for:", email)
    // Add your password reset logic here
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleOverlayClick}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 10000,
        margin: 0,
        padding: '1rem'
      }}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md mx-auto shadow-2xl transform transition-all scale-100 animate-in fade-in duration-200 relative"
        style={{ zIndex: 10001 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isSubmitted ? "Check Your Email" : "Forgot Password?"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isSubmitted 
                ? "We've sent you a password reset link" 
                : "No worries, we'll send you reset instructions"
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            // Success State
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>. 
                Please check your inbox and follow the instructions.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 mb-3"
              >
                Try Another Email
              </button>
              <button
                onClick={() => {
                  onBackToLogin?.()
                }}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft size={20} />
                Back to Login
              </button>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the email address associated with your account.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onBackToLogin?.()
                }}
                className="w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-300"
              >
                <ArrowLeft size={20} />
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )

  // Use React Portal to render modal at document body level
  return createPortal(modalContent, document.body)
}
