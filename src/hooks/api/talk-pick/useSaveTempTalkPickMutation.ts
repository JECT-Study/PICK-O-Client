import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { postTempTalkPick } from '@/api/talk-pick';
import { NewTalkPick } from '@/types/talk-pick';
import { AxiosErrorResponse } from '@/api/interceptor';
import { ERROR } from '@/constants/message';

export const useSaveTempTalkPickMutation = (
  showToastModal: (message: string) => () => void,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: NewTalkPick) => postTempTalkPick(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tempTalkPick'],
      });

      showToastModal('임시저장 완료!');
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        showToastModal(ERROR.SAVE.FAIL);
      }
    },
  });

  return { ...mutation };
};
