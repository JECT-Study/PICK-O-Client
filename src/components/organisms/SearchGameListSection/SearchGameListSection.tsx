import React, { useState } from 'react';
import ToggleGroup, {
  ToggleGroupItem,
} from '@/components/atoms/ToggleGroup/ToggleGroup';
import Pagination from '@/components/atoms/Pagination/Pagination';
import SearchGameList, {
  GameItem,
} from '@/components/molecules/SearchGameList/SearchGameList';
import { calculateTotalPages, generatePageNumbers } from '@/utils/pagination';
import * as S from './SearchGameListSection.style';

interface SearchGameListSectionProps {
  gameList: GameItem[];
}

const SearchGameListSection = ({ gameList }: SearchGameListSectionProps) => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<string>('trend');

  const toggleItem: ToggleGroupItem[] = [
    { label: '최신순', value: 'recent' },
    { label: '인기순', value: 'trend' },
  ];

  const gamesPerPage = 9;
  const totalPages = calculateTotalPages(gameList.length, gamesPerPage);
  const pages = generatePageNumbers(totalPages);

  const displayedItems = gameList.slice(
    (selectedPage - 1) * gamesPerPage,
    selectedPage * gamesPerPage,
  );

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
  };

  return (
    <div css={S.containerStyle}>
      <div css={S.titleWrapStyle}>
        <div>밸런스 게임</div>
        <ToggleGroup
          items={toggleItem}
          selectedValue={selectedValue}
          onClick={setSelectedValue}
        />
      </div>
      <div>
        <SearchGameList gameList={displayedItems} />
      </div>
      <div css={S.paginationWrapStyle}>
        <Pagination
          pages={pages}
          selected={selectedPage}
          maxPage={totalPages}
          onChangeNavigate={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchGameListSection;
