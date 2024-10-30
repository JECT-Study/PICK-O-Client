/* eslint-disable react/no-array-index-key */
import React from 'react';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './SearchResultListSkeleton.style';

interface SearchResultListSkeletonProps {
  length: number;
}

const SearchResultListSkeleton = ({
  length,
}: SearchResultListSkeletonProps) => {
  return (
    <div css={S.listContainer}>
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <div css={S.contentContainer}>
            <div css={S.leftContainer}>
              <div css={S.topWrapper} />
              <div css={S.bottomWrapper} />
            </div>
            <div css={S.imageWrapper} />
          </div>
          {index < length - 1 && <Divider orientation="width" length={1065} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SearchResultListSkeleton;
