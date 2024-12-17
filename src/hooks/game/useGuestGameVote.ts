import { SetStateAction, useEffect } from 'react';
import { GameSet } from '@/types/game';
import { MyVoteOption, VoteOption, VoteRecord } from '@/types/vote';

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
    const currentVoteIndex = updatedVotes.findIndex(
      (vote) => vote.gameId === game?.gameDetailResponses[currentStage]?.id,
    );

    if (!selectedOption) {
      updatedVotes.push({
        gameId: game?.gameDetailResponses[currentStage]?.id as number,
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
