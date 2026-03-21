import { Avatar } from '@/common/components/ui/Avatar/Avatar';
import type { Comment } from '../../types/post.type';

type CommentCardProps = {
  comment: Comment;
};

export function CommentCard({ comment }: CommentCardProps) {
  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=random&color=fff&bold=true`;

  return (
    <div className="chat chat-start">
      <div className="chat-image">
        <Avatar
          src={avatarSrc}
          alt={comment.authorName}
          size="sm"
        />
      </div>

      <div className="chat-header flex items-center gap-2 text-base-content font-semibold text-sm">
        {comment.authorName}
        <time className="text-xs text-base-content/50 font-normal">
          {comment.publishedAt}
        </time>
      </div>

      <div className="chat-bubble chat-bubble-primary bg-base-200 text-base-content shadow-sm text-sm leading-relaxed">
        {comment.content}
      </div>
    </div>
  );
}
