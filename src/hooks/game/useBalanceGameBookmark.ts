import { useCreateGameBookmarkMutation } from '@/hooks/api/bookmark/useCreateGameBookmarkMutation';
import { useDeleteGameBookmarkMutation } from '@/hooks/api/bookmark/useDeleteGameBookmarkMutation';
import { useCreateDoneGameBookmarkMutation } from '@/hooks/api/bookmark/useCreateDoneGameBookmark';
import { useDeleteDoneGameBookmarkMutation } from '@/hooks/api/bookmark/useDeleteDoneGameBookmark';
import { GameSet } from '@/types/game';
import { ERROR } from '@/constants/message';

export const useGameBookmark = (
  isGuest: boolean,
  isMyGame: boolean,
  myBookmark: boolean,
  gameSetId: number,
  gameId: number,
  showToastModal: (message: string, callback?: () => void) => void,
  game?: GameSet,
) => {
  const { mutate: createBookmark } = useCreateGameBookmarkMutation(
    gameSetId,
    gameId,
    showToastModal,
  );

  const { mutate: deleteBookmark } = useDeleteGameBookmarkMutation(
    gameSetId,
    gameId,
    showToastModal,
  );

  const handleBookmarkClick = (callback: () => void) => {
    if (!game) return;

    if (isGuest) {
      callback();
      return;
    }

    if (isMyGame) {
      showToastModal(ERROR.BOOKMARK.MY_GAME);
      return;
    }

    if (myBookmark) {
      deleteBookmark();
    } else {
      createBookmark();
    }
  };

  return { handleBookmarkClick };
};

export const useGameEndBookmark = (
  isGuest: boolean,
  isMyGame: boolean,
  myEndBookmark: boolean,
  gameSetId: number,
  showToastModal: (message: string, callback?: () => void) => void,
) => {
  const { mutate: createEndBookmark } = useCreateDoneGameBookmarkMutation(
    gameSetId,
    showToastModal,
  );

  const { mutate: deleteEndBookmark } = useDeleteDoneGameBookmarkMutation(
    gameSetId,
    showToastModal,
  );

  const handleEndBookmarkClick = (callback: () => void) => {
    if (isGuest) {
      callback();
      return;
    }

    if (isMyGame) {
      showToastModal(ERROR.BOOKMARK.MY_GAME);
      return;
    }

    if (myEndBookmark) {
      deleteEndBookmark();
    } else {
      createEndBookmark();
    }
  };

  return { handleEndBookmarkClick };
};
