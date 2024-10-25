import React, { useState } from 'react';
import * as S from '@/pages/SearchResultsPage/SearchResultsPage.style';
import SearchResultBarContainer from '@/components/organisms/SearchResultBarContainer/SearchResultBarContainer';
import Divider from '@/components/atoms/Divider/Divider';
import SearchTalkPickListSection from '@/components/organisms/SearchTalkPickListSection/SearchTalkPickListSection';
import { useSearchParams } from 'react-router-dom';
import { useTalkPickResultQuery } from '@/hooks/api/search/useTalkPickResultQuery';

const SearchGamePage = () => {
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
    setSearchParams({ query, page: (newPage - 1).toString() });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  };

  if (isLoading) {
    return <div>스켈레톤 준비중...</div>;
  }

  return (
    <div css={S.container}>
      <SearchResultBarContainer
        selectedValue={selectedTag}
        onClick={handleTagClick}
        onSearch={(newQuery) => searchParams.set('query', newQuery)}
      />
      <div css={S.dividerWrapper}>
        <Divider length={1133} orientation="width" />{' '}
      </div>
      <div css={S.resultsWrapper}>
        <SearchTalkPickListSection
          searchTalkPickList={talkPickResults}
          keyword={query}
          selectedPage={page + 1}
          totalPages={talkPickTotalPages}
          onPageChange={handlePageChange}
          sort={sort}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default SearchGamePage;
