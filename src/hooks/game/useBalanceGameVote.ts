import { SetStateAction, useEffect } from 'react';
import { GameSet } from '@/types/game';
import { MyVoteOption, VoteOption, VoteRecord } from '@/types/vote';
import { useCreateGameVoteMutation } from '@/hooks/api/vote/useCreateGameVoteMutation';
import { useEditGameVoteMutation } from '@/hooks/api/vote/useEditGameVoteMutation';
import { useDeleteGameVoteMutation } from '@/hooks/api/vote/useDeleteGameVoteMutation';

export const useGuestGameVote = (
  guestVotedList: VoteRecord[],
  setGuestVotedList: (value: SetStateAction<VoteRecord[]>) => void,
  gameSetId: number,
  currentStage: number,
  game?: GameSet,
) => {
  useEffect(() => {
    const updateGuestVotedList = () => {
      const storedVotes = localStorage.getItem(`game_${gameSetId}`);
      setGuestVotedList(
        storedVotes ? (JSON.parse(storedVotes) as VoteRecord[]) : [],
      );
    };

    updateGuestVotedList();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `game_${gameSetId}`) {
        updateGuestVotedList();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    updateGuestVotedList();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [gameSetId, setGuestVotedList]);

  const handleGuestGameVote = (
    selectedOption: MyVoteOption,
    voteOption: VoteOption,
  ) => {
    const updatedVotes = [...guestVotedList];
    const gameStageId = game?.gameDetailResponses[currentStage]?.id;

    const currentVoteIndex = updatedVotes.findIndex(
      (vote) => vote.gameId === gameStageId,
    );

    if (!selectedOption) {
      updatedVotes.push({
        gameId: gameStageId as number,
        votedOption: voteOption,
      });
    } else if (selectedOption === voteOption) {
      updatedVotes.splice(currentVoteIndex, 1);
    } else {
      updatedVotes[currentVoteIndex].votedOption = voteOption;
    }

    setGuestVotedList(updatedVotes);
    localStorage.setItem(`game_${gameSetId}`, JSON.stringify(updatedVotes));
  };

  return { handleGuestGameVote };
};

export const useUserGameVote = (
  gameSetId: number,
  gameId: number,
  handleNextStage: () => void,
) => {
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

  return { handleUserGameVote };
};
