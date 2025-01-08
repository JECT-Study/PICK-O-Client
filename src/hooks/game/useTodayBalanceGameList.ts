import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { getRandomNumbers } from '@/utils/calculator';
import { useMemo } from 'react';

export const useTodayBalanceGameList = () => {
  const { bestGames } = useBestGameList('인기', false);

  const todayBalanceGameList = useMemo(() => {
    if (!bestGames || bestGames.length < 2) return [];
    const randomIndexes = getRandomNumbers(bestGames.length);
    return randomIndexes.map((index) => bestGames[index]);
  }, [bestGames]);

  return { todayBalanceGameList };
};
