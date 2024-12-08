import React, { useState, useMemo } from 'react';
import TopBanner from '@/components/molecules/TopBanner/TopBanner';
import SearchTagBar from '@/components/molecules/SearchTagBar/SearchTagBar';
import CategoryBox from '@/components/molecules/CategoryBox/CategoryBox';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { useTodayTalkPickQuery } from '@/hooks/api/talk-pick/useTodayTalkPickQuery';
import { useNavigate } from 'react-router-dom';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { useLatestGameList } from '@/hooks/api/game/useLatestGameListQuery';
import { ToggleGroupValue } from '@/types/toggle';
import * as S from './LandingPage.style';

const LandingPage = () => {
  const { todayTalkPick } = useTodayTalkPickQuery();
  const [isServicePreparing, setIsServicePreparing] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ToggleGroupValue>({
    field: 'views',
    order: 'desc',
  });
  const [activeTab, setActiveTab] = useState<
    '인기' | '커플' | '취향' | '월드컵'
  >('인기');

  const { bestGames } = useBestGameList(activeTab);
  const { latestGames } = useLatestGameList(activeTab);

  const contents = useMemo(() => {
    if (selectedValue.field === 'views') {
      return bestGames || [];
    }
    return latestGames || [];
  }, [selectedValue, bestGames, latestGames]);

  const handleService = () => {
    setIsServicePreparing(true);

    setTimeout(() => {
      setIsServicePreparing(false);
    }, 2000);
  };

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/result/search/all?query=${query}`);
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
        <SearchTagBar onSearch={handleSearch} />
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
