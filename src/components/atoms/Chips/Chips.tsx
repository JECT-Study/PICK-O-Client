import React, { ReactNode } from 'react';
import { chipsStyling, getChipStyling } from './Chips.style';

export interface ChipsProps {
  variant?: 'outline' | 'roundOutline';
  children?: ReactNode;
}

const Chips = ({ variant = 'outline', children }: ChipsProps) => (
  <div css={[chipsStyling, getChipStyling(variant)]}>{children}</div>
);

export default Chips;
