import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { postTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { Id } from '@/types/api';
import { NewTalkPick } from '@/types/talk-pick';
import { useNavigate } from 'react-router-dom';
import { AxiosErrorResponse } from '@/api/interceptor';
import { ERROR, SUCCESS } from '@/constants/message';
import { PATH } from '@/constants/path';

export const useCreateTalkPickMutation = (
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: NewTalkPick) => postTalkPick(data),
    onSuccess: async (talkPickId: Id) => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick'],
      });
      showToastModal(SUCCESS.POST.CREATE, () => {
        navigate(`/${PATH.TALKPICK_PLACE}`);
      });

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
