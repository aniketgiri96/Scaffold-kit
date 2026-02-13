import Link from "next/link"
import { registry } from "@/registry"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ComponentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                <p className="text-lg text-muted-foreground">
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(registry).map(([slug, component]) => (
                    <Link key={slug} href={`/components/${slug}`}>
                        <Card className="group relative overflow-hidden border-white/5 bg-black/20 backdrop-blur-lg transition-all hover:bg-black/30 hover:border-primary/30">
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
        </div>
    )
}
