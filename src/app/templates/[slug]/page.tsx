import Link from "next/link";
import { notFound } from "next/navigation";
import { templatesRegistry } from "@/registry/templates";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentDetailMotion } from "@/components/component-detail-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(templatesRegistry).map((slug) => ({ slug }));
}

export default async function TemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = templatesRegistry[slug];

  if (!template) {
    return notFound();
  }

  return (
    <ComponentDetailMotion>
      <Button variant="ghost" size="sm" className="-ml-2 mb-2" asChild>
        <Link href="/templates" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Back to Templates
        </Link>
      </Button>
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">{template.name}</h1>
        <p className="text-lg text-muted-foreground">{template.description}</p>
      </div>
      <ComponentPreview
        name={template.name}
        code={template.code}
        cliInstallCommand={`npx aniketgiri96-scaffold-kit add @templates/${slug}`}
      >
        {template.component}
      </ComponentPreview>
      {template.examples?.map((example) => (
        <div key={example.title} className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">{example.title}</h2>
          <ComponentPreview name={`${template.name} - ${example.title}`} code={example.code}>
            {example.component}
          </ComponentPreview>
        </div>
      ))}
    </ComponentDetailMotion>
  );
}
