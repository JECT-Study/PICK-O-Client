import { Id } from '@/types/api';
import { useState } from 'react';
import { postLikeComment } from '@/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosErrorResponse } from '@/api/interceptor';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR } from '@/constants/message';

export const useCreateLikeCommentMutation = (talkPickId: Id, commentId: Id) => {
  const queryClient = useQueryClient();
  const [likeModal, setLikeModal] = useState<boolean>(false);
  const [likeModalText, setLikeModalText] = useState<string>('');

  const likeCommentMutation = useMutation({
    mutationFn: () => postLikeComment(talkPickId, commentId),
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.FORBIDDEN) {
        setLikeModal(true);
        setLikeModalText(ERROR.COMMENT.MY_COMMENT_LIKE);

        setTimeout(() => {
          setLikeModal(false);
        }, 2000);
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
  return { ...likeCommentMutation, likeModalText, likeModal };
};
