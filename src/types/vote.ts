export type VoteResult = {
  optionACount: number;
  optionBCount: number;
};

export type VoteOption = 'A' | 'B';

export interface VoteRecord {
  gameId: number;
  votedOption: VoteOption;
}
