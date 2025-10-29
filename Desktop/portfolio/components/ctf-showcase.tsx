"use client"

import { useState } from "react"

interface CTFCompetition {
  name: string
  rank: string
  date: string
  score: number
  badge: string
}

interface SecurityAchievement {
  title: string
  description: string
  icon: string
  color: string
}

const ctfCompetitions: CTFCompetition[] = [
  {
    name: "HackTheBox",
    rank: "Pro Hacker",
    date: "2024",
    score: 2850,
    badge: "🎯",
  },
  {
    name: "TryHackMe",
    rank: "Top 1%",
    date: "2024",
    score: 3200,
    badge: "⭐",
  },
  {
    name: "OWASP WebGoat",
    rank: "Completed",
    date: "2023",
    score: 100,
    badge: "🔐",
  },
  {
    name: "PicoCTF",
    rank: "Gold Medal",
    date: "2023",
    score: 4500,
    badge: "🏆",
  },
]

const achievements: SecurityAchievement[] = [
  {
    title: "Web Application Security",
    description: "Expert in OWASP Top 10, SQL injection, XSS, CSRF, and authentication vulnerabilities.",
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Penetration Testing",
    description: "Proficient in network reconnaissance, vulnerability assessment, and exploitation techniques.",
    icon: "🔍",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Cryptography",
    description: "Understanding of encryption algorithms, hashing, digital signatures, and secure protocols.",
    icon: "🔑",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Incident Response",
    description: "Experience in identifying, analyzing, and responding to security incidents and threats.",
    icon: "🚨",
    color: "from-orange-500 to-red-500",
  },
]

export default function CTFShowcase() {
  const [selectedCompetition, setSelectedCompetition] = useState(0)

  return (
    <section id="ctf" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-mono uppercase tracking-widest mb-4">Cybersecurity</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">CTF & Security Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Competitive CTF participation and cybersecurity expertise demonstrated through real-world challenges and
            certifications.
          </p>
        </div>

        {/* CTF Competitions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Competition Rankings</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Competition List */}
            <div className="space-y-3">
              {ctfCompetitions.map((comp, idx) => (
                <button
                  key={comp.name}
                  onClick={() => setSelectedCompetition(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedCompetition === idx
                      ? "bg-accent/10 border-accent"
                      : "bg-secondary/50 border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground">{comp.name}</p>
                      <p className="text-sm text-muted-foreground">{comp.rank}</p>
                    </div>
                    <span className="text-2xl">{comp.badge}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Competition Details */}
            <div className="bg-secondary/50 border border-border rounded-lg p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Competition</p>
                  <p className="text-3xl font-bold text-accent">{ctfCompetitions[selectedCompetition].name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rank</p>
                    <p className="text-xl font-bold">{ctfCompetitions[selectedCompetition].rank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Score</p>
                    <p className="text-xl font-bold text-accent">{ctfCompetitions[selectedCompetition].score}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                  <p className="text-lg font-medium">{ctfCompetitions[selectedCompetition].date}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Demonstrated expertise in vulnerability identification and exploitation techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Achievements */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Security Expertise</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="bg-secondary/50 border border-border rounded-lg p-6 hover:border-accent/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
