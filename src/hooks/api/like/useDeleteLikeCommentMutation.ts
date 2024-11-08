import { Id } from '@/types/api';
import { deleteLikeComment } from '@/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLikeCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  selectedPage: number,
  parentId?: number,
) => {
  const queryClient = useQueryClient();
  const deleteLikeCommentMutation = useMutation({
    mutationFn: () => deleteLikeComment(talkPickId, commentId),
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
  return deleteLikeCommentMutation;
};
