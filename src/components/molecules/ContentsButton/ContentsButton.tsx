import React, { ComponentPropsWithRef } from 'react';
import Chips from '@/components/atoms/Chips/Chips';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import * as S from './ContentsButton.style';

export interface ContentsButtonProps extends ComponentPropsWithRef<'div'> {
  optionAImg: string;
  optionBImg: string;
  title: string;
  mainTag: string;
  subTag: string;
  bookmarked?: BookmarkProps['bookmarked'];
  showBookmark?: boolean;
  size?: 'large' | 'medium' | 'small';
}
const ContentsButton = ({
  optionAImg,
  optionBImg,
  title,
  mainTag,
  subTag,
  bookmarked = false,
  showBookmark = false,
  size = 'large',
  ...attributes
}: ContentsButtonProps) => {
  return (
    <div css={S.cardWrapper(size)} {...attributes}>
      <div css={S.imageContainer(size)}>
        <div css={S.imageWrapper}>
          <img src={optionAImg} alt="option A" css={S.image} />
        </div>
        <div css={S.imageWrapper}>
          <img src={optionBImg} alt="option B" css={S.image} />
        </div>
        <div css={S.chipsContainer}>
          <Chips>{subTag}</Chips>
          <Chips>{`#${mainTag}`}</Chips>
        </div>
      </div>
      <div css={S.infoContainer(size)}>
        <span css={S.label(size)}>{title}</span>
        {showBookmark && (
          <Bookmark bookmarked={bookmarked} css={S.bookmarkWrapper} />
        )}
      </div>
    </div>
  );
};

export default ContentsButton;
