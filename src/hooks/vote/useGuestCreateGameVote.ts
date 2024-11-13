/* eslint-disable no-console */
import { useCallback } from 'react';
import { Id } from '@/types/api';
import { VoteOption, VoteRecord } from '@/types/vote';

export const useGuestCreateGameVote = () => {
  const createGuestVote = useCallback(
    (gameSetId: Id, gameId: Id, voteOption: VoteOption) => {
      const existingVotes = localStorage.getItem(`game_${gameSetId}`);
      let updatedVotes: VoteRecord[] = [];

      if (existingVotes) {
        try {
          updatedVotes = JSON.parse(existingVotes) as VoteRecord[];
        } catch (e) {
          console.error('밸런스 게임 투표 생성 에러');
          updatedVotes = [];
        }
      }

      const voteIndex = updatedVotes.findIndex(
        (vote) => vote.gameId === gameId,
      );
      if (voteIndex !== -1) {
        updatedVotes[voteIndex] = { gameId, votedOption: voteOption };
      } else {
        updatedVotes.push({ gameId, votedOption: voteOption });
      }

      localStorage.setItem(`game_${gameSetId}`, JSON.stringify(updatedVotes));
    },
    [],
  );

  return { createGuestVote };
};
