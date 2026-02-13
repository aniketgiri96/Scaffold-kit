import Link from "next/link"
import { registry, type ComponentCategory } from "@/registry"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const CATEGORY_ORDER: ComponentCategory[] = [
    "Forms",
    "Data display",
    "Layout",
    "Navigation",
    "Overlay",
    "Feedback",
]

export default function ComponentsPage() {
    const byCategory = CATEGORY_ORDER.map((category) => ({
        category,
        entries: Object.entries(registry).filter(([, c]) => c.category === category),
    })).filter(({ entries }) => entries.length > 0)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                <p className="text-lg text-muted-foreground">
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                </p>
            </div>
            {byCategory.map(({ category, entries }) => (
                <section key={category}>
                    <h2 className="mb-4 text-xl font-semibold tracking-tight">{category}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {entries.map(([slug, component]) => (
                            <Link key={slug} href={`/components/${slug}`}>
                                <Card className="group relative overflow-hidden border-border bg-card backdrop-blur-lg transition-all hover:bg-accent/50 hover:border-primary/30">
                                    <CardHeader className="relative z-10 p-6">
                                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors tracking-tight">
                                            {component.name}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground/60 text-sm line-clamp-2">
                                            {component.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
