import { useQuery } from '@tanstack/react-query';
import { getGameResults } from '@/api/search';
import { GameResult } from '@/types/search';

export const useGameResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: string,
) => {
  const { data: gameResults, isLoading } = useQuery<GameResult>({
    queryKey: ['gameResults', query, page, size, sort],
    queryFn: () => getGameResults(query, page, size, sort),
  });

  const content = gameResults?.content || [];
  const totalPages = gameResults?.totalPages || 0;

  return { content, totalPages, isLoading };
};
