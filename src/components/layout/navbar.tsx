"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/examples", label: "Examples" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">DesignSystem</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="relative py-2 text-foreground/60 hover:text-foreground/80 transition-colors">
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {label}
                </motion.span>
                {pathname === href || (href !== "/" && pathname.startsWith(href)) ? (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
