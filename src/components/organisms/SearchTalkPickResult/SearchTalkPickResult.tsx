import React from 'react';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';
import SearchTalkPickList from '@/components/molecules/SearchTalkPickList/SearchTalkPickList';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import * as S from './SearchTalkPickResult.style';

interface SearchTalkPickResultProps {
  searchTalkPickList: SearchTalkPickItemProps[];
  keyword: string;
}

const SearchTalkPickResult = ({
  searchTalkPickList,
  keyword,
}: SearchTalkPickResultProps) => {
  const hasResults = searchTalkPickList.length > 0;

  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>톡픽</div>
        <MoreButton />
      </div>
      {hasResults ? (
        <SearchTalkPickList searchTalkPickList={searchTalkPickList} />
      ) : (
        <div css={S.contentWrapper}>
          <NoResultsMessage searchChoice="default" keyword={keyword} />
        </div>
      )}
    </div>
  );
};

export default SearchTalkPickResult;
