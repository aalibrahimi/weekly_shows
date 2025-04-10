import React from "react";
import { useTranslations } from "next-intl";
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

export function Footer(): React.ReactElement {
  const t = useTranslations('Footer')

  const footerLinks: FooterGroup[] = [
    {
      title: t('nav.company.title'),
      links: [
        { name: t('nav.company.links.1'), href: "/about" },
        { name: t('nav.company.links.2'), href: "/careers" },
        { name: t('nav.company.links.3'), href: "/contact" },
      ],
    },
    {
      title: t('nav.resources.title'),
      links: [
        { name: t('nav.resources.links.1'), href: "/blog" },
        { name: t('nav.resources.links.2'), href: "/docs" },
        { name: t('nav.resources.links.3'), href: "/help" },
      ],
    },
    {
      title: t('nav.legal.title'),
      links: [
        { name: t('nav.legal.links.1'), href: "/privacy" },
        { name: t('nav.legal.links.2'), href: "/terms" },
        { name: t('nav.legal.links.3'), href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-amber-100 text-black dark:bg-[#000000] dark:text-white mt-auto">
      <div className="container mx-auto py-10 text-center px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-center">
          <div className="flex flex-col items-center">
            <Link href="/" draggable={false} className="flex items-center space-x-2 justify-center">
              <Image src="/logoPlaceholder.png" alt="Logo" draggable={false} height={45} width={45} />
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t('compDesc')}
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
              © {new Date().getFullYear()} {t('rights')}
            </p>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com/CodeWithAli-Co" draggable={false} target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                {t('customLink')}
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-row items-center justify-center gap-2">
            {/* CodeWithAli Branding - Same Line */}
            {/* <div className="mt-10 flex flex-col items-center justify-center"> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="https://codewithali.com/" draggable={false} target="_blank">
              <Image
                src="/codewithali.png"
                className="w-auto isolate"
                alt="CodeWithAli Logo"
                draggable={false}
                width={30}
                height={30}
                quality={100}
              />
            </Link>

            <p className="text-slate-400 text-md">
              <Link
                href="https://codewithali.com/"
                draggable={false}
                target="_blank"
                className="font-semiboldm text-gray-600 text-sm"
              >
                {t('cwaMark')} <GradientText>CodeWithAli</GradientText>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
