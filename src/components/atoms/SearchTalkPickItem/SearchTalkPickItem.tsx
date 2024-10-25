import React from 'react';
import { highlightText } from '@/utils/highlightText';
import * as S from './SearchTalkPickItem.style';

export interface SearchTalkPickItemProps {
  title: string;
  createdAt: string;
  content: string;
  firstImgUrl: string;
  keyword: string;
}

const SearchTalkPickItem = ({
  title,
  createdAt,
  content,
  firstImgUrl,
  keyword,
}: SearchTalkPickItemProps) => {
  return (
    <div css={S.searchTalkPickItemStyle}>
      <div css={S.leftContentStyle}>
        <div css={S.titleWrapStyle}>
          {highlightText(title, keyword).map((part) => (
            <span key={part.value} css={S.titleStyle(part.highlighted)}>
              {part.value}
            </span>
          ))}
          <span css={S.dateStyle}>{createdAt}</span>
        </div>
        <div css={S.contentWrapStyle}>
          {highlightText(content, keyword).map((part) => (
            <span key={part.value} css={S.contentStyle(part.highlighted)}>
              {part.value}
            </span>
          ))}
        </div>
      </div>

      <div css={S.imageContainerStyle}>
        <img
          css={S.imageContainerStyle}
          src={firstImgUrl}
          alt="representativeImage"
        />
      </div>
    </div>
  );
};
export default SearchTalkPickItem;
