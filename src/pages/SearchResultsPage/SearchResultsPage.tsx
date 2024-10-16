import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResultBar from '@/components/molecules/SearchResultBar/SearchResultBar';
import SearchGameResult from '@/components/organisms/SearchGameResult/SearchGameResult';
import SearchTalkPickResult from '@/components/organisms/SearchTalkPickResult/SearchTalkPickResult';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import SearchTalkPickListSection from '@/components/organisms/SearchTalkPickListSection/SearchTalkPickListSection';
import SearchGameListSection from '@/components/organisms/SearchGameListSection/SearchGameListSection';
import { useTalkPickResultQuery } from '@/hooks/api/search/useTalkPickResultQuery';
import { useGameResultQuery } from '@/hooks/api/search/useGameResultQuery';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './SearchResultsPage.style';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [selectedValue, setSelectedValue] = useState<
    'all' | 'talkpick' | 'game'
  >('all');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('views');

  const size = (() => {
    switch (selectedValue) {
      case 'all':
        return 4;
      case 'talkpick':
        return 10;
      case 'game':
        return 9;
      default:
        return 4;
    }
  })();

  const {
    content: talkPickResults,
    totalPages: talkPickTotalPages,
    isLoading: isTalkPickLoading,
  } = useTalkPickResultQuery(
    query,
    page,
    size,
    sort,
    selectedValue === 'talkpick' || selectedValue === 'all',
  );

  const {
    content: gameResults,
    totalPages: gameTotalPages,
    isLoading: isGameLoading,
  } = useGameResultQuery(
    query,
    page,
    size,
    sort,
    selectedValue === 'game' || selectedValue === 'all',
  );

  const handleTabClick = (newTab: 'all' | 'talkpick' | 'game') => {
    setSelectedValue(newTab);
    setPage(1);
  };

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderResults = () => {
    if (isTalkPickLoading || isGameLoading) {
      return null;
    }

    const noTalkPickResults = talkPickResults.length === 0;
    const noGameResults = gameResults.length === 0;

    if (selectedValue === 'all' && noTalkPickResults && noGameResults) {
      return (
        <div css={S.noResultsWrapper}>
          <NoResultsMessage searchChoice="default" keyword={query} />
        </div>
      );
    }

    switch (selectedValue) {
      case 'all':
        return (
          <>
            <SearchTalkPickResult
              searchTalkPickList={talkPickResults}
              keyword={query}
            />
            <SearchGameResult gameList={gameResults} keyword={query} />
          </>
        );
      case 'talkpick':
        return (
          <SearchTalkPickListSection
            searchTalkPickList={talkPickResults}
            keyword={query}
            selectedPage={page}
            totalPages={talkPickTotalPages}
            onPageChange={handlePageChange}
            sort={sort}
            onSortChange={handleSortChange}
          />
        );
      case 'game':
        return (
          <SearchGameListSection
            gameList={gameResults}
            keyword={query}
            selectedPage={page}
            totalPages={gameTotalPages}
            sort={sort}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div css={S.container}>
      <SearchResultBar
        selectedValue={selectedValue}
        onClick={handleTabClick}
        onSearch={handleSearch}
      />
      <div css={S.dividerWrapper}>
        <Divider length={1133} orientation="width" />{' '}
      </div>
      <div css={S.resultsWrapper}>{renderResults()}</div>
    </div>
  );
};

export default SearchResultsPage;
