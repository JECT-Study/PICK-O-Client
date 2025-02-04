import React from 'react';
import { getDividerStyling } from './Divider.style';

export interface DividerProps {
  orientation?: 'width' | 'height';
  tone?: 'gray' | 'violet';
  length: number;
}

const Divider = ({
  orientation = 'height',
  tone = 'gray',
  length,
}: DividerProps) => (
  <div css={getDividerStyling({ orientation, length, tone })} />
);

export default Divider;
