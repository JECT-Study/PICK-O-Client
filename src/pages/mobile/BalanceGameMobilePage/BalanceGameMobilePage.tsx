import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useGameBySetId } from '@/hooks/api/game/useGameBySetIdQuery';
import BalanceGameSection from '@/components/mobile/organisms/BalanceGameSection/BalanceGameSection';
import BalanceGameEndingSection from '@/components/mobile/organisms/BalanceGameEndingSection/BalanceGameEndingSection';
import * as S from './BalanceGameMobilePage.style';

const BalanceGameMobilePage = () => {
  const { setId } = useParams<{ setId: string }>();
  const gameSetId = Number(setId);

  const { gameSet } = useGameBySetId(gameSetId);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const isMyGame: boolean = member?.nickname === gameSet?.member;

  const changeStage = (step: number) => {
    setCurrentStage((stage) => Math.min(10, Math.max(0, stage + step)));
  };

  return (
    <div css={S.pageStyle}>
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

export default BalanceGameMobilePage;
