import { Id } from '@/types/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { NewTalkPick } from '@/types/talk-pick';

export const useEditTalkPickMutation = (talkPickId: Id) => {
  const queryClient = useQueryClient();
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: NewTalkPick) => putTalkPick(talkPickId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick', talkPickId],
      });
      setEditSuccess(true);

      await postTalkPickSummary(talkPickId);

      setTimeout(() => {
        navigate('/talkpickplace');
      }, 2000);
    },
  });

  return {
    ...mutation,
    editSuccess,
  };
};
