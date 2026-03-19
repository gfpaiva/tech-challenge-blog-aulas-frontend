import type { Metadata } from "next";

import { Hero } from "@/features/home/components/Hero/Hero";
import { LatestArticles } from "@/features/posting/components/LatestArticles/LatestArticles";
import { appRoutes } from "@/common/config/routes";

export const metadata: Metadata = {
  title: appRoutes.home.title,
  description: appRoutes.home.description,
};

export default function Home() {
  return (
    <div className="flex flex-col w-full flex-1">
      <Hero />
      <LatestArticles />
    </div>
  );
}
