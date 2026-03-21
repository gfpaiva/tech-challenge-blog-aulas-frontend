import { Calendar, User, Clock } from 'lucide-react';

import type { PostDetail } from '../../types/post.type';

type PostDetailHeroProps = {
  post: PostDetail;
};

export function PostDetailHero({ post }: PostDetailHeroProps) {
  return (
    <figure className="relative w-full min-h-[420px] md:min-h-[520px] overflow-hidden m-0 p-0">
      {/* Hero Image */}
      {}
      <img
        src={post.thumbnailUrl}
        alt={`Capa da aula: ${post.title}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Vignette overlay — radial dark edges + bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)',
            'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full min-h-[420px] md:min-h-[520px] px-6 md:px-12 py-10 max-w-5xl mx-auto w-full">
        {/* Category chip */}
        <span className="badge badge-sm font-bold tracking-widest uppercase bg-primary text-primary-content border-none shadow-md mb-4 w-fit">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/85 text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 shrink-0" />
            <span>{post.authorConfig.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{post.readTimeMin} min de leitura</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
