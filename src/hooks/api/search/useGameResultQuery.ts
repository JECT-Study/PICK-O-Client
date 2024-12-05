import { useQuery } from '@tanstack/react-query';
import { getGameResults } from '@/api/search';
import { GameResult } from '@/types/search';

interface SortOption {
  fileId: string;
  order: 'asc' | 'desc';
}

export const useGameResultQuery = (
  query: string,
  page: number,
  size: number,
  sort: SortOption,
) => {
  const sortParam = `${sort.fileId},${sort.order}`;

  const { data: gameResults, isLoading } = useQuery<GameResult>({
    queryKey: ['gameResults', query, page, size, sortParam],
    queryFn: () => getGameResults(query, page, size, sortParam),
  });

  const content = gameResults?.content || [];
  const totalPages = gameResults?.totalPages || 0;

  return { content, totalPages, isLoading };
};
