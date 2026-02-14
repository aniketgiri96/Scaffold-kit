"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  code: string;
  align?: "center" | "start" | "end";
  /** Shadcn CLI slug for primitives (e.g. "button"). Builds command: npx scaffold add <slug>. */
  cliSlug?: string;
  /** Full CLI command when using namespaced registries (e.g. "npx scaffold add @templates/chat-message-row"). Takes precedence over cliSlug when set. */
  cliInstallCommand?: string;
}

const tabContentMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export function ComponentPreview({
  name,
  code,
  children,
  className,
  align = "center",
  cliSlug,
  cliInstallCommand,
  ...props
}: ComponentPreviewProps) {
  const cliCommand = cliInstallCommand ?? (cliSlug ? `npx scaffold add ${cliSlug}` : undefined);
  const [hasCopied, setHasCopied] = React.useState(false);
  const [hasCliCopied, setHasCliCopied] = React.useState(false);
  const [tab, setTab] = React.useState("preview");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  React.useEffect(() => {
    if (hasCliCopied) {
      const timer = setTimeout(() => setHasCliCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCliCopied]);

  const previewBox = (
    <div
      className="relative border border-border bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm ring-1 ring-white/5 dark:ring-white/10 hover:border-primary/20 hover:shadow-[0_0_24px_var(--glow-primary)] transition-all duration-300"
      style={{ borderRadius: "1.25rem" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className={cn(
          "relative preview flex min-h-[350px] w-full justify-center p-10 z-10",
          {
            "items-center": align === "center",
            "items-start": align === "start",
            "items-end": align === "end",
          }
        )}
      >
        {children}
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <div
        className={cn("group relative my-4 flex flex-col space-y-2", className)}
        {...props}
      >
        <div className="relative mr-auto w-full">
          <div className="flex items-center justify-between pb-3">
            <div className="inline-flex w-full justify-start rounded-lg border-b bg-transparent p-0" role="tablist">
              <span className="relative h-9 rounded-md border-b-2 border-b-primary bg-transparent px-4 pb-3 pt-2 font-semibold text-foreground shadow-none">
                Preview
              </span>
              <span className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none">
                Code
              </span>
            </div>
          </div>
          <div className="relative mt-0">{previewBox}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs value={tab} onValueChange={setTab} className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-lg border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-md border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" forceMount className="relative mt-0 data-[state=inactive]:hidden">
          <AnimatePresence mode="wait">
            {tab === "preview" && (
              <motion.div
                key="preview"
                {...tabContentMotion}
                className="relative border border-border bg-card/80 backdrop-blur-xl overflow-hidden shadow-sm ring-1 ring-white/5 dark:ring-white/10 hover:border-primary/20 hover:shadow-[0_0_24px_var(--glow-primary)] transition-all duration-300"
                style={{ borderRadius: "1.25rem" }}
              >
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                <div
                  className={cn(
                    "relative preview flex min-h-[350px] w-full justify-center p-10 z-10",
                    {
                      "items-center": align === "center",
                      "items-start": align === "start",
                      "items-end": align === "end",
                    }
                  )}
                >
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="code" forceMount className="relative mt-0 data-[state=inactive]:hidden">
          <AnimatePresence mode="wait">
            {tab === "code" && (
              <motion.div key="code" {...tabContentMotion} className="flex flex-col space-y-4">
                {cliCommand && (
                  <div
                  className="flex items-center gap-3 border border-border bg-muted/60 px-4 py-2.5"
                  style={{ borderRadius: "1rem" }}
                >
                    <span className="text-sm text-muted-foreground">Install with CLI:</span>
                    <code className="flex-1 font-mono text-sm text-foreground break-all">
                      {cliCommand}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 shrink-0 text-primary hover:text-primary/80 hover:bg-primary/20"
                      onClick={() => {
                        navigator.clipboard.writeText(cliCommand);
                        setHasCliCopied(true);
                      }}
                    >
                      {hasCliCopied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy CLI command</span>
                    </Button>
                  </div>
                )}
                <div
                  className="relative w-full overflow-hidden border border-border bg-muted [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
                  style={{ borderRadius: "1.25rem" }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-4 z-20 h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/20"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      setHasCopied(true);
                    }}
                  >
                    {hasCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy</span>
                  </Button>
                  <pre className="p-6 bg-muted/80 overflow-x-auto text-sm text-foreground font-mono leading-relaxed selection:bg-primary/20 selection:text-foreground">
                    <code className="block">{code}</code>
                  </pre>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
