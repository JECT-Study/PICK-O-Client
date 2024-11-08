import React, { ComponentPropsWithRef } from 'react';
import Chips from '@/components/atoms/Chips/Chips';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import { highlightText } from '@/utils/highlightText';
import * as S from './ContentsButton.style';

export interface ContentsButtonProps extends ComponentPropsWithRef<'div'> {
  title: string;
  mainTag: string;
  subTag: string;
  images: string[];
  bookmarked?: BookmarkProps['bookmarked'];
  showBookmark?: boolean;
  size?: 'large' | 'medium' | 'small';
  keyword?: string;
}

const ContentsButton = ({
  title,
  mainTag,
  subTag,
  images,
  size = 'large',
  keyword,
  bookmarked = false,
  showBookmark = true,
  ...attributes
}: ContentsButtonProps) => {
  return (
    <div css={S.cardWrapper(size)} {...attributes}>
      <div css={S.imageContainer(size)}>
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
        {highlightText(title, keyword ?? '').map((part) => (
          <span key={part.value} css={S.label(size, part.highlighted)}>
            {part.value}
          </span>
        ))}
        {showBookmark && (
          <Bookmark bookmarked={bookmarked} css={S.bookmarkWrapper} />
        )}
      </div>
    </div>
  );
};

export default ContentsButton;
