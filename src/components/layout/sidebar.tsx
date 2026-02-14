"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn, slugifyCategory } from "@/lib/utils"

interface SidebarProps {
    componentItemsByCategory?: Record<string, { title: string; href: string }[]>
    categoryOrder?: string[]
    mlItemsByCategory?: Record<string, { title: string; href: string }[]>
    mlCategoryOrder?: string[]
}

export function Sidebar({
    componentItemsByCategory = {},
    categoryOrder = [],
    mlItemsByCategory = {},
    mlCategoryOrder = [],
}: SidebarProps) {
    const pathname = usePathname()

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
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block glass-strong border-l-0 border-t-0 border-b-0 border-r border-border rounded-r-xl">
            <div className="h-full overflow-y-auto pt-8 pb-6 px-6 lg:pt-10 lg:pb-8 lg:px-8">
                {sidebarNav.map((item, index) => (
                    <div key={index} className="pb-4">
                        {"href" in item && item.href ? (
                            <Link
                                href={item.href}
                                className="mb-1 block rounded-md px-2 py-1 text-sm font-semibold hover:underline"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                                {item.title}
                            </h4>
                        )}
                        {item.categories ? (
                            item.categories.map((cat) => {
                                const sectionBasePath =
                                    item.title === "Components" ? "/components" : "/ml"
                                const categoryHref = `${sectionBasePath}#${slugifyCategory(cat.title)}`
                                return (
                                    <div key={cat.title} className="mt-2">
                                        <Link
                                            href={categoryHref}
                                            className={cn(
                                                "mb-1 block px-2 py-0.5 text-xs font-medium uppercase tracking-wider hover:underline",
                                                pathname === sectionBasePath
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {cat.title}
                                        </Link>
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
                                )
                            })
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
