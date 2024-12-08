import React from 'react';
import InfoLabel from '@/components/atoms/InfoLabel/InfoLabel';
import * as S from './InfoBox.style';

export interface InfoBoxProps {
  title: string;
  prefix: string;
  commentContent: string;
  commentCount: number;
  bookmarks: number;
  onClick: () => void;
}
const InfoBox = ({
  title,
  prefix,
  commentContent,
  commentCount,
  bookmarks,
  onClick,
}: InfoBoxProps) => {
  return (
    <button type="button" css={S.infoContainer} onClick={onClick}>
      <div css={S.textContainer}>
        <p css={S.titleLabel}>{title}</p>
        <p css={S.subtitleWrapper}>
          <span css={S.prefixLabel}>{prefix}</span>
          <span css={S.subtitleLabel}>{commentContent}</span>
        </p>
      </div>
      <InfoLabel label="톡댓톡" count={commentCount} />
      <InfoLabel label="저장" count={bookmarks} />
    </button>
  );
};

export default InfoBox;
