import React from 'react';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';
import { useObserver } from '@/hooks/api/mypages/useObserver';
import { SKELETON_ITEMS_DEFAULT } from '@/constants/mypage';
import { loader } from './InfiniteTalkPickList.style';

export interface InfiniteTalkPickListProps<T> {
  data?: {
    pages: Array<{ content: T[] }>;
  };
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  renderList: (items: T[]) => React.ReactNode;
}

const InfiniteTalkPickList = <T,>(props: InfiniteTalkPickListProps<T>) => {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    renderList,
  } = props;

  const queries = {
    talkPick: {
      hasNextPage,
      isFetchingNextPage,
      async fetchNextPage() {
        await fetchNextPage();
      },
    },
  };

  const { ref } = useObserver(queries);

  if (isLoading) {
    return <MypageListSkeleton count={SKELETON_ITEMS_DEFAULT} />;
  }

  if (!data) {
    return null;
  }

  const allContent = data.pages.flatMap((page) => page.content);

  return (
    <>
      {renderList(allContent)}
      <div ref={ref} css={loader} />
    </>
  );
};

export default InfiniteTalkPickList;
