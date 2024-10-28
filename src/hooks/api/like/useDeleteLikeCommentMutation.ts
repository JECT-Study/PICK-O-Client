import { deleteLikeComment } from '@/api/like';
import { Id } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLikeCommentMutation = (talkPickId: Id, commentId: Id) => {
  const queryClient = useQueryClient();
  const deleteLikeCommentMutation = useMutation({
    mutationFn: () => deleteLikeComment(talkPickId, commentId),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, commentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId, commentId, 'replies'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['talks', talkPickId],
        }),
      ]),
  });
  return deleteLikeCommentMutation;
};
