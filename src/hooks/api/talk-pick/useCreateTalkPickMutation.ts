/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { postTalkPick, postTalkPickSummary } from '@/api/talk-pick';
import { Id } from '@/types/api';
import { NewTalkPick } from '@/types/talk-pick';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosErrorResponse } from '@/api/interceptor';
import { ERROR } from '@/constants/message';

export const useCreateTalkPickMutation = () => {
  const queryClient = useQueryClient();
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const setCreateError = (message: string) => {
    setIsError(true);
    setErrorMessage(message);
  };

  const mutation = useMutation({
    mutationFn: (data: NewTalkPick) => postTalkPick(data),
    onSuccess: async (talkPickId: Id) => {
      await queryClient.invalidateQueries({
        queryKey: ['talkPick'],
      });
      setCreateSuccess(true);

      await postTalkPickSummary(talkPickId);

      setTimeout(() => {
        navigate('/talkpickplace');
      }, 2000);
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        setCreateError(ERROR.CREATE.FAIL);
      }
    },
  });

  return {
    ...mutation,
    createSuccess,
  };
};
