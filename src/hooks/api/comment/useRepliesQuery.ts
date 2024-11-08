import { getReplies } from '@/api/comments';
import { Id } from '@/types/api';
import { Comment } from '@/types/comment';
import { useQuery } from '@tanstack/react-query';

export const useRepliesQuery = (talkPickId: Id, commentId: Id) => {
  const { data: replies } = useQuery<Comment[]>({
    queryKey: ['talks', talkPickId, commentId, 'replies'],
    queryFn: () => getReplies(talkPickId, commentId),
  });
  return { replies };
};
