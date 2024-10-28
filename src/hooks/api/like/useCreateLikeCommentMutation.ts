import { Id } from '@/types/api';
import { postLikeComment } from '@/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR } from '@/constants/message';

export const useCreateLikeCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  showToastModal: (message: string) => () => void,
) => {
  const queryClient = useQueryClient();

  const likeCommentMutation = useMutation({
    mutationFn: () => postLikeComment(talkPickId, commentId),
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.FORBIDDEN) {
        showToastModal(ERROR.COMMENT.MY_COMMENT_LIKE);
      }
    },
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
  return { ...likeCommentMutation };
};
