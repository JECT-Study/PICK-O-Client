import React from 'react';
import { useMyTalkPickCommentsQuery } from '@/hooks/api/mypages/useMyTalkPickCommentsQuery';
import InfoList from '@/components/organisms/InfoList/InfoList';
import InfiniteTalkPickList from '@/components/organisms/InfiniteTalkPickList/InfiniteTalkPickList';
import { InfoItem } from '@/types/mypages';

const TalkPickComments = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyTalkPickCommentsQuery();

  const renderInfoList = (items: InfoItem[]) => {
    return <InfoList items={items} />;
  };

  return (
    <InfiniteTalkPickList
      data={data}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      renderList={renderInfoList}
    />
  );
};

export default TalkPickComments;
