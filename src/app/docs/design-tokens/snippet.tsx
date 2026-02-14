"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { DESIGN_TOKENS_CSS } from "@/registry/design-tokens";

export function DesignTokensSnippet() {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const t = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [hasCopied]);

  const copy = () => {
    void navigator.clipboard.writeText(DESIGN_TOKENS_CSS);
    setHasCopied(true);
  };

  return (
    <div className="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50">
        <span className="text-xs font-mono text-muted-foreground">globals.css</span>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={copy}>
          {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto max-h-[420px] overflow-y-auto">
        <code className="text-foreground">{DESIGN_TOKENS_CSS}</code>
      </pre>
    </div>
  );
}
