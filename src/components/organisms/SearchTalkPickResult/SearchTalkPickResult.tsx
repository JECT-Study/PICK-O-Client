import React from 'react';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import { SearchTalkPickListItem } from '@/types/search';
import SearchTalkPickList from '@/components/molecules/SearchTalkPickList/SearchTalkPickList';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH } from '@/constants/path';
import SearchResultListSkeleton from '@/components/atoms/SearchResultListSkeleton/SearchResultListSkeleton';
import * as S from './SearchTalkPickResult.style';

interface SearchTalkPickResultProps {
  searchTalkPickList: SearchTalkPickListItem[];
  keyword: string;
  isLoading: boolean;
}

const SearchTalkPickResult = ({
  searchTalkPickList,
  keyword,
  isLoading,
}: SearchTalkPickResultProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasResults = searchTalkPickList.length > 0;

  const handleButtonClick = () => {
    navigate(
      `/result/${PATH.SEARCH.TALKPICK}?query=${searchParams.get('query')}`,
    );
  };

  if (isLoading) {
    return (
      <div css={S.container}>
        <div css={S.titleWrapper}>
          <div>톡픽</div>
          <MoreButton onClick={handleButtonClick} />
        </div>
        <SearchResultListSkeleton length={4} />
      </div>
    );
  }

  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>톡픽</div>
        <MoreButton onClick={handleButtonClick} />
      </div>
      {hasResults ? (
        <SearchTalkPickList
          searchTalkPickList={searchTalkPickList}
          keyword={keyword}
        />
      ) : (
        <div css={S.contentWrapper}>
          <NoResultsMessage searchChoice="default" keyword={keyword} />
        </div>
      )}
    </div>
  );
};

export default SearchTalkPickResult;
