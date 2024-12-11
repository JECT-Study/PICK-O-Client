import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTalkPick } from '@/api/talk-pick';
import { PATH } from '@/constants/path';
import { Id } from '@/types/api';
import { useNavigate } from 'react-router-dom';

export const useDeleteTalkPickMutation = (talkPickId: Id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteTalkPick(talkPickId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick', talkPickId],
      });

      navigate(`/${PATH.TALKPICK_PLACE}`);
    },
  });
};
