import React from 'react';
import { GameOption } from '@/types/game';
import BalanceGameButton from '@/components/mobile/atoms/BalanceGameButton/BalanceGameButton';
import { useCreateGameVoteMutation } from '@/hooks/api/vote/useCreateGameVoteMutation';
import { useEditGameVoteMutation } from '@/hooks/api/vote/useEditGameVoteMutation';
import { useDeleteGameVoteMutation } from '@/hooks/api/vote/useDeleteGameVoteMutation';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { MyVoteOption, VoteOption } from '@/types/vote';
import * as S from './BalanceGameBox.style';

export interface BalanceGameBoxProps {
  gameSetId: number;
  gameId: number;
  options: GameOption[];
  selectedVote: MyVoteOption;
  handleNextStage: () => void;
  handleGuestGameVote: (
    selectedOption: MyVoteOption,
    voteOption: VoteOption,
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
    selectedOption: MyVoteOption,
    voteOption: VoteOption,
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

  const handleButtonClick = (voteOption: VoteOption) => {
    if (accessToken) {
      handleUserGameVote(selectedVote, voteOption);
    } else {
      handleGuestGameVote(selectedVote, voteOption);
      setTimeout(() => {
        handleNextStage();
      }, 500);
    }
  };

  return (
    <div css={S.containerStyle}>
      <BalanceGameButton
        name={optionA?.name ?? ''}
        imgUrl={optionA?.imgUrl ?? null}
        description={optionA?.description ?? ''}
        optionType={optionA?.optionType ?? 'A'}
        selectedButton={selectedVote ?? null}
        onClick={() => {
          handleButtonClick('A');
        }}
      />
      <BalanceGameButton
        name={optionB?.name ?? ''}
        imgUrl={optionB?.imgUrl ?? null}
        description={optionB?.description ?? ''}
        optionType={optionB?.optionType ?? 'B'}
        selectedButton={selectedVote ?? null}
        onClick={() => {
          handleButtonClick('B');
        }}
      />
    </div>
  );
};

export default BalanceGameBox;
