import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { postTempTalkPick } from '@/api/talk-pick';
import { NewTempTalkPick } from '@/types/talk-pick';
import { AxiosErrorResponse } from '@/api/interceptor';
import { ERROR, SUCCESS } from '@/constants/message';

export const useSaveTempTalkPickMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: NewTempTalkPick) => postTempTalkPick(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tempTalkPick'],
      });

      showToastModal(SUCCESS.POST.SAVE);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        showToastModal(ERROR.SAVE.FAIL);
      }
    },
  });

  return { ...mutation };
};
