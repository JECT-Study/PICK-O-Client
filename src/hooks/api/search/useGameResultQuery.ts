import { useQuery } from '@tanstack/react-query';
import { getGameResults } from '@/api/search';
import { GameResult } from '@/types/search';

export const useGameResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: string,
  enabledCondition: boolean,
) => {
  const {
    data: gameResults,
    isLoading,
    isError,
  } = useQuery<GameResult>({
    queryKey: ['gameResults', query, page, size, sort],
    queryFn: () => getGameResults(query, page, size, sort),
    enabled: enabledCondition,
  });

  const content = gameResults?.content || [];
  const totalPages = gameResults?.totalPages || 0;
  console.log('게임 쿼리 Query 상태:', { content });

  return { content, totalPages, isLoading, isError };
};
