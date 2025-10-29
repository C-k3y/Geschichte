import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import SkillsExperience from "@/components/skills-experience"
import CTFShowcase from "@/components/ctf-showcase"
import ProjectsGallery from "@/components/projects-gallery"
import InteractiveDemo from "@/components/interactive-demo"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <SkillsExperience />
      <CTFShowcase />
      <ProjectsGallery />
      <InteractiveDemo />
      <ContactSection />
      <Footer />
    </main>
  )
}
