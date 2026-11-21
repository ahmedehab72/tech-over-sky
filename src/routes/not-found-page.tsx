import { Home } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function NotFoundPage() {
  return (
    <Card className="mx-auto max-w-xl text-center">
      <CardHeader>
        <p className="text-sm font-medium text-primary">404</p>
        <CardTitle className="text-2xl">Page not found</CardTitle>
        <CardDescription>
          The route you opened does not exist in this template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link to="/">
            <Home className="size-4" />
            Back home
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
