import { END_POINT } from '@/constants/api';
import { Game, GameContent, GameSet } from '@/types/game';
import { Id } from '@/types/api';
import { axiosInstance } from './interceptor';

export const postGame = async (gameData: Game) => {
  const { data } = await axiosInstance.post<GameContent>(
    END_POINT.CREATE_GAME,
    gameData,
  );
  return data;
};

export const getGameBySetId = async (gameSetId: Id) => {
  const { data } = await axiosInstance.get<GameSet>(
    `${END_POINT.GAME_SET(gameSetId)}`,
  );
  return data;
};

export const putGame = async (gameId: Id, gameData: Game) => {
  const { data } = await axiosInstance.put<GameContent>(
    END_POINT.EDIT_GAME(gameId),
    gameData,
  );
  return data;
};

export const deleteGame = async (gameId: Id) => {
  const response = await axiosInstance.delete(END_POINT.DELETE_GAME(gameId));
  return response;
};

export const getNewGames = async () => {
  const { data } = await axiosInstance.get<GameContent[]>(
    `${END_POINT.NEW_GAME}`,
  );
  return data;
};

export const getBestGames = async (tagName: string) => {
  const { data } = await axiosInstance.get<GameContent[]>(
    `${END_POINT.BEST_GAME}`,
    {
      params: { tagName },
    },
  );
  return data;
};

export const getLatestGames = async (tagName: string) => {
  const { data } = await axiosInstance.get<GameContent[]>(
    `${END_POINT.LATEST_GAME}`,
    {
      params: { tagName },
    },
  );
  return data;
};
