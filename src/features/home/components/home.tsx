import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { AppSettingsControls } from "@/shared/components/common/app-settings-controls";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useLanguage } from "@/shared/providers/language";

export default function Home() {
  const { locale } = useLanguage();
  const { t } = useTranslation();

  const features = [
    {
      title: t("home-page.users-feature-title"),
      description: t("home-page.users-feature-description"),
      to: `/${locale}/user`,
    },
  ];
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Badge>{t("home-page.badge")}</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t("home-page.title")}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {t("home-page.description")}
          </p>
        </div>
        <AppSettingsControls />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.to}>
            <CardHeader>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                <div className="space-y-2">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to={feature.to}>
                  {t("home-page.open-feature")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
