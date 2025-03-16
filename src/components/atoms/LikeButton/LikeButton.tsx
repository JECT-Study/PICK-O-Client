import React, { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import {
  LikeButtonDF,
  LikeButtonPR,
  MobileLikeButtonDF,
  MobileLikeButtonPR,
} from '@/assets';
import * as S from './LikeButton.style';

export interface LikeButtonProps extends ComponentPropsWithRef<'button'> {
  likeCount: number;
  likeState?: boolean;
  isMobile?: boolean;
}

const LikeButton = (
  {
    likeCount,
    likeState = false,
    isMobile = false,
    ...attributes
  }: LikeButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  let Icon;

  switch (true) {
    case likeState && isMobile:
      Icon = MobileLikeButtonPR;
      break;
    case likeState && !isMobile:
      Icon = LikeButtonPR;
      break;
    case !likeState && isMobile:
      Icon = MobileLikeButtonDF;
      break;
    case !likeState && !isMobile:
      Icon = LikeButtonDF;
      break;
    default:
      Icon = LikeButtonDF;
      break;
  }

  return (
    <button type="button" ref={ref} css={S.likeButton} {...attributes}>
      <Icon css={S.icon} />
      <span css={[S.defaultLabel, likeState && S.pressedLabel]}>
        {isMobile && likeCount === 0 ? '좋아요' : likeCount}
      </span>
    </button>
  );
};

export default forwardRef(LikeButton);
