import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

import { ErrorState } from "@/shared/components/common/states/error-state";
import { Button } from "@/shared/components/ui/button";
import { getErrorMessage } from "@/shared/services/api-error";

export function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message || "Route failed to render."
    : getErrorMessage(error, "Route failed to render.");

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4">
      <div className="w-full space-y-4">
        <ErrorState title="Route error" message={message} />
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
