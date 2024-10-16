import React from 'react';
import * as S from './SearchTalkPickItem.style';

export interface SearchTalkPickItemProps {
  title: string;
  createdAt: string;
  content: string;
  firstImgUrl: string;
}

const SearchTalkPickItem = ({
  title,
  createdAt,
  content,
  firstImgUrl,
}: SearchTalkPickItemProps) => {
  return (
    <div css={S.searchTalkPickItemStyle}>
      <div css={S.leftContentStyle}>
        <div css={S.titleWrapStyle}>
          <div css={S.titleStyle}>{title}</div>
          <div css={S.dateStyle}>{createdAt}</div>
        </div>
        <div css={S.contentWrapStyle}>{content}</div>
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
