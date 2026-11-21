import { ErrorBoundary } from "@/shared/components/common/errors/error-boundary";
import { AppProviders } from "@/shared/providers/app-providers";
import { AppRouter } from "@/shared/providers/router";

export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
}
