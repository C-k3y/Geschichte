"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute right-0 top-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-accent text-sm font-mono uppercase tracking-widest">Welcome to my portfolio</p>
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                Full-Stack Developer & Security Researcher
              </h1>
              <p className="text-lg text-muted-foreground text-balance leading-relaxed">
                Crafting secure, performant web applications with expertise in frontend development, backend systems,
                and cybersecurity. Passionate about CTF competitions and web exploitation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#projects"
                className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Get In Touch
              </Link>
            </div>

            {/* Tech Stack */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind", "Python", "MySQL", "Security"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Code Block */}
          <div className="hidden md:block">
            <div className="bg-secondary/50 border border-border rounded-lg p-6 font-mono text-sm overflow-hidden">
              <div className="space-y-2 text-muted-foreground">
                <div>
                  <span className="text-accent">const</span> developer = {"{"}
                </div>
                <div className="ml-4">
                  <span className="text-primary">name</span>: <span className="text-green-400">"Your Name"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-primary">skills</span>: [<span className="text-green-400">"Frontend"</span>,{" "}
                  <span className="text-green-400">"Backend"</span>, <span className="text-green-400">"Security"</span>
                  ],
                </div>
                <div className="ml-4">
                  <span className="text-primary">passion</span>:{" "}
                  <span className="text-green-400">"Building secure web apps"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-primary">ctf</span>: <span className="text-blue-400">true</span>,
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
