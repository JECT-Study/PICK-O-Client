import { BalanceGameOption, BalanceGameSet } from '@/types/game';

export const createInitialGameStages = (totalStage: number): BalanceGameSet[] =>
  Array.from({ length: totalStage }, (_, idx) => ({
    description: '',
    gameOptions: [
      {
        id: idx * 2,
        name: '',
        imgUrl: '',
        storedName: '',
        description: '',
        optionType: 'A',
      },
      {
        id: idx * 2 + 1,
        name: '',
        imgUrl: '',
        storedName: '',
        description: '',
        optionType: 'B',
      },
    ],
  }));

export const updateOptionInGameSets = (
  options: BalanceGameOption[],
  optionType: 'A' | 'B',
  newOption: Partial<BalanceGameOption>,
) => {
  return options.map((opt) =>
    opt.optionType === optionType ? { ...opt, ...newOption } : opt,
  );
};
