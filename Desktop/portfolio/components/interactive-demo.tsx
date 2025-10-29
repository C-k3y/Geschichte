"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function InteractiveTools() {
  const [activeTab, setActiveTab] = useState("password")
  const [copied, setCopied] = useState(false)

  // Password Strength Checker
  const [password, setPassword] = useState("")
  const getPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z\d]/.test(pwd)) strength++
    return strength
  }
  const passwordStrength = getPasswordStrength(password)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
  ]

  // Color Palette Generator
  const [baseColor, setBaseColor] = useState("#10b981")
  const generatePalette = (hex: string) => {
    const colors = [hex]
    for (let i = 1; i < 5; i++) {
      const h = Number.parseInt(hex.slice(1, 3), 16)
      const s = Number.parseInt(hex.slice(3, 5), 16)
      const l = Number.parseInt(hex.slice(5, 7), 16)
      const newL = Math.max(0, Math.min(255, l + (i - 2) * 30))
      colors.push(
        `#${h.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}${newL.toString(16).padStart(2, "0")}`,
      )
    }
    return colors
  }
  const palette = generatePalette(baseColor)

  // JSON Formatter
  const [jsonInput, setJsonInput] = useState('{\n  "name": "Developer",\n  "skills": ["React", "TypeScript"]\n}')
  const [jsonError, setJsonError] = useState("")
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonError("")
      return JSON.stringify(parsed, null, 2)
    } catch (e) {
      setJsonError("Invalid JSON")
      return jsonInput
    }
  }
  const formattedJson = formatJson()

  // Algorithm Visualizer - Bubble Sort
  const [numbers, setNumbers] = useState([64, 34, 25, 12, 22, 11, 90])
  const [sorting, setSorting] = useState(false)
  const [sortedIndices, setSortedIndices] = useState<number[]>([])

  const bubbleSort = async () => {
    setSorting(true)
    const arr = [...numbers]
    const sorted: number[] = []

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setNumbers([...arr])
          await new Promise((resolve) => setTimeout(resolve, 300))
        }
      }
      sorted.push(arr.length - i - 1)
      setSortedIndices([...sorted])
    }
    setSorting(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tools = [
    {
      id: "password",
      name: "Password Strength",
      icon: "🔐",
    },
    {
      id: "color",
      name: "Color Palette",
      icon: "🎨",
    },
    {
      id: "json",
      name: "JSON Formatter",
      icon: "{ }",
    },
    {
      id: "sort",
      name: "Algorithm Viz",
      icon: "⚡",
    },
  ]

  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-sm font-mono uppercase tracking-widest mb-4">Interactive Tools</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">Hands-On Demos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore interactive tools that showcase problem-solving, frontend skills, and technical expertise.
          </p>
        </div>

        {/* Tool Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === tool.id
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <span>{tool.icon}</span>
              {tool.name}
            </button>
          ))}
        </div>

        {/* Tool Content */}
        <div className="bg-secondary/50 border border-border rounded-lg p-8 backdrop-blur-sm">
          {/* Password Strength Checker */}
          {activeTab === "password" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Enter a password to test:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type something..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Strength:</span>
                  <span className={`text-sm font-bold ${passwordStrength >= 4 ? "text-green-500" : "text-orange-500"}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${strengthColors[passwordStrength]}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>✓ Length: {password.length >= 8 ? "8+" : "< 8"}</div>
                <div>✓ Numbers: {/\d/.test(password) ? "Yes" : "No"}</div>
                <div>✓ Uppercase: {/[A-Z]/.test(password) ? "Yes" : "No"}</div>
                <div>✓ Special: {/[^a-zA-Z\d]/.test(password) ? "Yes" : "No"}</div>
              </div>
            </div>
          )}

          {/* Color Palette Generator */}
          {activeTab === "color" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Base Color:</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer border border-border"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground font-mono text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {palette.map((color, i) => (
                  <div key={i} className="space-y-2 cursor-pointer" onClick={() => copyToClipboard(color)}>
                    <div
                      className="w-full h-24 rounded-lg border border-border transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs text-center font-mono text-muted-foreground hover:text-foreground">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JSON Formatter */}
          {activeTab === "json" && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Input:</label>
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Formatted Output:</label>
                  <div className="relative">
                    <pre className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg text-foreground font-mono text-sm overflow-auto">
                      {jsonError ? <span className="text-red-500">{jsonError}</span> : formattedJson}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(formattedJson)}
                      className="absolute top-2 right-2 p-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Algorithm Visualizer */}
          {activeTab === "sort" && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <button
                  onClick={bubbleSort}
                  disabled={sorting}
                  className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
                >
                  {sorting ? "Sorting..." : "Start Bubble Sort"}
                </button>
                <button
                  onClick={() => {
                    setNumbers([64, 34, 25, 12, 22, 11, 90])
                    setSortedIndices([])
                  }}
                  disabled={sorting}
                  className="px-6 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-end justify-center gap-2 h-48 bg-background border border-border rounded-lg p-6">
                {numbers.map((num, i) => (
                  <div
                    key={i}
                    className={`transition-all ${sortedIndices.includes(i) ? "bg-green-500" : "bg-accent"} rounded-t`}
                    style={{
                      height: `${(num / 100) * 100}%`,
                      width: `${100 / numbers.length}%`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Watch as the algorithm sorts the bars in real-time. Green indicates sorted elements.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
