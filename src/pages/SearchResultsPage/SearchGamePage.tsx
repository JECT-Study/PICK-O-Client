import * as S from '@/pages/SearchResultsPage/SearchResultsPage.style';
import SearchResultBarContainer from '@/components/organisms/SearchResultBarContainer/SearchResultBarContainer';
import Divider from '@/components/atoms/Divider/Divider';
import React, { useState } from 'react';
import SearchGameListSection from '@/components/organisms/SearchGameListSection/SearchGameListSection';
import { useSearchParams } from 'react-router-dom';
import { useGameResultQuery } from '@/hooks/api/search/useGameResultQuery';

const SearchGamePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [selectedTag, setSelectedTag] = useState<'all' | 'talkpick' | 'game'>(
    'game',
  );
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('views');
  const size = 9;

  const {
    content: gameResults,
    totalPages: gameTotalPages,
    isLoading,
  } = useGameResultQuery(query, page, size, sort);

  const handleTagClick = (value: 'all' | 'talkpick' | 'game') => {
    setSelectedTag(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
    setSearchParams({ query, page: (newPage - 1).toString() });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  };

  return (
    <div css={S.container}>
      <SearchResultBarContainer
        selectedValue={selectedTag}
        onClick={handleTagClick}
        onSearch={(newQuery) => searchParams.set('query', newQuery)}
      />
      <div css={S.dividerWrapper}>
        <Divider length={1133} orientation="width" />
      </div>
      <div css={S.resultsWrapper}>
        <SearchGameListSection
          gameList={isLoading ? [] : gameResults}
          keyword={query}
          selectedPage={page + 1}
          totalPages={gameTotalPages}
          sort={sort}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SearchGamePage;
