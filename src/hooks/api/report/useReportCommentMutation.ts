import { Id } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SUCCESS, ERROR } from '@/constants/message';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { AxiosErrorResponse } from '@/api/interceptor';
import { postCommentReport } from '@/api/report';

export const useReportCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  showToastModal: (message: string) => () => void,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: string) =>
      postCommentReport(talkPickId, commentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['talks', talkPickId, 'comments'],
      });
      showToastModal(SUCCESS.COMMENT.REPORT);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.CONFLICT) {
        showToastModal(ERROR.COMMENT.REPORT_AGAIN);
      }
    },
  });

  return {
    ...mutation,
  };
};
