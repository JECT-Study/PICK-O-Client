import { useCallback } from 'react';
import { Id } from '@/types/api';
import { VoteOption, VoteRecord } from '@/types/vote';

export const useGuestEditGameVote = () => {
  const editGuestVote = useCallback(
    (gameSetId: Id, gameId: Id, data: VoteOption) => {
      const existingVotes = localStorage.getItem(`game_${gameSetId}`);
      let updatedVotes: VoteRecord[] = [];

      if (existingVotes) {
        try {
          updatedVotes = JSON.parse(existingVotes) as VoteRecord[];
        } catch (e) {
          updatedVotes = [];
        }
      }

      const voteIndex = updatedVotes.findIndex(
        (vote) => vote.gameId === gameId,
      );

      if (voteIndex !== -1) {
        updatedVotes[voteIndex] = { gameId, votedOption: data };
      } else {
        updatedVotes.push({ gameId, votedOption: data });
      }

      localStorage.setItem(`game_${gameSetId}`, JSON.stringify(updatedVotes));
    },
    [],
  );

  return { editGuestVote };
};
