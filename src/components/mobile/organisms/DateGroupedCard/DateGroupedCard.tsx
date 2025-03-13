import React from 'react';
import ContentsButton, {
  ContentsButtonProps,
} from '@/components/molecules/ContentsButton/ContentsButton';
import * as S from './DateGroupedCard.style';

export interface DateGroupedCardProps {
  date: string;
  items: ContentsButtonProps[];
}

const DateGroupedCard = ({ date, items }: DateGroupedCardProps) => (
  <div css={S.containerStyle}>
    <span css={S.dateStyle}>{date}</span>
    <ul css={S.listStyle}>
      {items.map(({ id, ...buttonProps }) => (
        <li key={id} css={S.listItemStyle}>
          <ContentsButton size="extraSmall" {...buttonProps} />
        </li>
      ))}
    </ul>
  </div>
);

export default DateGroupedCard;
