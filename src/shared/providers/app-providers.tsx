import type { PropsWithChildren } from "react";

import { QueryProvider } from "@/shared/providers/query";
import { ThemeProvider } from "@/shared/providers/theme";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
