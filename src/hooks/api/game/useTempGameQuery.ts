import { useQuery } from '@tanstack/react-query';
import { getTempGame } from '@/api/game';
import { TempGameResponse } from '@/types/game';

export const useTempGameQuery = () => {
  return useQuery<TempGameResponse>({
    queryKey: ['tempGame'],
    queryFn: getTempGame,
    enabled: false,
  });
};
