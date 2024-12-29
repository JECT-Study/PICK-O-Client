import React from 'react';
import ProfileListItem from '@/components/mobile/molecules/ProfileListItem/ProfileListItem';
import * as S from './DateGroupedList.style';

export interface DateGroupedListItem {
  id: number;
  title: string;
  imgUrl: string;
}

export interface DateGroupedListProps {
  date: string;
  items: DateGroupedListItem[];
}

const DateGroupedList = ({ date, items }: DateGroupedListProps) => (
  <div css={S.containerStyle}>
    <span css={S.dateStyle}>{date}</span>
    <ul css={S.listStyle}>
      {items.map(({ id, title, imgUrl }) => (
        <li key={id} css={S.listItemStyle}>
          <ProfileListItem title={title} imgUrl={imgUrl} />
        </li>
      ))}
    </ul>
  </div>
);

export default DateGroupedList;
