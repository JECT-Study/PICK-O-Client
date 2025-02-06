import React from 'react';
import { useMyTalkPickVotesQuery } from '@/hooks/api/mypages/useMyTalkPickVotesQuery';
import InfoList from '@/components/organisms/InfoList/InfoList';
import InfiniteTalkPickList from '@/components/organisms/InfiniteTalkPickList/InfiniteTalkPickList';
import { InfoItem } from '@/types/mypages';

const TalkPickVotes = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyTalkPickVotesQuery();

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

export default TalkPickVotes;
