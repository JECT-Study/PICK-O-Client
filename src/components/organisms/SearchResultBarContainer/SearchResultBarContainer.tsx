import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchResultBar from '@/components/molecules/SearchResultBar/SearchResultBar';
import { PATH } from '@/constants/path';

type SearchCategory = 'all' | 'talkpick' | 'game';

interface SearchResultBarContainerProps {
  selectedValue: SearchCategory;
  onClick: (value: SearchCategory) => void;
  onSearch: (query: string) => void;
}

const SearchResultBarContainer = ({
  selectedValue,
  onClick,
  onSearch,
}: SearchResultBarContainerProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const getSearchPath = (value: SearchCategory) => {
    return {
      all: `/result/${PATH.SEARCH.ALL}`,
      talkpick: `/result/${PATH.SEARCH.TALKPICK}`,
      game: `/result/${PATH.SEARCH.GAME}`,
    }[value];
  };

  const handleTagClick = (value: SearchCategory) => {
    onClick(value);
    navigate(`${getSearchPath(value)}?query=${searchParams.get('query')}`);
  };

  const handleSearch = (query: string) => {
    onSearch(query);
    navigate(`${getSearchPath(selectedValue)}?query=${query}`);
  };

  return (
    <SearchResultBar
      selectedValue={selectedValue}
      onClick={handleTagClick}
      onSearch={handleSearch}
      query={query}
    />
  );
};

export default SearchResultBarContainer;
