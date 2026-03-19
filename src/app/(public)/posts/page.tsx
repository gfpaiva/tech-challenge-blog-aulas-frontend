import { appRoutes } from "@/common/config/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: appRoutes.posts.title,
  description: appRoutes.posts.description,
};

export default function PostsList() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-serif font-bold">Aulas Publicadas</h1>
      <div className="mt-6 card bg-base-200 shadow-xl p-6">
        <p>Conteúdo de exemplo acessível a todos.</p>
      </div>
    </div>
  );
}