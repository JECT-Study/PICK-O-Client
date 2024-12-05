import React from 'react';
import InfoLabel from '@/components/atoms/InfoLabel/InfoLabel';
import Bookmark, { BookmarkProps } from '@/components/atoms/Bookmark/Bookmark';
import * as S from './MyContentBox.style';

export interface MyContentBoxProps {
  title: string;
  commentCount: number;
  bookmarks: number;
  showBookmark?: boolean;
  bookmarked?: BookmarkProps['bookmarked'];
  onClick: () => void;
}
const MyContentBox = ({
  title,
  commentCount,
  bookmarks,
  showBookmark = false,
  bookmarked = false,
  onClick,
}: MyContentBoxProps) => {
  return (
    <div
      role="button"
      css={S.infoContainer}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      tabIndex={0}
    >
      <div css={S.textContainer}>
        <p css={S.titleLabel}>{title}</p>
      </div>
      <InfoLabel label="톡댓톡" count={commentCount} />
      <InfoLabel label="저장" count={bookmarks} />
      {showBookmark && (
        <Bookmark bookmarked={bookmarked} css={S.bookmarkWrapper} />
      )}
    </div>
  );
};

export default MyContentBox;
