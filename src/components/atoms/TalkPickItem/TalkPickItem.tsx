import React from 'react';
import { TalkPickListItem } from '@/types/talk-pick';
import { formatDate, formatNumber } from '@/utils/formatData';
import * as S from './TalkPickItem.style';

export interface TalkPickListItemProps {
  type?: 'header' | 'default' | 'best';
  rank?: number;
  talkPickItem?: TalkPickListItem;
}

const headerTalkPick: TalkPickListItem = {
  id: 0,
  title: '제목',
  writer: '작성자',
  createdAt: '작성일시',
  views: '조회수',
  bookmarks: '저장수',
};

const TalkPickItem = ({
  type = 'default',
  rank,
  talkPickItem = headerTalkPick,
}: TalkPickListItemProps) => {
  const getTalkPickId = (): number | undefined => {
    switch (type) {
      case 'default':
        return talkPickItem.id;
      case 'best':
        return rank;
      case 'header':
      default:
        return undefined;
    }
  };

  const getFormatNumber = (item: number | string): string => {
    return typeof item === 'number' ? formatNumber(item) : item;
  };

  return (
    <div
      css={[
        S.talkPickListItemStyling,
        type !== 'header' && S.borderBottomStyling,
      ]}
    >
      <div css={[S.talkPickListId, S.getTalkPickListIdStyling(type)]}>
        {getTalkPickId()}
      </div>
      <div css={[S.talkPickListTitle, S.getTalkPickListTitleStyling(type)]}>
        <span css={type !== 'header' && S.talkPickTitleText}>
          {talkPickItem.title}
        </span>
      </div>
      <div
        css={[S.talkPickListWideDetail, S.getTalkPickListWriterStyling(type)]}
      >
        {talkPickItem.writer}
      </div>
      <div
        css={[S.talkPickListWideDetail, S.getTalkPickListDetailStyling(type)]}
      >
        {formatDate(talkPickItem.createdAt)}
      </div>
      <div css={[S.talkPickListDetail, S.getTalkPickListDetailStyling(type)]}>
        {getFormatNumber(talkPickItem.views)}
      </div>
      <div css={[S.talkPickListDetail, S.getTalkPickListDetailStyling(type)]}>
        {getFormatNumber(talkPickItem.bookmarks)}
      </div>
    </div>
  );
};

export default TalkPickItem;