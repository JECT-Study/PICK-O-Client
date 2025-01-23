import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Id, ServerResponse } from '@/types/api';
import { BookmarkContext } from '@/types/bookmarks';
import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { MyBalanceGameItem } from '@/types/mypages';

export const useMyBalanceGameBookmarkDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ServerResponse>, Error, Id, BookmarkContext>(
    {
      mutationFn: (gameSetId: number) => deleteDoneGameBookmark(gameSetId),

      onMutate: (gameSetId) => {
        const prevGameBookmark = queryClient.getQueryData<{
          content: MyBalanceGameItem[];
        }>(['gameBookmark']);
        const prevGameVote = queryClient.getQueryData<{
          content: MyBalanceGameItem[];
        }>(['gameVote']);

        if (prevGameBookmark) {
          const updated = prevGameBookmark.content.map((item) =>
            item.gameSetId === gameSetId
              ? { ...item, bookmarked: false }
              : item,
          );
          queryClient.setQueryData(['gameBookmark'], {
            ...prevGameBookmark,
            content: updated,
          });
        }

        if (prevGameVote) {
          const updated = prevGameVote.content.map((item) =>
            item.gameSetId === gameSetId
              ? { ...item, bookmarked: false }
              : item,
          );
          queryClient.setQueryData(['gameVote'], {
            ...prevGameVote,
            content: updated,
          });
        }

        return {
          gameBookmark: prevGameBookmark?.content,
          gameVote: prevGameVote?.content,
        };
      },

      onError: (error, gameSetId, context) => {
        if (context?.gameBookmark) {
          queryClient.setQueryData(['gameBookmark'], {
            content: context.gameBookmark,
          });
        }
        if (context?.gameVote) {
          queryClient.setQueryData(['gameVote'], {
            content: context.gameVote,
          });
        }
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['gameBookmark'] });
        await queryClient.invalidateQueries({ queryKey: ['gameVote'] });
      },
    },
  );
};
