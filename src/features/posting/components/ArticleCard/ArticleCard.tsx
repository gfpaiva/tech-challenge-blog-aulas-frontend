import Link from 'next/link';
import { Calendar, Clock, Bookmark } from 'lucide-react';
import type { Article } from '../../types/article.type';
import { appRoutes } from '@/common/config/routes';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="card bg-base-100 shadow-[0_0_0_1px_var(--fallback-b2,oklch(var(--b2)))] hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">

      {/* Thumbnail Area */}
      <figure className="relative w-full aspect-[4/3] bg-base-200 m-0 p-0">
        {/* Category Badge absolutely positioned */}
        <div className="absolute top-4 left-4 z-10">
          <span className="badge badge-sm font-bold tracking-widest uppercase bg-base-100/90 text-primary border-none shadow-sm backdrop-blur-md">
            {article.category}
          </span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.thumbnailUrl}
          alt={`Capa do artigo: ${article.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </figure>

      {/* Content Area */}
      <div className="card-body p-6 flex flex-col gap-0">

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishedAt}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title text-xl font-bold font-serif text-base-content leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={appRoutes.postDetail(article.id).path} className="focus:outline-none before:absolute before:inset-0">
            {article.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-base-content/70 line-clamp-3 mb-6 flex-grow-0">
          {article.summary}
        </p>

        {/* Footer (Author & Bookmark) */}
        <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-200/60 relative z-20 w-full">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.authorConfig.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.authorConfig.name)}&background=random`}
                  alt={article.authorConfig.name}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-base-content">{article.authorConfig.name}</span>
          </div>
        </div>

      </div>
    </article>
  );
}
