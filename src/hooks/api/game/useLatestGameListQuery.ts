import { useQuery } from '@tanstack/react-query';
import { GameContent } from '@/types/game';
import { getLatestGames } from '@/api/game';

export const useLatestGameList = (tagName: string) => {
  const { data: latestGames, isLoading } = useQuery<GameContent[]>({
    queryKey: ['latestGames', tagName],
    queryFn: () => getLatestGames(tagName),
  });
  return { latestGames, isLoading };
};
