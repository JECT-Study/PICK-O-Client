import { Id } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { PATH } from '@/constants/path';
import { EditTalkPick } from '@/types/talk-pick';
import { SUCCESS } from '@/constants/message';

export const useEditTalkPickMutation = (
  talkPickId: Id,
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: EditTalkPick) => putTalkPick(talkPickId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick', talkPickId],
      });
      showToastModal(SUCCESS.POST.EDIT, () => {
        navigate(`/${PATH.TALKPICK_PLACE}`);
      });

      await postTalkPickSummary(talkPickId);
    },
  });

  return { ...mutation };
};
