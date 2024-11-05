import React from 'react';
import ToggleGroup, {
  ToggleGroupItem,
} from '@/components/atoms/ToggleGroup/ToggleGroup';
import Pagination from '@/components/atoms/Pagination/Pagination';
import SearchGameList, {
  GameItem,
} from '@/components/molecules/SearchGameList/SearchGameList';
import { generatePageNumbers } from '@/utils/pagination';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
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
  const toggleItem: ToggleGroupItem[] = [
    { label: '인기순', value: 'views' },
    { label: '최신순', value: 'createdAt' },
  ];

  const pages = generatePageNumbers(totalPages);

  if (isLoading) {
    return <div>스켈레톤 준비중...</div>;
  }

  if (gameList.length === 0) {
    return (
      <div css={S.noResultWrapper}>
        <NoResultsMessage searchChoice="balanceGame" keyword={keyword} />
      </div>
    );
  }

  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>밸런스게임</div>
        <ToggleGroup
          items={toggleItem}
          selectedValue={sort}
          onClick={onSortChange}
        />
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
