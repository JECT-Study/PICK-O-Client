import React from 'react';
import { useGameResultQuery } from '@/hooks/api/search/useGameResultQuery';
import useSort from '@/hooks/search/useSort';
import useTagFilter from '@/hooks/search/useTagFilter';
import useSearchQuery from '@/hooks/search/useSearchQuery';
import usePagination from '@/hooks/search/usePagination';
import SearchResultBarContainer from '@/components/organisms/SearchResultBarContainer/SearchResultBarContainer';
import Divider from '@/components/atoms/Divider/Divider';
import SearchGameListSection from '@/components/organisms/SearchGameListSection/SearchGameListSection';
import * as S from '@/pages/SearchResultsPage/SearchResultsPage.style';

const SearchGamePage = () => {
  const { query, handleSearch } = useSearchQuery();
  const { selectedTag, handleTagClick } = useTagFilter('game');
  const { page, handlePageChange } = usePagination();
  const { sort, handleSortChange } = useSort({ field: 'views', order: 'desc' });
  const size = 9;

  const {
    content: gameResults,
    totalPages: gameTotalPages,
    isLoading,
  } = useGameResultQuery(query, page - 1, size, sort);

  return (
    <div css={S.container}>
      <SearchResultBarContainer
        selectedValue={selectedTag}
        onClick={handleTagClick}
        onSearch={handleSearch}
      />
      <div css={S.dividerWrapper}>
        <Divider length={1133} orientation="width" />
      </div>
      <div css={S.resultsWrapper}>
        <SearchGameListSection
          gameList={isLoading ? [] : gameResults}
          keyword={query}
          selectedPage={page}
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
