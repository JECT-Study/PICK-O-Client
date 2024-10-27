import React, { ComponentPropsWithRef } from 'react';
import Chips from '@/components/atoms/Chips/Chips';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import * as S from './ContentsButton.style';

export interface ContentsButtonProps extends ComponentPropsWithRef<'div'> {
  title: string;
  mainTag: string;
  subTag: string;
  images: string[];
  size?: 'large' | 'small';
  bookmarked?: BookmarkProps['bookmarked'];
  showBookmark?: boolean;
}
const ContentsButton = ({
  title,
  mainTag,
  subTag,
  images,
  size = 'large',
  bookmarked = false,
  showBookmark = true,
  ...attributes
}: ContentsButtonProps) => {
  return (
    <div css={S.cardWrapper(size)} {...attributes}>
      <div css={S.imageContainer}>
        <div css={S.imageWrapper}>
          <img src={images[0]} alt="option A" css={S.image} />
        </div>
        <div css={S.imageWrapper}>
          <img src={images[1]} alt="option B" css={S.image} />
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
