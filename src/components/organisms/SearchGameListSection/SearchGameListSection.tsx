import React from 'react';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import Pagination from '@/components/atoms/Pagination/Pagination';
import SearchGameList, {
  GameItem,
} from '@/components/molecules/SearchGameList/SearchGameList';
import { generatePageNumbers } from '@/utils/pagination';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import SearchResultCardSkeleton from '@/components/atoms/SearchResultCardSkeleton/SearchResultCardSkeleton';
import * as S from './SearchGameListSection.style';

interface SearchGameListSectionProps {
  gameList: GameItem[];
  keyword: string;
  selectedPage: number;
  totalPages: number;
  sort: string;
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
  isLoading: boolean;
}

const SearchGameListSection = ({
  gameList,
  keyword,
  selectedPage,
  totalPages,
  sort,
  onPageChange,
  onSortChange,
  isLoading,
}: SearchGameListSectionProps) => {
  const pages = generatePageNumbers(totalPages);

  if (isLoading) {
    return (
      <div css={S.container}>
        <div css={S.titleWrapper}>
          <div>밸런스게임</div>
          <ToggleGroup selectedValue={sort} onClick={onSortChange} />
        </div>
        <div css={S.contentWrapper}>
          <SearchResultCardSkeleton count={9} />
        </div>
        <div css={S.paginationWrapper}>
          <Pagination
            pages={pages}
            selected={selectedPage}
            maxPage={totalPages}
            onChangeNavigate={onPageChange}
          />
        </div>
      </div>
    );
  }

  if (gameList.length === 0) {
    return (
      <div css={S.container}>
        <div css={S.noResultWrapper}>
          <NoResultsMessage searchChoice="balanceGame" keyword={keyword} />
        </div>
      </div>
    );
  }

  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>밸런스게임</div>
        <ToggleGroup selectedValue={sort} onClick={onSortChange} />
      </div>
      <div css={S.contentWrapper}>
        <SearchGameList gameList={gameList} keyword={keyword} />
      </div>
      <div css={S.paginationWrapper}>
        <Pagination
          pages={pages}
          selected={selectedPage}
          maxPage={totalPages}
          onChangeNavigate={onPageChange}
        />
      </div>
    </div>
  );
};

export default SearchGameListSection;
