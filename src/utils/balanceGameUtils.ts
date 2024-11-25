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
  options: BalanceGameOption[], // 옵션 배열
  optionType: 'A' | 'B', // 업데이트할 옵션 타입
  newOption: Partial<BalanceGameOption>, // 업데이트할 데이터
): BalanceGameOption[] => {
  return options.map((option) =>
    option.optionType === optionType ? { ...option, ...newOption } : option,
  );
};
