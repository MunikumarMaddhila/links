"use client"

import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "LinkHub transformed how I share my social media. My followers love the clean design!",
      image: "/diverse-group-profile.png",
    },
    {
      name: "Mike Chen",
      role: "Digital Marketer",
      text: "The analytics dashboard is incredible. I can now see exactly which links my audience clicks most.",
      image: "/man-profile.png",
    },
    {
      name: "Emma Davis",
      role: "Influencer",
      text: "Professional, easy to use, and the support team is amazing. Highly recommended!",
      image: "/woman-profile.png",
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Loved by Creators</h2>
          <p className="text-lg text-muted-foreground">See what our users are saying</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white border border-border hover:shadow-lg transition-all duration-300"
            >
              <p className="text-lg text-foreground mb-6 leading-relaxed text-pretty">"{testimonial.text}"</p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
