import React from 'react';
import { useMyTalkPickWrittensQuery } from '@/hooks/api/mypages/useMyTalkPickWrittensQuery';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import InfiniteTalkPickList from '@/components/organisms/InfiniteTalkPickList/InfiniteTalkPickList';
import { MyContentItem } from '@/types/mypages';

const TalkPickWritten = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyTalkPickWrittensQuery();

  const renderMyContentList = (items: MyContentItem[]) => {
    return <MyContentList items={items} />;
  };

  return (
    <InfiniteTalkPickList
      data={data}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      renderList={renderMyContentList}
    />
  );
};

export default TalkPickWritten;
