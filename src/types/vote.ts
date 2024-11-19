export type VoteOption = 'A' | 'B';

export interface VoteRecord {
  gameId: number;
  votedOption: VoteOption;
}

export type MyVoteOption = VoteOption | null;
