"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="">
      <h3>{t("title")}</h3>
    </div>
  );
}
