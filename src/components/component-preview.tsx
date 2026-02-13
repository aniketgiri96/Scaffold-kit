"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    code: string
    align?: "center" | "start" | "end"
}

export function ComponentPreview({
    name,
    code,
    children,
    className,
    align = "center",
    ...props
}: ComponentPreviewProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        if (hasCopied) {
            const timer = setTimeout(() => setHasCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [hasCopied])

    return (
        <div
            className={cn("group relative my-4 flex flex-col space-y-2", className)}
            {...props}
        >
            <Tabs defaultValue="preview" className="relative mr-auto w-full">
                <div className="flex items-center justify-between pb-3">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="preview"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            Preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            Code
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="preview" className="relative rounded-md border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
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
                </TabsContent>
                <TabsContent value="code">
                    <div className="flex flex-col space-y-4">
                        <div className="relative w-full rounded-md border border-white/10 bg-black/40 backdrop-blur-xl [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-4 top-4 z-20 h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/20"
                                onClick={() => {
                                    navigator.clipboard.writeText(code)
                                    setHasCopied(true)
                                }}
                            >
                                {hasCopied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                                <span className="sr-only">Copy</span>
                            </Button>
                            <pre className="p-6 bg-black/60 rounded-md overflow-x-auto text-sm text-cyan-400 font-mono leading-relaxed selection:bg-cyan-500/30">
                                <code className="block">{code}</code>
                            </pre>
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
