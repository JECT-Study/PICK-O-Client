import { END_POINT } from '@/constants/api';
import { GameResult, TalkPickResult } from '@/types/search';
import { axiosInstance } from './interceptor';

export const getGameResults = async (
  query: string,
  page: number,
  size: number,
  sort: string,
) => {
  const { data } = await axiosInstance.get<GameResult>(
    END_POINT.SEARCH_GAME(query, page, size, sort),
  );
  return data;
};

export const getTalkPickResults = async (
  query: string,
  page: number,
  size: number,
  sort: string,
) => {
  const { data } = await axiosInstance.get<TalkPickResult>(
    END_POINT.SEARCH_TALKPICK(query, page, size, sort),
  );
  return data;
};
