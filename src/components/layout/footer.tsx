export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full overflow-hidden">
      <div className="relative container mx-auto px-4 max-w-screen-2xl py-12 md:py-16">
        {/* Background brand text (antigravity style) - straight alignment */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display font-bold tracking-tighter text-foreground/[0.06] text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]"
        >
          SCAFFOLD
        </span>

        {/* Foreground: copyright only */}
        <div className="relative z-10 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {year} Scaffold. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
