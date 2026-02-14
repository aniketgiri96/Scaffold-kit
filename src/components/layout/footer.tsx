import Link from "next/link";

const footerLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/templates", label: "Templates" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full glass-strong border-t border-border [box-shadow:0_-1px_0_0_var(--border)]">
      <div className="container mx-auto px-4 max-w-screen-2xl py-6 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/"
              className="font-bold text-foreground hover:text-foreground/80 transition-colors"
            >
              DesignSystem
            </Link>
            <nav className="flex items-center gap-6 text-muted-foreground">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-foreground/80 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="text-sm text-muted-foreground">
            © {year} Design System Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
