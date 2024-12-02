import { BalanceGameOption, BalanceGameSet } from '@/types/game';

export const createInitialGameStages = (totalStage: number): BalanceGameSet[] =>
  Array.from({ length: totalStage }, (_, idx) => ({
    description: '',
    gameOptions: [
      {
        id: idx * 2,
        name: '',
        imgUrl: '',
        fileId: 0,
        description: '',
        optionType: 'A',
      },
      {
        id: idx * 2 + 1,
        name: '',
        imgUrl: '',
        fileId: 0,
        description: '',
        optionType: 'B',
      },
    ],
  }));

export const updateOptionInGameSets = (
  options: BalanceGameOption[],
  optionType: 'A' | 'B',
  newOption: Partial<BalanceGameOption>,
): BalanceGameOption[] => {
  return options.map((option) =>
    option.optionType === optionType ? { ...option, ...newOption } : option,
  );
};
