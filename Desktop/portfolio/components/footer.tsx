import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold text-accent inline-block">
              {"<dev />"}
            </Link>
            <p className="text-sm text-muted-foreground">
              Full-stack developer and security researcher crafting secure, performant web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved. Built with Next.js and Tailwind CSS.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <span className="sr-only">GitHub</span>
                <span>GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <span className="sr-only">LinkedIn</span>
                <span>LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <span>Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
