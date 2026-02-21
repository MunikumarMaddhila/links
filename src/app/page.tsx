"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Banner from "@/components/banner"
import Templates from "@/components/templates"
import Pricing from "@/components/pricing"
import Features from "@/components/features"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header isScrolled={isScrolled} />
      <main>
        <Banner />
        <Templates />
        <Features />
        <Pricing />
        {/* <Shopping /> */}
        <FAQ />
        {/* <Testimonials /> */}
      </main>
      <Footer />
    </div>
  )
}
