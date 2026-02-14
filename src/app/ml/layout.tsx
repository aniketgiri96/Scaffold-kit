import { Sidebar } from "@/components/layout/sidebar";
import { mlRegistry, ML_CATEGORY_ORDER } from "@/registry/ml-registry";

function groupMLByCategory(): Record<string, { title: string; href: string }[]> {
  const grouped: Record<string, { title: string; href: string }[]> = {};
  for (const slug of Object.keys(mlRegistry)) {
    const { name, category } = mlRegistry[slug];
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({ title: name, href: `/ml/${slug}` });
  }
  return grouped;
}

export default function MLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mlItemsByCategory = groupMLByCategory();

  return (
    <div className="container mx-auto flex-1 items-start px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <Sidebar
        componentItemsByCategory={{}}
        categoryOrder={[]}
        mlItemsByCategory={mlItemsByCategory}
        mlCategoryOrder={ML_CATEGORY_ORDER}
      />
      <main className="relative py-6 lg:gap-10 lg:py-8">
        <div className="mx-auto w-full min-w-0 glass rounded-xl p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
