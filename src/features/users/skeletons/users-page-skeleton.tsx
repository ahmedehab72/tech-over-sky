import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export function UsersPageSkeleton() {
  return (
    <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <Card>
        <CardHeader>
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-4 w-full max-w-sm rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 rounded bg-muted" />
          <div className="h-10 rounded bg-muted" />
          <div className="h-10 w-28 rounded bg-muted" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-36 rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-10 rounded bg-muted" />
          <div className="h-10 rounded bg-muted" />
          <div className="h-10 rounded bg-muted" />
        </CardContent>
      </Card>
    </section>
  );
}
