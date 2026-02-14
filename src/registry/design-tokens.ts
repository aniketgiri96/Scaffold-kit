/**
 * Design tokens as copy-paste CSS. Used by GET /api/tokens and the Design tokens doc page.
 */

export const DESIGN_TOKENS_CSS = `/* Design system tokens – paste into your globals.css or a root stylesheet */

:root {
  --background: hsl(230 25% 98%);
  --foreground: hsl(230 50% 10%);
  --card: hsl(230 25% 100% / 0.8);
  --card-foreground: hsl(230 50% 10%);
  --popover: hsl(230 25% 100% / 0.9);
  --popover-foreground: hsl(230 50% 10%);
  --primary: hsl(175 70% 42%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(230 25% 90%);
  --secondary-foreground: hsl(230 50% 10%);
  --muted: hsl(230 25% 95%);
  --muted-foreground: hsl(230 20% 40%);
  --accent: hsl(175 70% 95%);
  --accent-foreground: hsl(175 70% 35%);
  --destructive: hsl(0 84% 60%);
  --destructive-foreground: hsl(0 0% 100%);
  --border: hsl(230 25% 90%);
  --input: hsl(230 25% 90%);
  --ring: hsl(175 70% 42%);
  --radius: 0.75rem;
  --glow-primary: hsla(175, 70%, 42%, 0.22);
  --glass-bg: hsl(230 25% 100% / 0.65);
  --glass-border: rgba(255, 255, 255, 0.35);
  --glass-blur: 12px;
}

.dark {
  --background: hsl(230 40% 4%);
  --foreground: hsl(210 20% 98%);
  --card: hsl(230 40% 6% / 0.7);
  --card-foreground: hsl(210 20% 98%);
  --popover: hsl(230 40% 6% / 0.9);
  --popover-foreground: hsl(210 20% 98%);
  --primary: hsl(175 65% 48%);
  --primary-foreground: hsl(230 40% 4%);
  --secondary: hsl(230 30% 12%);
  --secondary-foreground: hsl(210 20% 98%);
  --muted: hsl(230 30% 12%);
  --muted-foreground: hsl(230 15% 70%);
  --accent: hsl(175 65% 15% / 0.3);
  --accent-foreground: hsl(175 65% 70%);
  --destructive: hsl(0 84% 60%);
  --destructive-foreground: hsl(210 20% 98%);
  --border: hsl(230 30% 20%);
  --input: hsl(230 30% 20%);
  --ring: hsl(175 65% 48%);
  --glow-primary: hsla(175, 65%, 48%, 0.2);
  --glass-bg: hsl(230 40% 6% / 0.65);
  --glass-border: rgba(255, 255, 255, 0.1);
}

/* Optional: glass utility used by many templates */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
}
`;
