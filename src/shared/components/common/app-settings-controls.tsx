import { Languages, Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useLanguage } from "@/shared/providers/language";
import { useTheme } from "@/shared/providers/theme";

const themeIcon = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function AppSettingsControls() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, dir } = useLanguage();
  const ThemeIcon = themeIcon[theme];

  function toggleTheme() {
    if (theme === "system") {
      setTheme("light");
      return;
    }

    setTheme(theme === "light" ? "dark" : "system");
  }

  function toggleLanguage() {
    setLocale(locale === "ar" ? "en" : "ar");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" onClick={toggleTheme}>
        <ThemeIcon className="size-4" />
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </Button>
      <Button type="button" variant="outline" onClick={toggleLanguage}>
        <Languages className="size-4" />
        {locale.toUpperCase()} / {dir.toUpperCase()}
      </Button>
    </div>
  );
}
