export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 flex-1 py-6 lg:py-8">
      <div className="mx-auto w-full min-w-0 max-w-5xl glass rounded-3xl p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
