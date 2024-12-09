import React, { useState, useEffect } from 'react';
import TopBanner from '@/components/molecules/TopBanner/TopBanner';
import SearchTagBar from '@/components/molecules/SearchTagBar/SearchTagBar';
import CategoryBox from '@/components/molecules/CategoryBox/CategoryBox';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { useTodayTalkPickQuery } from '@/hooks/api/talk-pick/useTodayTalkPickQuery';
import { useNavigate } from 'react-router-dom';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { GameContent } from '@/types/game';
import { useBestGameList } from '@/hooks/api/game/useBestGameListQuery';
import { useLatestGameList } from '@/hooks/api/game/useLatestGameListQuery';
import { NOTICE } from '@/constants/message';
import MobileCreateDropdown from '@/components/mobile/molecule/MobileCreateDropdown/MobileCreateDropdown';
import useIsMobile from '@/hooks/common/useIsMobile';
import * as S from './LandingPage.style';

const LandingPage = () => {
  const isMobile = useIsMobile();
  const { todayTalkPick } = useTodayTalkPickQuery();
  const [isServicePreparing, setIsServicePreparing] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('views');
  const [activeTab, setActiveTab] = useState<
    '인기' | '커플' | '취향' | '월드컵'
  >('인기');

  const { bestGames, isLoading: isBestLoading } = useBestGameList(activeTab);
  const { latestGames, isLoading: isLatestLoading } =
    useLatestGameList(activeTab);

  const [contents, setContents] = useState<GameContent[]>([]);

  useEffect(() => {
    if (selectedValue === 'views') {
      setContents(bestGames || []);
    } else if (selectedValue === 'createdAt') {
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

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/result/search/all?query=${query}`);
  };

  return (
    <div css={S.pageWrapperStyle}>
      {isServicePreparing && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="white">{NOTICE.STATUS.NOT_READY}</ToastModal>
        </div>
      )}
      <TopBanner todayTalkPick={todayTalkPick} />

      {isMobile ? (
        <div css={S.contentWrapStyle}>
          <CategoryBox isMobile={isMobile} handleService={handleService} />
          <div css={S.searchBoxStyle}>
            <p css={S.searchBoxTitleStyle}>어떤 콘텐츠를 찾아볼까요?</p>
            <SearchTagBar isMobile onSearch={handleSearch} />
          </div>
          <BalanceGameList
            isMobile
            contents={contents}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div css={S.floatingDropdownStyle}>
            <MobileCreateDropdown />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default LandingPage;
