import React, { useState } from 'react';
import * as S from '@/pages/SearchResultsPage/SearchResultsPage.style';
import SearchResultBarContainer from '@/components/organisms/SearchResultBarContainer/SearchResultBarContainer';
import Divider from '@/components/atoms/Divider/Divider';
import SearchTalkPickListSection from '@/components/organisms/SearchTalkPickListSection/SearchTalkPickListSection';
import { useSearchParams } from 'react-router-dom';
import { useTalkPickResultQuery } from '@/hooks/api/search/useTalkPickResultQuery';

const SearchTalkPickPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [selectedTag, setSelectedTag] = useState<'all' | 'talkpick' | 'game'>(
    'talkpick',
  );
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('views');
  const size = 10;

  const {
    content: talkPickResults,
    totalPages: talkPickTotalPages,
    isLoading,
  } = useTalkPickResultQuery(query, page, size, sort);

  const handleTagClick = (value: 'all' | 'talkpick' | 'game') => {
    setSelectedTag(value);
  };

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
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
