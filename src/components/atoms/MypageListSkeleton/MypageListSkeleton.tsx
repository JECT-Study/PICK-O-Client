/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as S from './MypageListSkeleton.style';

interface MypageListSkeletonProps {
  count: number;
}

const MypageListSkeleton = ({ count = 8 }: MypageListSkeletonProps) => {
  return (
    <div css={S.listContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} css={S.listWrapper} />
      ))}
    </div>
  );
};

export default MypageListSkeleton;
