import React from 'react';
import BalanceGameEndingBox from '@/components/molecules/BalanceGameEndingBox/BalanceGameEndingBox';
import * as S from './BalanceGameEndingSection.style';

export interface BalanceGameEndingSectionProps {
  title: string;
  gameSetId: number;
  isMyGame: boolean;
  isMyEndBookmark: boolean;
}

const BalanceGameEndingSection = ({
  title,
  gameSetId,
  isMyGame,
  isMyEndBookmark,
}: BalanceGameEndingSectionProps) => {
  return (
    <div css={S.balanceGameEndingStyling}>
      <BalanceGameEndingBox
        title={title}
        gameSetId={gameSetId}
        isMyGame={isMyGame}
        isMyEndBookmark={isMyEndBookmark}
      />
      {/* 더 많은 밸런스게임 보러 가기 */}
    </div>
  );
};

export default BalanceGameEndingSection;
