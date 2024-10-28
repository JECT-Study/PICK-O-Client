import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
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

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const isMyGame: boolean = member?.nickname === gameSet?.member;

  const handleNextGame = () => {
    setCurrentStage((stage) => (stage < 10 ? stage + 1 : stage));
  };

  const handlePrevGame = () => {
    setCurrentStage((stage) => (stage > 0 ? stage - 1 : stage));
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
          handleNextGame={handleNextGame}
          handlePrevGame={handlePrevGame}
        />
      )}
    </div>
  );
};

export default BalanceGamePage;
