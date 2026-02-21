"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Why should I choose LinkHub for my bio link page?",
      answer: "LinkHub offers unlimited links, beautiful customizable designs, real-time analytics, and powerful features like geo-filtering and click tracking. Unlike other platforms, we provide professional templates, AI beautification, and white-label experience to help you convert visitors into customers more effectively."
    },
    {
      question: "How easy is it to set up my LinkHub page?",
      answer: "Setting up your LinkHub page takes less than 5 minutes! Simply sign up, choose from our beautiful templates, add your links, customize the design to match your brand, and you're ready to go. No technical skills required - our intuitive interface makes it simple for anyone."
    },
    {
      question: "Can I track how my links are performing?",
      answer: "Absolutely! LinkHub provides comprehensive real-time analytics including click tracking, visitor insights, engagement metrics, and geographic data. You'll know exactly which links perform best, when your audience is most active, and how to optimize for better conversions."
    },
    {
      question: "Do you offer custom domains?",
      answer: "Yes! Our Professional plan includes up to 1 custom domain, and our Business Pro plan includes up to 6 custom domains. You can use your own branded domain (like links.yourbrand.com) to maintain professional credibility and brand consistency."
    },
    {
      question: "What's included in the free plan?",
      answer: "Our free plan includes 1 page, unlimited links, access to our beautiful templates, AI beautification, landing page creation, and basic analytics. It's perfect for getting started and testing our platform before upgrading to unlock more advanced features."
    },
    {
      question: "Can I customize the design of my page?",
      answer: "Definitely! LinkHub offers extensive customization options including professional themes, color schemes, fonts, layouts, and branding elements. Our AI beautification feature can also automatically enhance your page design for maximum visual impact."
    },
    {
      question: "What type of support do you provide?",
      answer: "We offer multiple support channels depending on your plan. Free users get access to our help center and email support. Professional users receive priority support, while Business Pro users get VIP support with 1-on-1 guidance and faster response times."
    },
    {
      question: "Is there a limit on the number of clicks or visitors?",
      answer: "No! All LinkHub plans include unlimited clicks and visitors. Whether you have 100 or 100,000 visitors per month, your links will always work perfectly without any additional charges or limitations."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-gray-700 text-sm font-medium mb-8 shadow-sm border">
            <HelpCircle className="w-4 h-4 text-gray-600" />
            Frequently Asked Questions
          </div> */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            FAQ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick answers to your most common questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none rounded-2xl"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}