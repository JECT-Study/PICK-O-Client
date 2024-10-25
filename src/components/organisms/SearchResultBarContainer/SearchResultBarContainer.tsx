import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchResultBar from '@/components/molecules/SearchResultBar/SearchResultBar';
import { PATH } from '@/constants/path';

interface SearchResultBarContainerProps {
  selectedValue: 'all' | 'talkpick' | 'game';
  onClick: (value: 'all' | 'talkpick' | 'game') => void;
  onSearch: (query: string) => void;
}

const SearchResultBarContainer = ({
  selectedValue,
  onClick,
  onSearch,
}: SearchResultBarContainerProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getSearchPath = (value: 'all' | 'talkpick' | 'game') => {
    return {
      all: `/result/${PATH.SEARCH.ALL}`,
      talkpick: `/result/${PATH.SEARCH.TALKPICK}`,
      game: `/result/${PATH.SEARCH.GAME}`,
    }[value];
  };

  const handleTagClick = (value: 'all' | 'talkpick' | 'game') => {
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
    />
  );
};

export default SearchResultBarContainer;
