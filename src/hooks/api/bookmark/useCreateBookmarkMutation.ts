import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { postDoneGameBookmark } from '@/api/bookmarks';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
/**
 * 최소한의 범용 타입:
 * TData = AxiosResponse<any, any>,
 * TError = Error,
 * TVariables = number (혹은 Id),
 * TContext = { prevBest?: GameContent[]; prevLatest?: GameContent[] }
 * → 이렇게 지정해두면 onMutate 반환형이 맞춰진다.
 */
export const useCreateBookmarkMutation = () => {
  return useMutation<
    AxiosResponse<ServerResponse>, // TData
    Error, // TError
    number, // TVariables
    BookmarkContext // TContext
  >({
    mutationFn: async (gameId: Id) => {
      return postDoneGameBookmark(gameId);
    },
    // (onMutate, onError, onSuccess 등은 호출부(페이지)에서 작성)
  });
};
