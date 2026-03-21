'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Textarea } from '@/common/components/ui/Textarea/Textarea';
import { Button } from '@/common/components/ui/Button/Button';
import { useAuthStoreAdapter } from '@/infra/store/auth.adapter';
import { appRoutes } from '@/common/config/routes';
import { usePostComments } from '../../hooks/usePostComments';
import { CommentCard } from '../CommentCard/CommentCard';
import type { Comment } from '../../types/post.type';

type CommentsSectionProps = {
  postId: string;
  initialComments: Comment[];
};

export function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const {
    comments,
    onSubmit,
    isSubmitting,
    form: {
      register,
      formState: { errors },
    },
  } = usePostComments(postId, initialComments);

  // Hydration guard: only read Zustand state after client mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = useAuthStoreAdapter((s) => s.isAuthenticated);

  return (
    <section className="max-w-3xl mx-auto w-full px-4 md:px-6 py-10 border-t border-base-200">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold font-serif text-base-content">
          Comentários
          {comments.length > 0 && (
            <span className="ml-2 badge badge-primary badge-sm align-middle">
              {comments.length}
            </span>
          )}
        </h2>
      </div>

      {/* Comment Form — only for authenticated users, after hydration */}
      {mounted && isAuthenticated && (
        <form
          onSubmit={onSubmit}
          className="mb-10"
          aria-label="Formulário de comentário"
        >
          <div className="flex flex-col gap-2">
            <Textarea
              id="comment-content"
              placeholder="Escreva seu comentário..."
              rows={4}
              error={!!errors.content}
              aria-label="Texto do comentário"
              {...register('content')}
            />
            {errors.content && (
              <p className="text-error text-xs mt-0.5" role="alert">
                {errors.content.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-3">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Publicar comentário
            </Button>
          </div>
        </form>
      )}

      {/* Login prompt for unauthenticated users */}
      {mounted && !isAuthenticated && (
        <div className="alert mb-10 text-sm">
          <span>
            <a
              href={`${appRoutes.login.path}?redirectTo=${encodeURIComponent(appRoutes.postDetail(postId).path)}`}
              className="link link-primary font-semibold"
            >
              Faça login
            </a>{' '}
            para deixar um comentário.
          </span>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 text-base-content/50">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Nenhum comentário ainda. Seja o primeiro!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  );
}
