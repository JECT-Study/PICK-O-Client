import React from 'react';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import { SearchTalkPickListItem } from '@/types/search';
import SearchTalkPickList from '@/components/molecules/SearchTalkPickList/SearchTalkPickList';
import Pagination from '@/components/atoms/Pagination/Pagination';
import { generatePageNumbers } from '@/utils/pagination';
import { NoResultsMessage } from '@/components/atoms/NoResultsMessage/NoResultsMessage';
import SearchResultListSkeleton from '@/components/atoms/SearchResultListSkeleton/SearchResultListSkeleton';
import { ToggleGroupValue } from '@/types/toggle';
import * as S from './SearchTalkPickListSection.style';

interface SearchTalkPickSectionProps {
  searchTalkPickList: SearchTalkPickListItem[];
  keyword: string;
  selectedPage: number;
  totalPages: number;
  sort: ToggleGroupValue;
  onPageChange: (page: number) => void;
  onSortChange: (sort: ToggleGroupValue) => void;
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
  const pages = generatePageNumbers(totalPages);

  if (isLoading) {
    return (
      <div css={S.container}>
        <div css={S.titleWrapper}>
          <div>톡픽</div>
          <ToggleGroup selectedValue={sort} onClick={onSortChange} />
        </div>
        <div css={S.contentWrapper}>
          <SearchResultListSkeleton length={10} />
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
        <ToggleGroup selectedValue={sort} onClick={onSortChange} />
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
