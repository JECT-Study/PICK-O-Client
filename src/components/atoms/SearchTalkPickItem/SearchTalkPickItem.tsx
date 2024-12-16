/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { highlightText } from '@/utils/highlightText';
import { formatDateFromISO } from '@/utils/formatData';
import * as S from './SearchTalkPickItem.style';

export interface SearchTalkPickItemProps {
  title: string;
  createdAt: string;
  content: string;
  firstImgUrl: string;
  keyword: string;
  onClick?: () => void;
}

const SearchTalkPickItem = ({
  title,
  createdAt,
  content,
  firstImgUrl,
  keyword,
  onClick,
}: SearchTalkPickItemProps) => {
  return (
    <button type="button" css={S.searchTalkPickItemStyle} onClick={onClick}>
      <div css={S.leftContentStyle}>
        <div css={S.titleWrapStyle}>
          {highlightText(title, keyword).map((part) => (
            <span key={part.value} css={S.titleStyle(part.highlighted)}>
              {part.value}
            </span>
          ))}
          <span css={S.dateStyle}>{formatDateFromISO(createdAt)}</span>
        </div>
        <div css={S.contentWrapStyle}>
          {highlightText(content, keyword).map((part) => (
            <span key={part.value} css={S.contentStyle(part.highlighted)}>
              {part.value}
            </span>
          ))}
        </div>
      </div>
      {firstImgUrl && (
        <div css={S.imageContainerStyle}>
          <img
            css={S.imageContainerStyle}
            src={firstImgUrl}
            alt="representativeImage"
          />
        </div>
      )}
    </button>
  );
};
export default SearchTalkPickItem;
