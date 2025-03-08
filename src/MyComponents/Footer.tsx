import React from "react"
import Link from "next/link"

interface FooterLink {
  name: string;
  href: string;
}

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

const footerLinks: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
]

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t bg-[#000000] text-white mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">YourLogo</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your company description goes here. A brief overview of what your organization does and its mission.
            </p>
          </div>

          {footerLinks.map((group, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}