import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useGameBySetId } from '@/hooks/api/game/useGameBySetIdQuery';
import Divider from '@/components/atoms/Divider/Divider';
import BalanceGameSection from '@/components/organisms/BalanceGameSection/BalanceGameSection';
import BalanceGameEndingSection from '@/components/organisms/BalanceGameEndingSection/BalanceGameEndingSection';
import * as S from './BalanceGamePage.style';

const BalanceGamePage = () => {
  const { setId } = useParams<{ setId: string }>();
  const gameSetId = Number(setId);

  const { gameSet } = useGameBySetId(gameSetId);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const { member } = useMemberQuery();

  const isMyGame: boolean = member?.nickname === gameSet?.member;

  const changeStage = (step: number) => {
    setCurrentStage((stage) => Math.min(10, Math.max(0, stage + step)));
  };

  return (
    <div css={S.pageStyle}>
      <div css={S.textContainer}>
        <div css={S.titleTextWrapper}>
          <div css={S.subTitleStyling}>
            반드시 둘 중 하나는 골라야 한다면, 그대의 선택은?
          </div>
          <div css={S.titleStyling}>지금은 밸런스게임 타임</div>
        </div>
        <Divider length={1175} orientation="width" />
      </div>
      {currentStage === 10 ? (
        <BalanceGameEndingSection
          title={gameSet?.title ?? ''}
          gameSetId={gameSetId}
          isMyGame={isMyGame}
          isMyEndBookmark={gameSet?.isEndBookmarked ?? false}
        />
      ) : (
        <BalanceGameSection
          gameSetId={gameSetId}
          game={gameSet}
          isMyGame={isMyGame}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          changeStage={changeStage}
        />
      )}
    </div>
  );
};

export default BalanceGamePage;
