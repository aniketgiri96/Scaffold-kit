"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useSpring, useTransform } from "motion/react"
import { BookOpen, LayoutGrid, Brain, FileText, Bot, Palette } from "lucide-react"
import { docsConfig } from "@/config/docs"
import { cn, slugifyCategory } from "@/lib/utils"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
    componentItemsByCategory?: Record<string, { title: string; href: string }[]>
    categoryOrder?: string[]
    mlItemsByCategory?: Record<string, { title: string; href: string }[]>
    mlCategoryOrder?: string[]
}

const dockItemTransition = { type: "spring" as const, stiffness: 400, damping: 25 }

function DockLink({
    href,
    title,
    isActive,
    children,
}: {
    href: string
    title: string
    isActive: boolean
    children: React.ReactNode
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={dockItemTransition}
                    className="origin-left"
                >
                    <Link
                        href={href}
                        className={cn(
                            "flex w-full items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm transition-colors",
                            isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                    >
                        {children}
                    </Link>
                </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
                {title}
            </TooltipContent>
        </Tooltip>
    )
}

function DockLinkPlain({
    href,
    title,
    isActive,
    children,
}: {
    href: string
    title: string
    isActive: boolean
    children: React.ReactNode
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={dockItemTransition}
                    className="origin-left"
                >
                    <Link
                        href={href}
                        className={cn(
                            "flex w-full items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm transition-colors",
                            isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                    >
                        {children}
                    </Link>
                </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
                {title}
            </TooltipContent>
        </Tooltip>
    )
}

export function Sidebar({
    componentItemsByCategory = {},
    categoryOrder = [],
    mlItemsByCategory = {},
    mlCategoryOrder = [],
}: SidebarProps) {
    const pathname = usePathname()
    const scrollProgress = useScrollProgress()
    const springProgress = useSpring(0, { stiffness: 120, damping: 24 })
    const indicatorTop = useTransform(springProgress, (v) => `${v * 100}%`)

    // Sync scroll progress to spring for smooth timeline indicator
    useEffect(() => {
        springProgress.set(scrollProgress)
    }, [scrollProgress, springProgress])

    const sidebarNav = docsConfig.sidebarNav.map((section) => {
        if (section.title === "Components" && categoryOrder.length > 0) {
            const categories = categoryOrder
                .filter((cat) => componentItemsByCategory[cat]?.length)
                .map((cat) => ({ title: cat, items: componentItemsByCategory[cat] ?? [] }))
            return { ...section, items: [] as { title: string; href: string }[], categories }
        }
        if (section.title === "ML" && mlCategoryOrder.length > 0) {
            const categories = mlCategoryOrder
                .filter((cat) => mlItemsByCategory[cat]?.length)
                .map((cat) => ({ title: cat, items: mlItemsByCategory[cat] ?? [] }))
            return { ...section, items: [] as { title: string; href: string }[], categories }
        }
        return { ...section, items: section.items ?? [], categories: null as null }
    })

    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
            <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-hidden rounded-r-2xl border-l-0 border-t-0 border-b-0 border-r border-border glass-strong">
                {/* Scroll timeline track — slick line */}
                <div
                    className="absolute left-4 top-6 bottom-6 w-px bg-muted/70"
                    aria-hidden
                />
                <motion.div
                    className="absolute left-4 z-10 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-primary"
                    style={{ top: indicatorTop }}
                    aria-hidden
                />
                <div className="h-full overflow-y-auto py-6 pl-4 pr-3 lg:py-8 lg:pl-5 lg:pr-4">
                    {sidebarNav.map((item, index) => (
                        <div key={index} className="pb-6">
                            {"href" in item && item.href ? (
                                <DockLink
                                    href={item.href}
                                    title={item.title}
                                    isActive={pathname === item.href}
                                >
                                    {item.title === "Getting Started" && (
                                        <BookOpen className="h-4 w-4 shrink-0" />
                                    )}
                                    {item.title === "Components" && (
                                        <LayoutGrid className="h-4 w-4 shrink-0" />
                                    )}
                                    {item.title === "ML" && (
                                        <Brain className="h-4 w-4 shrink-0" />
                                    )}
                                    <span className="truncate">{item.title}</span>
                                </DockLink>
                            ) : (
                                <h4 className="mb-2 flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    {item.title}
                                </h4>
                            )}
                            {item.categories ? (
                                item.categories.map((cat) => {
                                    const sectionBasePath =
                                        item.title === "Components" ? "/components" : "/ml"
                                    const categoryHref = `${sectionBasePath}#${slugifyCategory(cat.title)}`
                                    return (
                                        <div key={cat.title} className="mt-3">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                transition={dockItemTransition}
                                                className="origin-left"
                                            >
                                                <Link
                                                    href={categoryHref}
                                                    className={cn(
                                                        "mb-1.5 block rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                                                        pathname === sectionBasePath
                                                            ? "text-foreground hover:bg-muted/50"
                                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                    )}
                                                >
                                                    {cat.title}
                                                </Link>
                                            </motion.div>
                                            <div className="mt-1 space-y-0.5">
                                                {cat.items.map((linkItem) => (
                                                    <DockLinkPlain
                                                        key={linkItem.href}
                                                        href={linkItem.href}
                                                        title={linkItem.title}
                                                        isActive={pathname === linkItem.href}
                                                    >
                                                        <span className="truncate">
                                                            {linkItem.title}
                                                        </span>
                                                    </DockLinkPlain>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : item.items?.length ? (
                                <div className="mt-2 space-y-0.5">
                                    {item.items.map((linkItem) => {
                                        const icon =
                                            linkItem.title === "Introduction" ? (
                                                <FileText className="h-4 w-4 shrink-0" />
                                            ) : linkItem.title === "For AI developers" ? (
                                                <Bot className="h-4 w-4 shrink-0" />
                                            ) : linkItem.title === "Design tokens" ? (
                                                <Palette className="h-4 w-4 shrink-0" />
                                            ) : null
                                        return (
                                            <DockLink
                                                key={linkItem.href}
                                                href={linkItem.href}
                                                title={linkItem.title}
                                                isActive={pathname === linkItem.href}
                                            >
                                                {icon}
                                                <span className="truncate">
                                                    {linkItem.title}
                                                </span>
                                            </DockLink>
                                        )
                                    })}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </aside>
        </TooltipProvider>
    )
}
