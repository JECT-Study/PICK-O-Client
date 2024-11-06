import { Id } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { NewTalkPick } from '@/types/talk-pick';

export const useEditTalkPickMutation = (
  talkPickId: Id,
  showToastModal: (message: string) => () => void,
) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: NewTalkPick) => putTalkPick(talkPickId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick', talkPickId],
      });
      showToastModal('수정 완료!');

      setTimeout(() => {
        navigate('/talkpickplace');
      }, 2000);

      await postTalkPickSummary(talkPickId);
    },
  });

  return { ...mutation };
};
