/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as S from './SearchResultCardSkeleton.style';

const SearchResultCardSkeleton = () => {
  return (
    <div css={S.gridContainer}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} css={S.cardWrapper} />
      ))}
    </div>
  );
};

export default SearchResultCardSkeleton;
