import { notFound } from "next/navigation"
import { registry } from "@/registry"
import { ComponentPreview } from "@/components/component-preview"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    return Object.keys(registry).map((slug) => ({ slug }))
}

export default async function ComponentPage({ params }: PageProps) {
    const { slug } = await params
    const component = registry[slug]

    if (!component) {
        return notFound()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">{component.name}</h1>
                <p className="text-lg text-muted-foreground">{component.description}</p>
            </div>
            <ComponentPreview name={component.name} code={component.code}>
                {component.component}
            </ComponentPreview>
        </div>
    )
}
