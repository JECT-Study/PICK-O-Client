import React, { ComponentPropsWithRef } from 'react';
import Chips from '@/components/atoms/Chips/Chips';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import { highlightText } from '@/utils/highlightText';
import * as S from './ContentsButton.style';

export interface ContentsButtonProps extends ComponentPropsWithRef<'button'> {
  title: string;
  mainTag: string;
  subTag: string;
  images: string[];
  bookmarked?: BookmarkProps['bookmarked'];
  showBookmark?: boolean;
  size?: 'large' | 'medium' | 'small' | 'extraSmall';
  keyword?: string;
  onClick: () => void;
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
  onClick,
  ...attributes
}: ContentsButtonProps) => {
  return (
    <button
      type="button"
      css={S.cardWrapper(size)}
      onClick={onClick}
      {...attributes}
    >
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
    </button>
  );
};

export default ContentsButton;
