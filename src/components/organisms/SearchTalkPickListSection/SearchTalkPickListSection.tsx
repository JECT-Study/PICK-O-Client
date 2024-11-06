/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ToggleGroup, {
  ToggleGroupItem,
} from '@/components/atoms/ToggleGroup/ToggleGroup';
import { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';
import SearchTalkPickList from '@/components/molecules/SearchTalkPickList/SearchTalkPickList';
import Pagination from '@/components/atoms/Pagination/Pagination';
import { generatePageNumbers } from '@/utils/pagination';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import * as S from './SearchTalkPickListSection.style';

interface SearchTalkPickSectionProps {
  searchTalkPickList: SearchTalkPickItemProps[];
  keyword: string;
  selectedPage: number;
  totalPages: number;
  sort: string;
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
  isLoading: boolean;
}

const SearchTalkPickListSection = ({
  searchTalkPickList,
  keyword,
  selectedPage,
  totalPages,
  sort,
  onPageChange,
  onSortChange,
  isLoading,
}: SearchTalkPickSectionProps) => {
  const toggleItem: ToggleGroupItem[] = [
    { label: '인기순', value: 'views' },
    { label: '최신순', value: 'createdAt' },
  ];

  const pages = generatePageNumbers(totalPages);

  if (isLoading) {
    return <div>스켈레톤 준비중...</div>;
  }

  if (searchTalkPickList.length === 0) {
    return (
      <div css={S.container}>
        <div css={S.noResultWrapper}>
          <NoResultsMessage searchChoice="talkPick" keyword={keyword} />
        </div>
      </div>
    );
  }

  return (
    <div css={S.container}>
      <div css={S.titleWrapper}>
        <div>톡픽</div>
        <ToggleGroup
          items={toggleItem}
          selectedValue={sort}
          onClick={onSortChange}
        />
      </div>
      <div css={S.contentWrapper}>
        <SearchTalkPickList
          searchTalkPickList={searchTalkPickList}
          keyword={keyword}
        />
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

export default SearchTalkPickListSection;
