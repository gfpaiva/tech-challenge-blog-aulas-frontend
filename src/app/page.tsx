import { Hero } from "@/features/home/components/Hero/Hero";
import { LatestArticles } from "@/features/posting/components/LatestArticles/LatestArticles";

export default function Home() {
  return (
    <div className="flex flex-col w-full flex-1">
      <Hero />
      <LatestArticles />
    </div>
  );
}
