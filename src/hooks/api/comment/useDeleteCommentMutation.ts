import { deleteComment } from '@/api/comments';
import { Id } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  selectedPage: number,
  parentId?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteComment(talkPickId, commentId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'comments', selectedPage - 1],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, 'bestComments', selectedPage - 1],
        }),
      ]);

      if (parentId) {
        await queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, parentId, 'replies'],
        });
      }
    },
  });
};
