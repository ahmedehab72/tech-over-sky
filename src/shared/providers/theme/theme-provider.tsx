import { type PropsWithChildren, useEffect, useMemo, useState } from "react";

import { type Theme, ThemeContext } from "@/shared/providers/theme/theme-context";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme !== "system") {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
