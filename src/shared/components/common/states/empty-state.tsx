type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No results found",
  description = "Try changing your filters or adding new data.",
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
