import React from 'react';
import { useTalkPickResultQuery } from '@/hooks/api/search/useTalkPickResultQuery';
import useSort from '@/hooks/search/useSort';
import useTagFilter from '@/hooks/search/useTagFilter';
import useSearchQuery from '@/hooks/search/useSearchQuery';
import usePagination from '@/hooks/search/usePagination';
import SearchResultBarContainer from '@/components/organisms/SearchResultBarContainer/SearchResultBarContainer';
import Divider from '@/components/atoms/Divider/Divider';
import SearchTalkPickListSection from '@/components/organisms/SearchTalkPickListSection/SearchTalkPickListSection';
import * as S from '@/pages/SearchResultsPage/SearchResultsPage.style';

const SearchTalkPickPage = () => {
  const { query, handleSearch } = useSearchQuery();
  const { selectedTag, handleTagClick } = useTagFilter('talkpick');
  const { page, handlePageChange } = usePagination();
  const { sort, handleSortChange } = useSort();
  const size = 10;

  const {
    content: talkPickResults,
    totalPages: talkPickTotalPages,
    isLoading,
  } = useTalkPickResultQuery(query, page, size, sort);

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
        <SearchTalkPickListSection
          searchTalkPickList={isLoading ? [] : talkPickResults}
          keyword={query}
          selectedPage={page + 1}
          totalPages={talkPickTotalPages}
          onPageChange={handlePageChange}
          sort={sort}
          onSortChange={handleSortChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SearchTalkPickPage;
