"use client"

import { useState } from "react"

interface Skill {
  name: string
  proficiency: number
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

interface Experience {
  title: string
  company: string
  period: string
  description: string
}

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", proficiency: 95 },
      { name: "Next.js", proficiency: 90 },
      { name: "TypeScript", proficiency: 88 },
      { name: "Tailwind CSS", proficiency: 92 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", proficiency: 85 },
      { name: "Python", proficiency: 82 },
      { name: "SQL", proficiency: 88 },
      { name: "REST APIs", proficiency: 90 },
    ],
  },
  {
    category: "Security",
    skills: [
      { name: "Web Security", proficiency: 87 },
      { name: "Penetration Testing", proficiency: 80 },
      { name: "Cryptography", proficiency: 78 },
      { name: "CTF Competitions", proficiency: 85 },
    ],
  },
]

const experiences: Experience[] = [
  {
    title: "Senior Full-Stack Developer",
    company: "Tech Company",
    period: "2022 - Present",
    description: "Led development of scalable web applications with focus on security and performance optimization.",
  },
  {
    title: "Full-Stack Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description: "Built responsive web applications and implemented backend systems for various clients.",
  },
  {
    title: "Junior Developer",
    company: "Startup",
    period: "2019 - 2020",
    description: "Developed frontend components and assisted with backend API development.",
  },
]

export default function SkillsExperience() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-mono uppercase tracking-widest mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">Skills & Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional experience across full-stack development
            and cybersecurity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Technical Skills</h3>

            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              {skillCategories.map((cat, idx) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === idx
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Skills List with Proficiency Bars */}
            <div className="space-y-6">
              {skillCategories[activeCategory].skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Professional Experience</h3>

            {/* Timeline */}
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={exp.title} className="relative pl-6 pb-6 border-l border-border last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full border-4 border-background" />

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-foreground">{exp.title}</h4>
                    <p className="text-sm text-accent font-mono">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
