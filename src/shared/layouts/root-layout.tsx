import { NavLink, Outlet, useLocation } from "react-router-dom";

import { cn } from "@/shared/lib/utils";
import { useLanguage } from "@/shared/providers/language";

export function RootLayout() {
  const { locale } = useLanguage();

  const { pathname } = useLocation();
  if (pathname.replace(/\/$/, "") === `/${locale}`) return <Outlet />;
  const navItems = [
    { label: "Home", to: `/${locale}` },
    { label: "Users", to: `/${locale}/user` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-sm font-semibold">React Feature Template</span>
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    isActive && "bg-muted text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
