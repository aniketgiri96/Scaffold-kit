"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/templates", label: "Templates" },
  { href: "/examples", label: "Examples" },
] as const;

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-8 text-sm font-medium">
      {navLinks.map(({ href, label }) => {
        const isActive =
          pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={cn(
              "relative py-2 text-muted-foreground transition-colors hover:text-foreground",
              isActive && "text-foreground",
              "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-200 after:content-[''] hover:after:w-full",
              isActive && "after:w-full"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          DesignSystem
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLinks />
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button asChild size="default">
              <Link href="/components">Get started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="w-full">
                  <Link href="/components" onClick={() => setOpen(false)}>
                    Get started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
