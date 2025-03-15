import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import GradientText from "./GradientText";

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
];

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white text-black dark:bg-[#000000] dark:text-white mt-auto">
      <div className="container mx-auto py-10 text-center px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-center">
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 justify-center"
            >
              <span className="text-lg font-bold">YourLogo</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your company description goes here. A brief overview of what your
              organization does and its mission.
            </p>
          </div>

          {footerLinks.map((group, i) => (
            <div key={i} className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, j) => (
                  <li key={j} className="text-center">
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 transition-colors hover:text-black dark:hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:justify-center">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/CodeWithAli-Co"
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                GitHub
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-row items-center justify-center gap-2 block  justify-center">
            {/* CodeWithAli Branding - Same Line */}
            {/* <div className="mt-10 flex flex-col items-center justify-center"> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="https://codewithali.com/" target="_blank">
              <Image
                src="/codewithali.png"
                className="h-12 w-auto mix-blend-screen isolate"
                alt="CodeWithAli Logo"
                draggable={false}
                width={120}
                height={40}
              />
            </Link>

            <p className="text-slate-400 text-md">
              <Link
                href="https://codewithali.com/"
                draggable={false}
                target="_blank"
                className="font-semiboldm text-gray-600 text-sm"
              >
                Designed By <GradientText>CodeWithAli</GradientText>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
