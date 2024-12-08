import React, { useState, useEffect, ComponentPropsWithRef } from 'react';
import {
  BookmarkDF,
  BookmarkDFSmall,
  BookmarkPR,
  BookmarkPRSmall,
} from '@/assets';
import * as S from './Bookmark.style';

export interface BookmarkProps extends ComponentPropsWithRef<'button'> {
  bookmarked?: boolean;
}

const Bookmark = ({ bookmarked = false, ...attributes }: BookmarkProps) => {
  const [isPressed, setIsPressed] = useState(bookmarked);
  const isMobile = true;

  useEffect(() => {
    setIsPressed(bookmarked);
  }, [bookmarked]);

  const handleClick = () => {
    setIsPressed((prevState) => !prevState);
  };

  const renderIcon = () => {
    if (isPressed) {
      return isMobile ? <BookmarkPRSmall /> : <BookmarkPR css={S.icon} />;
    }
    return isMobile ? <BookmarkDFSmall /> : <BookmarkDF css={S.icon} />;
  };

  return (
    <button
      type="button"
      css={S.bookmarkButton}
      onClick={handleClick}
      {...attributes}
    >
      {renderIcon()}
    </button>
  );
};

export default Bookmark;
