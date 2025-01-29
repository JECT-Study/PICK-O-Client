import React from 'react';
import { getDividerStyling } from './Divider.style';

export interface DividerProps {
  orientation?: 'width' | 'height';
  tone?: 'gy' | 'wv';
  length: number;
}

const Divider = ({
  orientation = 'height',
  tone = 'gy',
  length,
}: DividerProps) => (
  <div css={getDividerStyling({ orientation, length, tone })} />
);

export default Divider;
