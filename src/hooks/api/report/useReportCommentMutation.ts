import { Id } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SUCCESS, ERROR } from '@/constants/message';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { AxiosErrorResponse } from '@/api/interceptor';
import { postCommentReport } from '@/api/report';

export const useReportCommentMutation = (
  talkPickId: Id,
  commentId: Id,
  selectedPage: number,
  showToastModal: (message: string, callback?: () => void) => void,
  parentId?: number,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: string) =>
      postCommentReport(talkPickId, commentId, data),
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
