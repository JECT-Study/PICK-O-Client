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
import { ERROR, NOTICE } from '@/constants/message';
import FloatingMenuButton from '@/components/mobile/molecules/FloatingMenuButton/FloatingMenuButton';
import useIsMobile from '@/hooks/common/useIsMobile';
import { useQueryClient } from '@tanstack/react-query';
import { GameContent } from '@/types/game';
import { useCreateBookmarkMutation } from '@/hooks/api/bookmark/useCreateBookmarkMutation';
import { useDeleteBookmarkMutation } from '@/hooks/api/bookmark/useDeleteBookmarkMutation';
import { BookmarkContext } from '@/types/bookmarks';
import * as S from './LandingPage.style';

const LandingPage = () => {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const createBookmark = useCreateBookmarkMutation();
  const deleteBookmark = useDeleteBookmarkMutation();

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

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/result/search/all?query=${query}`);
  };

  // onMutate 반환 타입은 BookmarkContext
  const handleBookmarkClick = useCallback(
    (content: GameContent) => {
      if (!content.id) return;
      const isUnbookmarking = content.bookmarkState;
      const mutation = isUnbookmarking ? deleteBookmark : createBookmark;

      mutation.mutate(content.id, {
        onMutate: (variables: number): BookmarkContext => {
          const prevBest = queryClient.getQueryData<GameContent[]>([
            'bestGames',
            activeTab,
          ]);
          const prevLatest = queryClient.getQueryData<GameContent[]>([
            'latestGames',
            activeTab,
          ]);

          if (prevBest) {
            const updatedBest = prevBest.map((item) =>
              item.id === variables
                ? { ...item, bookmarkState: !isUnbookmarking }
                : item,
            );
            queryClient.setQueryData(['bestGames', activeTab], updatedBest);
          }
          if (prevLatest) {
            const updatedLatest = prevLatest.map((item) =>
              item.id === variables
                ? { ...item, bookmarkState: !isUnbookmarking }
                : item,
            );
            queryClient.setQueryData(['latestGames', activeTab], updatedLatest);
          }

          return { prevBest, prevLatest };
        },
        onError: (error, variables, context) => {
          if (context?.prevBest) {
            queryClient.setQueryData(
              ['bestGames', activeTab],
              context.prevBest,
            );
          }
          if (context?.prevLatest) {
            queryClient.setQueryData(
              ['latestGames', activeTab],
              context.prevLatest,
            );
          }
          alert(
            isUnbookmarking
              ? ERROR.BOOKMARK.GAME_DELETE_FAIL
              : ERROR.BOOKMARK.GAME_FAIL,
          );
        },
        onSuccess: () => {
          alert(isUnbookmarking ? '북마크 해제 완료!' : '북마크 등록 완료!');
        },
        onSettled: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['bestGames', activeTab],
          });
          await queryClient.invalidateQueries({
            queryKey: ['latestGames', activeTab],
          });
        },
      });
    },
    [activeTab, createBookmark, deleteBookmark, queryClient],
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
