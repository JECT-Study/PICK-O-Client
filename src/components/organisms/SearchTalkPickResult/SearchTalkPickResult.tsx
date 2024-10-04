import React from 'react';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';
import SearchTalkPickList from '@/components/molecules/SearchTalkPickList/SearchTalkPickList';
import * as S from './SearchTalkPickResult.style';

interface SearchTalkPickResultProps {
  searchTalkPickList: SearchTalkPickItemProps[];
}

const SearchTalkPickResult = ({
  searchTalkPickList,
}: SearchTalkPickResultProps) => {
  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>톡픽</div>
        <MoreButton />
      </div>
      <div>
        <SearchTalkPickList searchTalkPickList={searchTalkPickList} />
      </div>
    </div>
  );
};

export default SearchTalkPickResult;
