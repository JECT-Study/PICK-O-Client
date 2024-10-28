import React, { useState, useEffect } from 'react';
import TopBanner from '@/components/molecules/TopBanner/TopBanner';
import SearchTagBar from '@/components/molecules/SearchTagBar/SearchTagBar';
import CategoryBox from '@/components/molecules/CategoryBox/CategoryBox';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { useTodayTalkPickQuery } from '@/hooks/api/talk-pick/useTodayTalkPickQuery';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { GameContent } from '@/types/game';
import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { useLatestGameList } from '@/hooks/api/game/useLatestGameListQuery';
import * as S from './LandingPage.style';

const LandingPage = () => {
  const { todayTalkPick } = useTodayTalkPickQuery();
  const [isServicePreparing, setIsServicePreparing] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<'trend' | 'recent'>(
    'trend',
  );
  const [activeTab, setActiveTab] = useState<
    '인기' | '커플' | '취향' | '월드컵'
  >('인기');

  const { bestGames, isLoading: isBestLoading } = useBestGameList(activeTab);
  const { latestGames, isLoading: isLatestLoading } =
    useLatestGameList(activeTab);

  const [contents, setContents] = useState<GameContent[]>([]);

  useEffect(() => {
    if (selectedValue === 'trend') {
      setContents(bestGames || []);
    } else if (selectedValue === 'recent') {
      setContents(latestGames || []);
    }
  }, [
    selectedValue,
    activeTab,
    bestGames,
    latestGames,
    isBestLoading,
    isLatestLoading,
  ]);

  const handleService = () => {
    setIsServicePreparing(true);

    setTimeout(() => {
      setIsServicePreparing(false);
    }, 2000);
  };

  return (
    <div>
      {isServicePreparing && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="white">아직 준비 중인 서비스입니다!</ToastModal>
        </div>
      )}
      <TopBanner todayTalkPick={todayTalkPick} />
      <div css={S.contentWrapStyle}>
        <SearchTagBar />
        <div css={S.categoryBoxStyle}>
          <CategoryBox handleService={handleService} />
        </div>

        <BalanceGameList
          contents={contents}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default LandingPage;
