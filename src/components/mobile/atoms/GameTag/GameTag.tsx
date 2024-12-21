import React from 'react';
import * as S from './GameTag.style';

export interface GameTagProps {
  tag: string;
}

const GameTag = ({ tag }: GameTagProps) => (
  <div css={S.tagStyle}>
    <span>#</span> <span>{tag}</span>
  </div>
);

export default GameTag;
