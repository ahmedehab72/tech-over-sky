import type { ErrorInfo, PropsWithChildren, ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

import { ErrorState } from "@/shared/components/common/states/error-state";
import { Button } from "@/shared/components/ui/button";

type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactNode;
}>;

function AppErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4">
      <div className="w-full space-y-4">
        <ErrorState
          title="Something went wrong"
          message="The app hit an unexpected UI error."
        />
        <Button type="button" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    </main>
  );
}

function logError(error: unknown, errorInfo: ErrorInfo) {
  console.error("Unhandled UI error", error, errorInfo);
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  if (fallback !== undefined) {
    return (
      <ReactErrorBoundary fallback={fallback} onError={logError}>
        {children}
      </ReactErrorBoundary>
    );
  }

  return (
    <ReactErrorBoundary FallbackComponent={AppErrorFallback} onError={logError}>
      {children}
    </ReactErrorBoundary>
  );
}
