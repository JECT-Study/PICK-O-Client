import React from 'react';
import * as S from './MypageCardSkeleton.style';

const MypageCardSkeleton = () => {
  return (
    <div>
      <div css={S.dateWrapper} />
      <div css={S.cardContainer}>
        <div css={S.cardWrapper} />
        <div css={S.cardWrapper} />
      </div>
      <div css={S.cardWrapper} />
      <div css={S.dateWrapper} />
      <div css={S.cardWrapper} />
    </div>
  );
};

export default MypageCardSkeleton;
