"use client"

import { useState } from "react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    image: "/ecommerce-dashboard.png",
    technologies: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "2",
    title: "Security Audit Tool",
    description:
      "Automated web application security scanner that identifies OWASP Top 10 vulnerabilities with detailed reports.",
    image: "/security-scanning-tool-interface.jpg",
    technologies: ["Python", "Flask", "React", "Security"],
    category: "Security",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3",
    title: "Real-Time Chat Application",
    description: "WebSocket-based chat platform with end-to-end encryption, user authentication, and message history.",
    image: "/chat-application-interface.png",
    technologies: ["Next.js", "WebSocket", "Node.js", "MongoDB"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "4",
    title: "Vulnerability Database",
    description:
      "Comprehensive database of known vulnerabilities with search, filtering, and detailed technical analysis.",
    image: "/database-interface-vulnerability.jpg",
    technologies: ["React", "GraphQL", "Node.js", "PostgreSQL"],
    category: "Security",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with data visualization, custom reports, and performance metrics.",
    image: "/analytics-dashboard-charts.png",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "6",
    title: "API Rate Limiter",
    description:
      "Distributed rate limiting service with Redis backend, supporting multiple strategies and real-time monitoring.",
    image: "/api-rate-limiter-monitoring.jpg",
    technologies: ["Node.js", "Redis", "TypeScript", "Docker"],
    category: "Backend",
    liveUrl: "#",
    githubUrl: "#",
  },
]

const categories = ["All", ...new Set(projects.map((p) => p.category))]

export default function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-mono uppercase tracking-widest mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in full-stack development, security, and innovative
            solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-background border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-secondary text-xs text-muted-foreground rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      className="flex-1 px-3 py-2 bg-accent text-accent-foreground text-sm font-medium rounded hover:bg-accent/90 transition-colors text-center"
                    >
                      Live Demo
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      className="flex-1 px-3 py-2 border border-border text-foreground text-sm font-medium rounded hover:bg-secondary transition-colors text-center"
                    >
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
