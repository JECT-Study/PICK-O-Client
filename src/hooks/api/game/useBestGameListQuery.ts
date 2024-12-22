import { useQuery } from '@tanstack/react-query';
import { GameContent } from '@/types/game';
import { getBestGames } from '@/api/game';

export const useBestGameList = (tagName: string, isEnabled: boolean) => {
  const { data: bestGames, isLoading } = useQuery<GameContent[]>({
    queryKey: ['bestGames', tagName],
    queryFn: () => getBestGames(tagName),
    enabled: isEnabled,
  });
  return { bestGames, isLoading };
};
