import React, { ReactNode } from 'react';
import { numberItemStyling, summaryItemStyling } from './SummaryItem.style';

export interface SummaryItemProps {
  itemNumber?: '1' | '2' | '3';
  children?: ReactNode;
}

const SummaryItem = ({ itemNumber = '1', children }: SummaryItemProps) => (
  <div css={summaryItemStyling}>
    <div css={numberItemStyling}>{itemNumber}</div>
    {children}
  </div>
);

export default SummaryItem;
