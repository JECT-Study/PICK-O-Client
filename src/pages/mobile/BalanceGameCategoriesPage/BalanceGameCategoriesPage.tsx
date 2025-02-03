import { CoupleMedium, PopularMedium, TasteMedium } from '@/assets';
import BalanceGameCategorySection from '@/components/mobile/organisms/BalanceGameCategorySection/BalanceGameCategorySection';
import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { useLatestGameList } from '@/hooks/api/game/useLatestGameListQuery';
import React from 'react';
import * as S from './BalanceGameCategoriesPage.style';

const BalanceGameCategoriesPage = () => {
  const { bestGames } = useBestGameList('인기', true);
  const { latestGames: coupleGames } = useLatestGameList('커플', true);
  const { latestGames: tasteGames } = useLatestGameList('취향', true);
  const { latestGames: otherGames } = useLatestGameList('기타', true);

  return (
    <div css={S.pageStyle}>
      <BalanceGameCategorySection
        label="인기"
        icon={<PopularMedium />}
        contents={bestGames ?? []}
      />
      <BalanceGameCategorySection
        label="커플"
        icon={<CoupleMedium />}
        contents={coupleGames ?? []}
      />
      <BalanceGameCategorySection
        label="취향"
        icon={<TasteMedium />}
        contents={tasteGames ?? []}
      />
      <BalanceGameCategorySection label="기타" contents={otherGames ?? []} />
    </div>
  );
};

export default BalanceGameCategoriesPage;
