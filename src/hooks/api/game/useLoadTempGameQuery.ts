import { useQuery } from '@tanstack/react-query';
import { TempGame } from '@/types/game';
import { getTempGame } from '@/api/game';

export const useLoadTempGameQuery = () => {
  return useQuery<TempGame>({
    queryKey: ['tempGame'],
    queryFn: getTempGame,
    staleTime: 5 * 60 * 1000,
  });
};
