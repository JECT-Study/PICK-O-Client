import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@/assets';
import {
  pageBoxStyling,
  pageSelectedBoxStyling,
  paginationContainer,
} from './Pagination.style';

interface PaginationProps {
  pages: number[];
  selected: number;
  maxPage: number;
  onChangeNavigate: (page: number) => void;
}

const Pagination = ({
  pages,
  selected,
  maxPage,
  onChangeNavigate,
}: PaginationProps) => {
  if (maxPage <= 1) return null;

  const startPage = Math.floor((selected - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, maxPage);

  const nextGroup = endPage + 1;
  const prevGroup = startPage - 5;

  const displayedPages = pages.slice(startPage - 1, endPage);

  return (
    <div css={paginationContainer}>
      <button
        type="button"
        css={pageBoxStyling}
        onClick={() => onChangeNavigate(prevGroup)}
        disabled={startPage === 1}
      >
        {}
        <KeyboardArrowLeft />
      </button>

      {/* 현재 페이지 그룹(1-5, 6-10 등) */}
      {displayedPages.map((page) => (
        <button
          type="button"
          css={[pageBoxStyling, selected === page && pageSelectedBoxStyling]}
          key={page}
          onClick={() => onChangeNavigate(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        css={pageBoxStyling}
        onClick={() => onChangeNavigate(nextGroup)}
        disabled={endPage === maxPage}
      >
        {}
        <KeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
