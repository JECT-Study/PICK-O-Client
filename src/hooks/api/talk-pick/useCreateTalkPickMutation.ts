import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { postTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { Id } from '@/types/api';
import { NewTalkPick } from '@/types/talk-pick';
import { useNavigate } from 'react-router-dom';
import { AxiosErrorResponse } from '@/api/interceptor';
import { ERROR } from '@/constants/message';

export const useCreateTalkPickMutation = (
  showToastModal: (message: string) => () => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: NewTalkPick) => postTalkPick(data),
    onSuccess: async (talkPickId: Id) => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick'],
      });
      showToastModal('등록 완료!');

      setTimeout(() => {
        navigate('/talkpickplace');
      }, 2000);

      await postTalkPickSummary(talkPickId);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        showToastModal(ERROR.CREATE.FAIL);
      }
    },
  });

  return { ...mutation };
};
