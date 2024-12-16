import React from 'react';
import * as S from './GameStageLabel.style';

export interface GameStageLabelProps {
  stage: number;
  color?: 'main' | 'default';
}

const GameStageLabel = ({ stage, color = 'default' }: GameStageLabelProps) => (
  <div css={S.getStageLabelColor(color)}>{stage + 1} / 10</div>
);

export default GameStageLabel;
