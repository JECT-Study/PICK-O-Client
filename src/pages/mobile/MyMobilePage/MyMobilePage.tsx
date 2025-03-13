import React, { useState, useEffect, useMemo } from 'react';
import {
  TabType,
  ButtonType,
  BookmarkInfoItemResponse,
  CommentInfoItemResponse,
  VoteInfoItemResponse,
  WrittenInfoItemResponse,
  MyBalanceGameItem,
} from '@/types/mypages';
import ProfileInfoCard from '@/components/mobile/organisms/ProfileInfoCard/ProfileInfoCard';
import IconButtonArea from '@/components/mobile/organisms/IconButtonArea/IconButtonArea';
import DateGroupedList, {
  DateGroupedListItem,
} from '@/components/mobile/organisms/DateGroupedList/DateGroupedList';
import { useMyGameBookmarksQuery } from '@/hooks/api/mypages/useMyGameBookmarksQuery';
import { useMyGameVotesQuery } from '@/hooks/api/mypages/useMyGameVotesQuery';
import { useMyGameWrittensQuery } from '@/hooks/api/mypages/useMyGameWrittensQuery';
import { useMyTalkPickBookmarksQuery } from '@/hooks/api/mypages/useMyTalkPickBookmarksQuery';
import { useMyTalkPickCommentsQuery } from '@/hooks/api/mypages/useMyTalkPickCommentsQuery';
import { useMyTalkPickVotesQuery } from '@/hooks/api/mypages/useMyTalkPickVotesQuery';
import { useMyTalkPickWrittensQuery } from '@/hooks/api/mypages/useMyTalkPickWrittensQuery';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useObserver } from '@/hooks/api/mypages/useObserver';
import { ContentsButtonProps } from '@/components/molecules/ContentsButton/ContentsButton';
import DateGroupedCard from '@/components/mobile/organisms/DateGroupedCard/DateGroupedCard';
import SelectGroup, {
  SelectGroupItem,
} from '@/components/mobile/atoms/SelectGroup/SelectGroup';
import * as S from './MyMobilePage.style';

type InfiniteQueryOrNull<T> = UseInfiniteQueryResult<T, Error> | null;

type DateGroupedDataItem =
  | { date: string; items: DateGroupedListItem[] }
  | { date: string; items: ContentsButtonProps[] };

const MyMobilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('talkPick');
  const [activeButton, setActiveButton] = useState<ButtonType>('saved');
  const { member, isLoading: isMemberLoading } = useMemberQuery();

  const gameBookmarksQ = useMyGameBookmarksQuery({
    enabled: activeTab === 'balanceGame' && activeButton === 'saved',
  });
  const gameVotesQ = useMyGameVotesQuery(member!.id, {
    enabled: activeTab === 'balanceGame' && activeButton === 'voted',
  });
  const gameWrittensQ = useMyGameWrittensQuery({
    enabled: activeTab === 'balanceGame' && activeButton === 'created',
  });

  const talkPickBookmarksQ = useMyTalkPickBookmarksQuery({
    enabled: activeTab === 'talkPick' && activeButton === 'saved',
  });
  const talkPickCommentsQ = useMyTalkPickCommentsQuery({
    enabled: activeTab === 'talkPick' && activeButton === 'commented',
  });
  const talkPickVotesQ = useMyTalkPickVotesQuery({
    enabled: activeTab === 'talkPick' && activeButton === 'voted',
  });
  const talkPickWrittensQ = useMyTalkPickWrittensQuery({
    enabled: activeTab === 'talkPick' && activeButton === 'created',
  });

  const queryMap: Record<
    TabType,
    Partial<Record<ButtonType, InfiniteQueryOrNull<unknown>>>
  > = {
    balanceGame: {
      saved: gameBookmarksQ,
      voted: gameVotesQ,
      created: gameWrittensQ,
    },
    talkPick: {
      saved: talkPickBookmarksQ,
      voted: talkPickVotesQ,
      commented: talkPickCommentsQ,
      created: talkPickWrittensQ,
    },
  };

  const currentQuery =
    activeButton !== null ? queryMap[activeTab][activeButton] : null;

  const observerConfig = {
    current: {
      hasNextPage: currentQuery?.hasNextPage ?? false,
      isFetchingNextPage: currentQuery?.isFetchingNextPage ?? false,
      fetchNextPage: currentQuery?.fetchNextPage ?? (() => Promise.resolve()),
    },
  };
  const { ref: infiniteRef, isFetchingAnyNextPage } =
    useObserver(observerConfig);

  const [dateGroupedData, setDateGroupedData] = useState<DateGroupedDataItem[]>(
    [],
  );

  const mergedData = useMemo(() => {
    if (!currentQuery?.data) return undefined;
    const data = currentQuery.data as { pages: { content: unknown[] }[] };
    return { content: data.pages.flatMap((page) => page.content) };
  }, [currentQuery?.data]);

  useEffect(() => {
    setActiveButton('saved');
  }, [activeTab]);

  useEffect(() => {
    if (!mergedData || !mergedData.content) {
      setDateGroupedData([]);
      return;
    }

    if (activeTab === 'talkPick') {
      const talkPickItems = mergedData.content as (
        | BookmarkInfoItemResponse
        | CommentInfoItemResponse
        | VoteInfoItemResponse
        | WrittenInfoItemResponse
      )[];
      const groups: { [date: string]: DateGroupedListItem[] } = {};

      talkPickItems.forEach((item) => {
        const dateStr = item.editedAt || '날짜없음';
        const transformedItem: DateGroupedListItem = {
          id: item.id,
          title: item.title,
          imgUrl:
            item.imgUrls && item.imgUrls.length > 0
              ? item.imgUrls[0]
              : '/images/default-talkpick.png',
        };

        if (groups[dateStr]) {
          groups[dateStr].push(transformedItem);
        } else {
          groups[dateStr] = [transformedItem];
        }
      });

      const groupedData = Object.keys(groups)
        .sort((a, b) => (a < b ? 1 : -1))
        .map((date) => ({ date, items: groups[date] }));

      setDateGroupedData(groupedData);
    } else if (activeTab === 'balanceGame') {
      const balanceGameItems = mergedData.content as MyBalanceGameItem[];
      const newArr: { date: string; items: ContentsButtonProps[] }[] = [];

      balanceGameItems.forEach((item) => {
        const dateStr = item.editedAt || '날짜없음';

        const transformed: ContentsButtonProps = {
          id: String(item.gameId),
          title: item.title,
          images:
            item.optionAImg && item.optionBImg
              ? [item.optionAImg, item.optionBImg]
              : [],
          mainTag: item.mainTagName || '',
          subTag: item.subTag || '',
          onClick: () => {},
          onBookmarkClick: () => {},
          bookmarked: item.bookmarked ?? false,
          showBookmark: activeButton === 'saved' || activeButton === 'voted',
          size: 'extraSmall',
        };

        const existingGroup = newArr.find((group) => group.date === dateStr);
        if (existingGroup) {
          existingGroup.items.push(transformed);
        } else {
          newArr.push({ date: dateStr, items: [transformed] });
        }
      });
      setDateGroupedData(newArr);
    }
  }, [mergedData, activeTab, activeButton]);

  const handleButtonClick = (buttonId: ButtonType) => {
    setActiveButton(buttonId);
  };

  const selectGroupItems: [SelectGroupItem<TabType>, SelectGroupItem<TabType>] =
    [
      { label: '톡픽', value: 'talkPick' },
      { label: '밸런스게임', value: 'balanceGame' },
    ];

  if (isMemberLoading) return <div />;

  if (!currentQuery) {
    return <div />;
  }

  return (
    <div css={S.pageStyle}>
      <ProfileInfoCard
        imgUrl={member?.profileImgUrl ?? ''}
        username={member?.nickname ?? ''}
        postCount={member?.postsCount ?? 0}
        bookmarkCount={member?.bookmarkedPostsCount ?? 0}
        menuData={[]}
      />
      <div css={S.selectGroupWrapper}>
        <SelectGroup<TabType>
          items={selectGroupItems}
          selectedValue={activeTab}
          onSelect={(value) => setActiveTab(value)}
        />
      </div>
      <IconButtonArea
        activeTab={activeTab}
        activeButton={activeButton}
        onButtonClick={handleButtonClick}
      />
      <div css={S.contentWrapper}>
        {dateGroupedData.length > 0 ? (
          dateGroupedData.map(({ date, items }) =>
            activeTab === 'talkPick' ? (
              <DateGroupedList
                key={date}
                date={date}
                items={items as DateGroupedListItem[]}
              />
            ) : (
              <DateGroupedCard
                key={date}
                date={date}
                items={items as ContentsButtonProps[]}
              />
            ),
          )
        ) : (
          <p />
        )}
        <div ref={infiniteRef} style={{ marginTop: '16px' }}>
          {isFetchingAnyNextPage && <div />}
        </div>
      </div>
    </div>
  );
};

export default MyMobilePage;
