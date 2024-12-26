import React from 'react';
import ProfileListItem from '@/components/mobile/molecules/ProfileListItem/ProfileListItem';
import * as S from './DateGroupedList.style';

export interface DateGroupedListItem {
  id: string;
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
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} css={S.listItemStyle}>
          <ProfileListItem title={item.title} imgUrl={item.imgUrl} />
        </li>
      ))}
    </ul>
  </div>
);

export default DateGroupedList;
