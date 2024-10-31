/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as S from './SearchResultCardSkeleton.style';

interface SearchResultCardSkeletonProps {
  count: number;
}

const SearchResultCardSkeleton = ({
  count = 9,
}: SearchResultCardSkeletonProps) => {
  return (
    <div css={S.gridContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} css={S.cardWrapper} />
      ))}
    </div>
  );
};

export default SearchResultCardSkeleton;
