// src/components/Navbar.tsx
"use client"
import React, { useEffect, useState } from "react";
import {Link, usePathname} from '@/i18n/navigation';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/modetoggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react"; // Import icons for menu toggle and language
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface RouteItem {
  title: string;
  href?: string;
  content?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export function Navbar(): React.ReactElement {
  const defaultRoute = { href: "/" }
  const t = useTranslations('NavBar');

  const routes: RouteItem[] = [
    {
      title: t('routes.home'),
      href: "/",
    },
    {
      title: t('routes.about'),
      href: "/about",
    },
    {
      title: t('routes.features.title'),
      content: [
        {
          title: t('routes.features.content.1.title'),
          href: "/features/1",
          description: t('routes.features.content.1.desc'),
        },
        {
          title: t('routes.features.content.2.title'),
          href: "/features/2",
          description: t('routes.features.content.2.desc'),
        },
        {
          title: t('routes.features.content.3.title'),
          href: "/features/3",
          description: t('routes.features.content.3.desc'),
        },
      ],
    },
    {
      title: t('routes.resources.title'),
      content: [
        {
          title: t('routes.resources.content.1.title'),
          href: "/docs",
          description: t('routes.resources.content.1.desc'),
        },
        {
          title: t('routes.resources.content.2.title'),
          href: "/blog",
          description: t('routes.resources.content.2.desc'),
        },
        {
          title: t('routes.resources.content.3.title'),
          href: "/help",
          description: t('routes.resources.content.3.desc'),
        },
      ],
    },
    {
      title: t('routes.contact'),
      href: "/contact",
    },
  ];

  interface Language {
    code: string;
    name: string;
    flag?: string;
  }

  const languages: Language[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "ar" },
  ];

  const locale = useLocale();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  const changeLanguage = (language: Language) => {
    if (language.code === locale) return;

    window.location.href  = `/${language.code}${pathname === '/' ? '' : pathname} `;
  };

  useEffect(() => {
    const matchedLanguage = languages.find(lang => lang.code === locale) || languages[0];
    setCurrentLanguage(matchedLanguage);
  }, [locale]);


  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white text-black dark:bg-[#000000] dark:text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left section: Logo and mobile menu toggle */}
        <div className="flex items-center gap-4">
          <Link href="/" draggable={false} className="flex items-center space-x-2">
            <Image src="/logoPlaceholder.png" alt="Logo" draggable={false} height={45} width={45} />
          </Link>
          
          {/* Mobile menu toggle button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Middle section: Desktop Navigation menu (hidden on mobile) */}
        <div className="hidden md:flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {routes.map((route, index) => {
                if (route.content) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-white text-black dark:bg-[#000000] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out">
                        {route.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white text-black dark:bg-[#000000] dark:text-white transition-transform duration-300">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-center">
                          {route.content.map((item, i) => (
                            <ListItem
                              key={i}
                              title={item.title}
                              href={item.href}
                            >
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={index}>
                    <Link href={route.href || defaultRoute.href} legacyBehavior passHref>
                      <NavigationMenuLink className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-3 py-2 rounded-md font-medium text-center">
                        {route.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Right section: Language switcher, Mode toggle and Avatar with dropdown */}
        <div className="flex items-center justify-end gap-4 pr-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline-block">{currentLanguage.flag}</span>
                <span className="sr-only">{t('labelSwitchLang')}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-950 text-black dark:text-white">
              <DropdownMenuLabel>{t('labelSelectLang')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((language) => (
                <DropdownMenuItem 
                  key={language.code}
                  className={cn(
                    "cursor-pointer flex items-center gap-2",
                    currentLanguage.code === language.code && "font-medium bg-gray-100 dark:bg-gray-800"
                  )}
                  onClick={() => changeLanguage(language)}
                >
                  <span className="text-base">{language.flag}</span>
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                  N/A
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-950 text-black dark:text-white">
              <DropdownMenuLabel>{t('dropdown.title')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">{t('dropdown.item1')}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">{t('dropdown.item2')}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">{t('dropdown.item3')}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">{t('dropdown.logout')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white dark:bg-gray-950 text-black dark:text-white border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        } overflow-hidden`}
      >
        <nav className="px-4 py-4 space-y-1">
          {/* Language Selector - Mobile View */}
          <div className="py-2">
            <p className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400">{t('labelLang')}</p>
            <div className="mt-1 grid grid-cols-2 gap-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-colors",
                    currentLanguage.code === language.code 
                      ? "bg-gray-100 dark:bg-gray-800 font-medium" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  )}
                  onClick={() => {
                    changeLanguage(language);
                  }}
                >
                  <span>{language.flag}</span> {language.name}
                </button>
              ))}
            </div>
            <div className="my-2 border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          {routes.map((route, index) => {
            if (route.content) {
              return (
                <div key={index} className="py-2">
                  <details className="group">
                    <summary className="font-medium py-2 px-3 cursor-pointer list-none flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                      {route.title}
                      <div className="transition-transform duration-300 group-open:rotate-180">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </summary>
                    <div className="pl-4 space-y-1 mt-1 transition-all duration-300 ease-in-out">
                      {route.content.map((item, i) => (
                        <Link 
                          key={i} 
                          href={item.href}
                          className="block py-2 px-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </details>
                </div>
              );
            }

            return (
              <Link 
                key={index} 
                href={route.href || defaultRoute.href}
                className="block py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-300 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white text-center",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400 text-center">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";