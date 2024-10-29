import { postComment } from '@/api/comments';
import { Id } from '@/types/api';
import { CommentProps } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCommentMutation = (
  talkPickId: Id,
  selectedPage: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: CommentProps) =>
      postComment(talkPickId, { ...comment }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'comments', selectedPage - 1],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'bestComments', selectedPage - 1],
        }),
      ]),
  });
};
