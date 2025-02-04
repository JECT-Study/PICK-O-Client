export enum OptionKeys {
  TALK_PICK = 'talkpick',
  BALANCE_GAME = 'balancegame',
}

export const optionSets: Record<
  OptionKeys,
  { label: string; value: string }[]
> = {
  [OptionKeys.TALK_PICK]: [
    { label: '내가 저장한', value: 'bookmarks' },
    { label: '내가 투표한', value: 'votes' },
    { label: '내가 댓글단', value: 'comments' },
    { label: '내가 작성한', value: 'written' },
  ],
  [OptionKeys.BALANCE_GAME]: [
    { label: '내가 저장한', value: 'bookmarks' },
    { label: '내가 투표한', value: 'votes' },
    { label: '내가 만든', value: 'written' },
  ],
};
