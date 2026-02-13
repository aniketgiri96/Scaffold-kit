"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-white/5 bg-black/10 backdrop-blur-lg">
            <div className="h-full overflow-y-auto py-6 pr-6 lg:py-12 pl-8">
                {docsConfig.sidebarNav.map((item, index) => (
                    <div key={index} className="pb-4">
                        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                            {item.title}
                        </h4>
                        {item.items?.length && (
                            <div className="grid grid-flow-row auto-rows-max text-sm">
                                {item.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                                            pathname === item.href
                                                ? "font-medium text-foreground"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    )
}
