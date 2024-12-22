import { useQuery } from '@tanstack/react-query';
import { GameContent } from '@/types/game';
import { getLatestGames } from '@/api/game';

export const useLatestGameList = (tagName: string, isEnabled: boolean) => {
  const { data: latestGames, isLoading } = useQuery<GameContent[]>({
    queryKey: ['latestGames', tagName],
    queryFn: () => getLatestGames(tagName),
    enabled: isEnabled,
  });
  return { latestGames, isLoading };
};
