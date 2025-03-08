// src/components/Navbar.tsx
"use client"
import React, { useState } from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/modetoggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // Import icons for menu toggle

interface RouteItem {
  title: string;
  href?: string;
  content?: {
    title: string;
    href: string;
    description: string;
  }[];
}

const routes: RouteItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Features",
    content: [
      {
        title: "Feature 1",
        href: "/features/1",
        description: "Description for feature 1",
      },
      {
        title: "Feature 2",
        href: "/features/2",
        description: "Description for feature 2",
      },
      {
        title: "Feature 3",
        href: "/features/3",
        description: "Description for feature 3",
      },
    ],
  },
  {
    title: "Resources",
    content: [
      {
        title: "Documentation",
        href: "/docs",
        description: "Technical documentation and guides",
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Latest news and articles",
      },
      {
        title: "Help Center",
        href: "/help",
        description: "Support resources and FAQs",
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export function Navbar(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white text-black dark:bg-[#000000] dark:text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left section: Logo and mobile menu toggle */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">YourLogo</span>
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
                    <Link href={route.href} legacyBehavior passHref>
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
        
        {/* Right section: Mode toggle and Avatar with dropdown */}
        <div className="flex items-center justify-end gap-4 pr-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                  US
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-950 text-black dark:text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
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
                href={route.href} 
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