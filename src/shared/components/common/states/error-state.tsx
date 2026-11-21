type ErrorStateProps = {
  title?: string;
  message?: string;
};

export function ErrorState({
  title = "Error",
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <h3 className="text-sm font-semibold text-destructive">{title}</h3>
      <p className="mt-1 text-sm text-destructive/90">{message}</p>
    </div>
  );
}
