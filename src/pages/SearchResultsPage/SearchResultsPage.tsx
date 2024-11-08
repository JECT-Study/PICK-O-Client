import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchGameResult from '@/components/organisms/SearchGameResult/SearchGameResult';
import SearchTalkPickResult from '@/components/organisms/SearchTalkPickResult/SearchTalkPickResult';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import { useTalkPickResultQuery } from '@/hooks/api/search/useTalkPickResultQuery';
import { useGameResultQuery } from '@/hooks/api/search/useGameResultQuery';
import useTagFilter from '@/hooks/game/useTagFilter';
import Divider from '@/components/atoms/Divider/Divider';
import SearchResultBarContainer from '@/components/organisms/SearchResultBarContainer/SearchResultBarContainer';

import * as S from './SearchResultsPage.style';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { selectedTag, handleTagClick } = useTagFilter('all');
  const page = 0;
  const size = 4;
  const sort = 'all';

  const { content: talkPickResults, isLoading: isTalkPickLoading } =
    useTalkPickResultQuery(query, page, size, sort);
  const { content: gameResults, isLoading: isGameLoading } = useGameResultQuery(
    query,
    page,
    size,
    sort,
  );

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  const renderResults = () => {
    if (isTalkPickLoading || isGameLoading) {
      return null;
    }

    const noTalkPickResults = talkPickResults.length === 0;
    const noGameResults = gameResults.length === 0;

    if (selectedTag === 'all' && noTalkPickResults && noGameResults) {
      return (
        <div css={S.noResultsWrapper}>
          <NoResultsMessage searchChoice="default" keyword={query} />
        </div>
      );
    }

    return (
      <div css={S.resultsWrapper}>
        <SearchTalkPickResult
          searchTalkPickList={talkPickResults}
          keyword={query}
        />
        <SearchGameResult gameList={gameResults} keyword={query} />
      </div>
    );
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
      <div css={S.resultsWrapper}>{renderResults()}</div>
    </div>
  );
};

export default SearchResultsPage;
