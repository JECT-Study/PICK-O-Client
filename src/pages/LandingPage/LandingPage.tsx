import React, { useCallback, useState } from 'react';
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
import { NOTICE } from '@/constants/message';
import FloatingMenuButton from '@/components/mobile/molecules/FloatingMenuButton/FloatingMenuButton';
import useIsMobile from '@/hooks/common/useIsMobile';
import { GameContent } from '@/types/game';
import { useLandingPageCreateBookmarkMutation } from '@/hooks/api/bookmark/useLandingPageCreateBookmarkMutation';
import { useLandingPageDeleteBookmarkMutation } from '@/hooks/api/bookmark/useLandingPageDeleteBookmarkMutation';
import * as S from './LandingPage.style';

const LandingPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { todayTalkPick } = useTodayTalkPickQuery();
  const [isServicePreparing, setIsServicePreparing] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ToggleGroupValue>({
    field: 'views',
    order: 'desc',
  });
  const [activeTab, setActiveTab] = useState<
    '인기' | '커플' | '취향' | '월드컵'
  >('인기');

  const isBestGamesEnabled =
    activeTab === '인기' || selectedValue.field === 'views';
  const isLatestGamesEnabled =
    activeTab !== '인기' && selectedValue.field !== 'views';

  const { bestGames } = useBestGameList(activeTab, isBestGamesEnabled);
  const { latestGames } = useLatestGameList(activeTab, isLatestGamesEnabled);

  const contents = bestGames || latestGames || [];

  const handleService = () => {
    setIsServicePreparing(true);

    setTimeout(() => {
      setIsServicePreparing(false);
    }, 2000);
  };

  const handleSearch = (query: string) => {
    navigate(`/result/search/all?query=${query}`);
  };

  const createBookmark = useLandingPageCreateBookmarkMutation(activeTab);
  const deleteBookmark = useLandingPageDeleteBookmarkMutation(activeTab);

  const handleBookmarkClick = useCallback(
    (content: GameContent) => {
      if (!content.id) return;

      if (content.bookmarked) {
        deleteBookmark.mutate(content.id);
      } else {
        createBookmark.mutate(content.id);
      }
    },
    [createBookmark, deleteBookmark],
  );

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
            onBookmarkClick={handleBookmarkClick}
          />
          <div css={S.floatingDropdownStyle}>
            <FloatingMenuButton />
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
            onBookmarkClick={handleBookmarkClick}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
