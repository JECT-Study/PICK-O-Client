/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as S from './MypageListSkeleton.style';

const MypageListSkeleton = () => {
  return (
    <div css={S.listContainer}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} css={S.listWrapper} />
      ))}
    </div>
  );
};

export default MypageListSkeleton;
