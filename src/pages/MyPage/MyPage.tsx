import React, { useMemo } from 'react';
import SideBar from '@/components/organisms/SideBar/SideBar';
import OptionBar from '@/components/organisms/OptionBar/OptionBar';
import MyContentList, {
  MyContentItem,
} from '@/components/organisms/MyContentList/MyContentList';
import InfoList, { InfoItem } from '@/components/organisms/InfoList/InfoList';
import MyBalanceGameList, {
  MyBalanceGameItem,
} from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { OptionKeys } from '@/constants/optionSets';
import { useMyVotesQuery } from '@/hooks/api/mypages/useMyVotesQuery';
import { useMyCommentsQuery } from '@/hooks/api/mypages/useMyCommentsQuery';
import { useMyWrittensQuery } from '@/hooks/api/mypages/useMyWrittensQuery';
import { useMyBookmarksQuery } from '@/hooks/api/mypages/useMyBookmarksQuery';
import { useGameBookmarksQuery } from '@/hooks/api/mypages/useGameBookmarksQuery';
import { useGameWrittensQuery } from '@/hooks/api/mypages/useGameWrittensQuery';
import { useGameVotesQuery } from '@/hooks/api/mypages/useGameVotesQuery';
import { useMyInfoQuery } from '@/hooks/api/mypages/useMyInfoQuery';
import { useObserver } from '@/hooks/api/mypages/useObserver';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';
import { useMyPageOptions } from '@/hooks/mypages/useMyPageOptions';
import * as S from './MyPage.style';

const MyPage = () => {
  const {
    selectedGroup,
    selectedOption,
    options,
    handleGroupSelect,
    handleOptionSelect,
  } = useMyPageOptions();

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);
  const memberId: number = member!.id;
  const { memberInfo, isLoading } = useMyInfoQuery(memberId);
  const myBookmarksQuery = useMyBookmarksQuery();
  const myVotesQuery = useMyVotesQuery();
  const myCommentsQuery = useMyCommentsQuery();
  const myWrittensQuery = useMyWrittensQuery();
  const gameBookmarksQuery = useGameBookmarksQuery();
  const gameVotesQuery = useGameVotesQuery();
  const gameWrittensQuery = useGameWrittensQuery();

  const queries = {
    myBookmarks: myBookmarksQuery,
    myVotes: myVotesQuery,
    myComments: myCommentsQuery,
    myWrittens: myWrittensQuery,
    gameBookmarks: gameBookmarksQuery,
    gameVotes: gameVotesQuery,
    gameWrittens: gameWrittensQuery,
  };

  const isQueryLoading = Object.values(queries).some(
    (query) => query.isLoading,
  );

  const { ref } = useObserver(queries);

  const queryResult = useMemo(() => {
    if (selectedGroup === OptionKeys.TALK_PICK) {
      switch (selectedOption) {
        case 'bookmarks':
          return queries.myBookmarks.myBookmarks;
        case 'votes':
          return queries.myVotes.myVote;
        case 'comments':
          return queries.myComments.myComments;
        case 'written':
          return queries.myWrittens.myWritten;
        default:
          return null;
      }
    } else if (selectedGroup === OptionKeys.BALANCE_GAME) {
      switch (selectedOption) {
        case 'bookmarks':
          return queries.gameBookmarks.gameBookmark;
        case 'votes':
          return queries.gameVotes.gameVote;
        case 'written':
          return queries.gameWrittens.gameWritten;
        default:
          return null;
      }
    }
    return null;
  }, [
    selectedGroup,
    selectedOption,
    queries.myBookmarks.myBookmarks,
    queries.myVotes.myVote,
    queries.myComments.myComments,
    queries.myWrittens.myWritten,
    queries.gameBookmarks.gameBookmark,
    queries.gameVotes.gameVote,
    queries.gameWrittens.gameWritten,
  ]);

  const renderContent = () => {
    if (isQueryLoading) {
      const skeletonCount = queryResult?.content?.length || 8;
      if (selectedGroup === OptionKeys.TALK_PICK) {
        return <MypageListSkeleton count={skeletonCount} />;
      }
      if (selectedGroup === OptionKeys.BALANCE_GAME) {
        return <MypageCardSkeleton />;
      }
    }

    if (!queryResult) {
      return null;
    }

    if (selectedGroup === OptionKeys.TALK_PICK) {
      if (selectedOption === 'bookmarks' || selectedOption === 'written') {
        const content = queryResult.content as MyContentItem[];
        return <MyContentList items={content} />;
      }
      if (selectedOption === 'votes' || selectedOption === 'comments') {
        const content = queryResult.content as InfoItem[];
        return <InfoList items={content} />;
      }
    } else if (selectedGroup === OptionKeys.BALANCE_GAME) {
      const content = queryResult.content as MyBalanceGameItem[];
      return <MyBalanceGameList items={content} />;
    }

    return null;
  };

  return (
    <div css={S.pageContainer}>
      {isLoading ? (
        <SideBar isLoading />
      ) : (
        <SideBar isLoading={false} {...memberInfo} />
      )}
      <div css={S.contentWrapper}>
        <OptionBar
          selectedGroup={selectedGroup}
          selectedOption={selectedOption}
          options={options}
          onGroupSelect={handleGroupSelect}
          onOptionSelect={handleOptionSelect}
        />
        <div css={S.contentList}>{renderContent()}</div>
        <div ref={ref} css={S.loader} />
      </div>
    </div>
  );
};

export default MyPage;
