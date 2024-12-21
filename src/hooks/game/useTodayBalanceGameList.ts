import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { useMemo } from 'react';

export const useTodayBalanceGameList = () => {
  const { bestGames } = useBestGameList('인기', false);

  const todayBalanceGameList = useMemo(() => {
    if (!bestGames || bestGames.length < 2) return [];
    const shuffledGames = [...bestGames].sort(() => 0.5 - Math.random());
    return shuffledGames.slice(0, 2);
  }, [bestGames]);

  return { todayBalanceGameList };
};
