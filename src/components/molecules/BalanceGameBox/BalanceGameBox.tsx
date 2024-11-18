/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { GameOption } from '@/types/game';
import { getRandomNumbers } from '@/utils/calculator';
import BalanceGameButton from '@/components/atoms/BalanceGameButton/BalanceGameButton';
import { useCreateGameVoteMutation } from '@/hooks/api/vote/useCreateGameVoteMutation';
import { useEditGameVoteMutation } from '@/hooks/api/vote/useEditGameVoteMutation';
import { useDeleteGameVoteMutation } from '@/hooks/api/vote/useDeleteGameVoteMutation';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import * as S from './BalanceGameBox.style';

export interface BalanceGameBoxProps {
  gameSetId: number;
  gameId: number;
  options: GameOption[];
  selectedVote: 'A' | 'B' | null;
  handleNextStage: () => void;
  handleGuestGameVote: (
    selectedOption: 'A' | 'B' | null,
    voteOption: 'A' | 'B',
  ) => void;
}

const BalanceGameBox = ({
  gameSetId,
  gameId,
  options,
  selectedVote,
  handleNextStage,
  handleGuestGameVote,
}: BalanceGameBoxProps) => {
  const accessToken = useNewSelector(selectAccessToken);
  const optionA = options[0];
  const optionB = options[1];

  const getRandomImages = () => {
    const [randomNumberA, randomNumberB] = getRandomNumbers(
      S.gameBackgrounds.length,
    );
    return [S.gameBackgrounds[randomNumberA], S.gameBackgrounds[randomNumberB]];
  };

  const [backgroundImages] = useState<string[]>(getRandomImages);
  const [backgroundImageA, backgroundImageB] = backgroundImages;

  const { mutate: createGameVote } = useCreateGameVoteMutation(
    gameSetId,
    gameId,
  );
  const { mutate: editGameVote } = useEditGameVoteMutation(gameSetId, gameId);
  const { mutate: deleteGameVote } = useDeleteGameVoteMutation(
    gameSetId,
    gameId,
  );

  const handleUserGameVote = (
    selectedOption: 'A' | 'B' | null,
    voteOption: 'A' | 'B',
  ) => {
    if (!selectedOption) {
      createGameVote(voteOption, {
        onSuccess: () => {
          const nextStageTimer = setTimeout(() => {
            handleNextStage();
          }, 500);

          return () => clearTimeout(nextStageTimer);
        },
      });
    } else if (selectedOption === voteOption) {
      deleteGameVote();
    } else {
      editGameVote(voteOption);
    }
  };

  const handleButtonClick = (voteOption: 'A' | 'B') => {
    if (accessToken) {
      handleUserGameVote(selectedVote, voteOption);
    } else {
      handleGuestGameVote(selectedVote, voteOption);
      const nextStageTimer = setTimeout(() => {
        handleNextStage();
      }, 500);

      return () => clearTimeout(nextStageTimer);
    }
  };

  return (
    <div css={[S.containerStyle, S.getOutlineStyle(selectedVote)]}>
      <BalanceGameButton
        name={optionA?.name ?? ''}
        imgUrl={optionA?.imgUrl ?? null}
        description={optionA?.description ?? ''}
        optionType={optionA?.optionType ?? 'A'}
        selectedButton={selectedVote ?? null}
        randomImage={backgroundImageA}
        onClick={() => {
          handleButtonClick('A');
        }}
      />
      {!selectedVote && <div css={S.letterStyle}>VS</div>}
      <BalanceGameButton
        name={optionB?.name ?? ''}
        imgUrl={optionB?.imgUrl ?? null}
        description={optionB?.description ?? ''}
        optionType={optionB?.optionType ?? 'B'}
        selectedButton={selectedVote ?? null}
        randomImage={backgroundImageB}
        onClick={() => {
          handleButtonClick('B');
        }}
      />
    </div>
  );
};

export default BalanceGameBox;
