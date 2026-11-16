export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-3 text-[10px] font-medium tracking-[0.28em] text-accent uppercase">{eyebrow}</p>}
        <h1 className="editorial-title text-4xl text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
