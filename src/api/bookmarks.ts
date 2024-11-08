import { END_POINT } from '@/constants/api';
import { Id } from '@/types/api';
import { axiosInstance } from './interceptor';

export const postTalkPickBookmark = async (talkPickId: Id) => {
  const response = await axiosInstance.post(
    END_POINT.BOOKMARK_TALKPICK(talkPickId),
  );
  return response;
};

export const deleteTalkPickBookmark = async (talkPickId: Id) => {
  const response = await axiosInstance.delete(
    END_POINT.BOOKMARK_TALKPICK(talkPickId),
  );
  return response;
};

export const postDoneGameBookmark = async (gameSetId: Id) => {
  const response = await axiosInstance.post(
    END_POINT.BOOKMARK_GAME_DONE(gameSetId),
  );
  return response;
};

export const deleteDoneGameBookmark = async (gameSetId: Id) => {
  const response = await axiosInstance.delete(
    END_POINT.BOOKMARK_GAME_DONE(gameSetId),
  );
  return response;
};

export const postGameBookmark = async (gameSetId: Id, gameId: Id) => {
  const response = await axiosInstance.post(
    END_POINT.BOOKMARK_GAME(gameSetId, gameId),
  );
  return response;
};

export const deleteGameBookmark = async (gameSetId: Id) => {
  const response = await axiosInstance.delete(
    END_POINT.DELETE_BOOKMARK_GAME(gameSetId),
  );
  return response;
};
