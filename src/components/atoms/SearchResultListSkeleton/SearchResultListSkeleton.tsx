/* eslint-disable react/no-array-index-key */
import React from 'react';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './SearchResultListSkeleton.style';

const SearchResultListSkeleton = () => {
  return (
    <div css={S.listContainer}>
      {Array.from({ length: 10 }).map((_, index) => (
        <React.Fragment key={index}>
          <div css={S.contentContainer}>
            <div css={S.leftContainer}>
              <div css={S.topWrapper} />
              <div css={S.bottomWrapper} />
            </div>
            <div css={S.imageWrapper} />
          </div>
          {index < 9 && <Divider orientation="width" length={1065} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SearchResultListSkeleton;
