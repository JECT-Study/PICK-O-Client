import React from 'react';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { useObserver } from '@/hooks/api/mypages/useObserver';
import type { MyBalanceGameItem } from '@/types/mypages';
import { loader } from './InfiniteBalanceGameList.style';

interface InfiniteBalanceGameListProps {
  data?: {
    pages: Array<{ content: MyBalanceGameItem[] }>;
  };
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  onBookmarkClick?: (item: MyBalanceGameItem) => void;
}

const InfiniteBalanceGameList = (props: InfiniteBalanceGameListProps) => {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    onBookmarkClick,
  } = props;

  const queries = {
    game: {
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage: async () => {
        await fetchNextPage();
      },
    },
  };

  const { ref } = useObserver(queries);

  if (isLoading) {
    return <MypageCardSkeleton />;
  }

  if (!data) {
    return null;
  }

  const allContent = data.pages.flatMap((page) => page.content);

  return (
    <>
      <MyBalanceGameList items={allContent} onBookmarkClick={onBookmarkClick} />
      <div ref={ref} css={loader} />
    </>
  );
};

export default InfiniteBalanceGameList;
