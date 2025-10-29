"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const socialLinks = [
    { name: "GitHub", url: "#", icon: "🐙" },
    { name: "LinkedIn", url: "#", icon: "💼" },
    { name: "Twitter", url: "#", icon: "𝕏" },
    { name: "Email", url: "mailto:hello@example.com", icon: "✉️" },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-mono uppercase tracking-widest mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. Reach out through the
            form or connect on social media.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:border-accent/50 hover:bg-secondary/50 transition-colors group"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-background border border-border rounded-lg p-6 space-y-4">
              <h4 className="font-bold text-foreground">Contact Information</h4>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground font-mono">hello@example.com</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p className="text-foreground">San Francisco, CA</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">Availability</p>
                  <p className="text-foreground">Open for freelance & full-time opportunities</p>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <span className="font-bold">Response Time:</span> I typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
