import React from 'react';
import * as S from './GameTagChip.style';

export interface GameTagChipProps {
  tag: string;
}

const GameTagChip = ({ tag }: GameTagChipProps) => (
  <div css={S.tagStyle}>
    <span>#{tag}</span>
  </div>
);

export default GameTagChip;
