import { Sidebar } from "@/components/layout/sidebar"
import { registry, type ComponentCategory } from "@/registry"

const CATEGORY_ORDER: ComponentCategory[] = [
    "Forms",
    "Data display",
    "Layout",
    "Navigation",
    "Overlay",
    "Feedback",
]

function groupByCategory(): Record<string, { title: string; href: string }[]> {
    const grouped: Record<string, { title: string; href: string }[]> = {}
    for (const slug of Object.keys(registry)) {
        const { name, category } = registry[slug]
        if (!grouped[category]) grouped[category] = []
        grouped[category].push({ title: name, href: `/components/${slug}` })
    }
    return grouped
}

export default function ComponentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const componentItemsByCategory = groupByCategory()

    return (
        <div className="container mx-auto px-4 pt-6 flex-1 items-stretch md:grid md:min-h-[calc(100vh-3.5rem)] md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 lg:pt-8">
            <Sidebar componentItemsByCategory={componentItemsByCategory} categoryOrder={CATEGORY_ORDER} />
            <main className="relative min-h-[calc(100vh-3.5rem)] pt-0 pb-6 lg:pb-8">
                <div className="mx-auto w-full min-w-0 glass rounded-xl pt-8 pb-6 px-6 lg:pt-10 lg:pb-8 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
