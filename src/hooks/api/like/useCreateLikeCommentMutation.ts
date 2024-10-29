import { Id } from '@/types/api';
import { postLikeComment } from '@/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR } from '@/constants/message';

export const useCreateLikeCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  selectedPage: number,
  showToastModal: (message: string) => () => void,
  parentId?: number,
) => {
  const queryClient = useQueryClient();

  const likeCommentMutation = useMutation({
    mutationFn: () => postLikeComment(talkPickId, commentId),
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.FORBIDDEN) {
        showToastModal(ERROR.COMMENT.MY_COMMENT_LIKE);
      }
    },
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
  return { ...likeCommentMutation };
};
