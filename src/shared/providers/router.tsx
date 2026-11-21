import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/routes/home-page";
import { NotFoundPage } from "@/routes/not-found-page";
import { RouteErrorPage } from "@/routes/route-error-page";
import UsersPage from "@/routes/users-page";
import { RootLayout } from "@/shared/layouts/root-layout";
import { LanguageProvider, localeMiddleware } from "@/shared/providers/language";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":lang",
        middleware: [localeMiddleware],
        element: (
          <LanguageProvider>
            <RootLayout />
          </LanguageProvider>
        ),
        errorElement: <RouteErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
            errorElement: <RouteErrorPage />,
          },
          {
            path: "user",
            element: <UsersPage />,
            errorElement: <RouteErrorPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
            errorElement: <RouteErrorPage />,
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
