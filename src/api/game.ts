import { END_POINT } from '@/constants/api';
import { GAME_VALUE } from '@/constants/game';
import {
  BalanceGame,
  Game,
  GameContent,
  GameParams,
  GameSet,
  TempGame,
} from '@/types/game';
import { Id } from '@/types/api';
import { axiosInstance } from './interceptor';

export const postBalanceGame = async (gameData: BalanceGame) => {
  const response = await axiosInstance.post(END_POINT.CREATE_GAME, gameData);
  return response;
};

export const postTempGame = async (tempGameData: TempGame) => {
  const response = await axiosInstance.post(END_POINT.TEMP_GAME, tempGameData);
  return response;
};

export const getTempGame = async () => {
  const { data } = await axiosInstance.get<TempGame>(END_POINT.TEMP_GAME);
  return data;
};

export const postGame = async (gameData: BalanceGame) => {
  const { data } = await axiosInstance.post<Id>(
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

export const putGameBySetId = async (gameSetId: Id, gameData: BalanceGame) => {
  const { data } = await axiosInstance.put<BalanceGame>(
    END_POINT.GAME_SET(gameSetId),
    gameData,
  );
  return data;
};

export const deleteBySetId = async (gameSetId: Id) => {
  return axiosInstance.delete(END_POINT.GAME_SET(gameSetId));
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
  const params: GameParams = {
    page: GAME_VALUE.PAGE,
    size: GAME_VALUE.SIZE,
  };

  if (tagName !== '인기') {
    params.tagName = tagName;
  }

  const { data } = await axiosInstance.get<GameContent[]>(
    `${END_POINT.BEST_GAME}`,
    { params },
  );
  return data;
};

export const getLatestGames = async (tagName: string) => {
  const params: GameParams = {
    page: GAME_VALUE.PAGE,
    size: GAME_VALUE.SIZE,
  };

  if (tagName !== '인기') {
    params.tagName = tagName;
  }

  const { data } = await axiosInstance.get<GameContent[]>(
    `${END_POINT.LATEST_GAME}`,
    { params },
  );
  return data;
};
