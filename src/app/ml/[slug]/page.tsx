import Link from "next/link";
import { notFound } from "next/navigation";
import { mlRegistry } from "@/registry/ml-registry";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentDetailMotion } from "@/components/component-detail-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(mlRegistry).map((slug) => ({ slug }));
}

export default async function MLSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = mlRegistry[slug];

  if (!entry) {
    return notFound();
  }

  return (
    <ComponentDetailMotion>
      <Button variant="ghost" size="sm" className="-ml-2 mb-2" asChild>
        <Link
          href="/ml"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to ML
        </Link>
      </Button>
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {entry.name}
        </h1>
        <p className="text-lg text-muted-foreground">{entry.description}</p>
      </div>
      <ComponentPreview name={entry.name} code={entry.code}>
        {entry.component}
      </ComponentPreview>
      {entry.examples?.map((example) => (
        <div key={example.title} className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {example.title}
          </h2>
          <ComponentPreview
            name={`${entry.name} - ${example.title}`}
            code={example.code}
          >
            {example.component}
          </ComponentPreview>
        </div>
      ))}
    </ComponentDetailMotion>
  );
}
