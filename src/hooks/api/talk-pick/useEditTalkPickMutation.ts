import { Id } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { EditTalkPick } from '@/types/talk-pick';
import { SUCCESS } from '@/constants/message';

export const useEditTalkPickMutation = (
  talkPickId: Id,
  showToastModal: (message: string) => () => void,
) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: EditTalkPick) => putTalkPick(talkPickId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick', talkPickId],
      });
      showToastModal(SUCCESS.POST.EDIT);

      setTimeout(() => {
        navigate('/talkpickplace');
      }, 2000);

      await postTalkPickSummary(talkPickId);
    },
  });

  return { ...mutation };
};
