export type VoteOption = 'A' | 'B';

export type VotedOption = 'A' | 'B' | null;

export interface VoteRecord {
  gameId: number;
  votedOption: VoteOption;
}

export type MyVoteOption = VoteOption | null;
