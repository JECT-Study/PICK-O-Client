/* eslint-disable no-console */
import { useCallback } from 'react';
import { Id } from '@/types/api';
import { VoteRecord } from '@/types/vote';

export const useGuestDeleteGameVote = () => {
  const deleteGuestVote = useCallback((gameSetId: Id, gameId: Id) => {
    const existingVotes = localStorage.getItem(`game_${gameSetId}`);
    if (existingVotes) {
      let updatedVotes: VoteRecord[] = [];

      try {
        updatedVotes = JSON.parse(existingVotes) as VoteRecord[];
      } catch (e) {
        console.error('밸런스 게임 투표 삭제 오류');
      }

      updatedVotes = updatedVotes.filter((vote) => vote.gameId !== gameId);

      localStorage.setItem(`game_${gameSetId}`, JSON.stringify(updatedVotes));
    }
  }, []);

  return { deleteGuestVote };
};
