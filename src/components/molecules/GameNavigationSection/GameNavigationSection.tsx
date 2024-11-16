import React from 'react';
import GameStageBar from '@/components/atoms/GameStageBar/GameStageBar';
import Button from '@/components/atoms/Button/Button';
import { NextArrow, PrevArrow } from '@/assets';
import * as S from './GameNavigationSection.style';

interface GameNavigationSectionProps {
  currentStage: number;
  totalStage: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  handleCompleteClick: () => void;
}

const GameNavigationSection = ({
  currentStage,
  totalStage = 10,
  handleNextClick,
  handlePrevClick,
  handleCompleteClick,
}: GameNavigationSectionProps) => {
  const isPrevHidden = currentStage <= 0;
  const isLastStage = currentStage === totalStage - 1;

  return (
    <div css={S.navigationContainer}>
      <Button
        onClick={handlePrevClick}
        css={[
          S.buttonStyling,
          S.activeButtonStyling(true),
          S.getButtonVisibility(currentStage),
          isPrevHidden && S.hiddenButtonStyling,
        ]}
        iconLeft={<PrevArrow />}
      >
        이전 질문
      </Button>
      <GameStageBar stage={currentStage} />
      <Button
        onClick={isLastStage ? handleCompleteClick : handleNextClick}
        css={[
          S.buttonStyling,
          S.activeButtonStyling(!isLastStage),
          isLastStage && S.completeButtonStyling,
          S.getButtonVisibility(currentStage),
        ]}
        iconRight={isLastStage ? undefined : <NextArrow />}
      >
        {isLastStage ? '제작 완료' : '다음 질문'}
      </Button>
    </div>
  );
};

export default GameNavigationSection;
