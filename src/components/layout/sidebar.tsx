"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

interface SidebarProps {
    componentItemsByCategory?: Record<string, { title: string; href: string }[]>
    categoryOrder?: string[]
}

export function Sidebar({ componentItemsByCategory = {}, categoryOrder = [] }: SidebarProps) {
    const pathname = usePathname()

    const sidebarNav = docsConfig.sidebarNav.map((section) => {
        if (section.title !== "Components" || categoryOrder.length === 0) {
            return { ...section, items: section.items ?? [], categories: null as null }
        }
        const categories = categoryOrder
            .filter((cat) => componentItemsByCategory[cat]?.length)
            .map((cat) => ({ title: cat, items: componentItemsByCategory[cat] ?? [] }))
        return { ...section, items: [], categories }
    })

    return (
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-border bg-muted/30 backdrop-blur-lg">
            <div className="h-full overflow-y-auto py-6 pr-6 lg:py-12 pl-8">
                {sidebarNav.map((item, index) => (
                    <div key={index} className="pb-4">
                        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                            {item.title}
                        </h4>
                        {item.categories ? (
                            item.categories.map((cat) => (
                                <div key={cat.title} className="mt-2">
                                    <h5 className="mb-1 px-2 py-0.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        {cat.title}
                                    </h5>
                                    <div className="grid grid-flow-row auto-rows-max text-sm">
                                        {cat.items.map((linkItem) => (
                                            <Link
                                                key={linkItem.href}
                                                href={linkItem.href}
                                                className={cn(
                                                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                                                    pathname === linkItem.href
                                                        ? "font-medium text-foreground"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {linkItem.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : item.items?.length ? (
                            <div className="grid grid-flow-row auto-rows-max text-sm">
                                {item.items.map((linkItem) => (
                                    <Link
                                        key={linkItem.href}
                                        href={linkItem.href}
                                        className={cn(
                                            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                                            pathname === linkItem.href
                                                ? "font-medium text-foreground"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {linkItem.title}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </aside>
    )
}
