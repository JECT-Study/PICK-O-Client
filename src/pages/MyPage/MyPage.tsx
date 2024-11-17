import React, { useState, useMemo, useEffect } from 'react';
import SideBar from '@/components/organisms/SideBar/SideBar';
import OptionBar from '@/components/organisms/OptionBar/OptionBar';
import MyContentList, {
  MyContentItem,
} from '@/components/organisms/MyContentList/MyContentList';
import InfoList, { InfoItem } from '@/components/organisms/InfoList/InfoList';
import MyBalanceGameList, {
  MyBalanceGameItem,
} from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { OptionKeys, optionSets } from '@/constants/optionSets';
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
import { useSearchParams } from 'react-router-dom';
import * as S from './MyPage.style';

const MyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 초기 상태 가져오기
  const initialGroup =
    (searchParams.get('group') as OptionKeys) || OptionKeys.TALK_PICK;
  const initialOption =
    searchParams.get('option') || optionSets[initialGroup][0];

  // 변경 가능한 상태로 관리
  const [selectedGroup, setSelectedGroup] = useState<OptionKeys>(initialGroup);
  const [selectedOption, setSelectedOption] = useState<string>(initialOption);

  // URL 동기화
  useEffect(() => {
    setSearchParams({ group: selectedGroup, option: selectedOption });
  }, [selectedGroup, selectedOption, setSearchParams]);

  // 그룹 변경 핸들러
  const handleGroupSelect = (group: OptionKeys) => {
    setSelectedGroup(group);
    setSelectedOption(optionSets[group][0]); // 그룹 변경 시, 옵션을 기본값으로 초기화
  };

  // 옵션 변경 핸들러
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

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

  const { ref, isFetchingAnyNextPage } = useObserver(queries);

  const queryResult = useMemo(() => {
    if (selectedGroup === OptionKeys.TALK_PICK) {
      switch (selectedOption) {
        case '내가 저장한':
          return queries.myBookmarks.myBookmarks;
        case '내가 투표한':
          return queries.myVotes.myVote;
        case '내가 댓글단':
          return queries.myComments.myComments;
        case '내가 작성한':
          return queries.myWrittens.myWritten;
      }
    } else if (selectedGroup === OptionKeys.BALANCE_GAME) {
      switch (selectedOption) {
        case '내가 저장한':
          return queries.gameBookmarks.gameBookmark;
        case '내가 투표한':
          return queries.gameVotes.gameVote;
        case '내가 만든':
          return queries.gameWrittens.gameWritten;
        default:
          return null;
      }
    }
    return null;
  }, [
    selectedGroup,
    selectedOption,
    myBookmarksQuery,
    myVotesQuery,
    myCommentsQuery,
    myWrittensQuery,
    gameBookmarksQuery,
    gameVotesQuery,
    gameWrittensQuery,
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
      return <div>표시할 페이지가 없습니다</div>;
    }

    if (selectedGroup === OptionKeys.TALK_PICK) {
      if (
        selectedOption === '내가 저장한' ||
        selectedOption === '내가 작성한'
      ) {
        const content = queryResult.content as MyContentItem[];
        return <MyContentList items={content} />;
      }
      if (
        selectedOption === '내가 투표한' ||
        selectedOption === '내가 댓글단'
      ) {
        const content = queryResult.content as InfoItem[];
        return <InfoList items={content} />;
      }
    } else if (selectedGroup === OptionKeys.BALANCE_GAME) {
      const content = queryResult.content as MyBalanceGameItem[];
      return <MyBalanceGameList items={content} />;
    }

    return <div>표시할 페이지가 없습니다</div>;
  };

  return (
    <div css={S.pageContainer}>
      {isLoading ? (
        <SideBar isLoading />
      ) : (
        memberInfo && (
          <SideBar
            nickname={memberInfo.nickname}
            profileImageUrl={memberInfo.profileImageUrl}
            postsCount={memberInfo.postsCount}
            bookmarkedPostsCount={memberInfo.bookmarkedPostsCount}
          />
        )
      )}
      <div css={S.contentWrapper}>
        <OptionBar
          selectGroupItems={[
            { label: '톡픽', value: OptionKeys.TALK_PICK },
            { label: '밸런스 게임', value: OptionKeys.BALANCE_GAME },
          ]}
          selectedGroup={selectedGroup}
          selectedOption={selectedOption}
          onGroupSelect={handleGroupSelect}
          onOptionSelect={handleOptionSelect}
        />
        <div css={S.contentList}>{renderContent()}</div>
        <div ref={ref} css={S.loader}>
          {isFetchingAnyNextPage && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
