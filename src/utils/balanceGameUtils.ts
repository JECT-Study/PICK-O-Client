import { BalanceGameOption, BalanceGameSet, GameSet } from '@/types/game';

export const createInitialGameStages = (totalStage: number): BalanceGameSet[] =>
  Array.from({ length: totalStage }, (_, idx) => ({
    description: '',
    gameOptions: [
      {
        id: idx * 2,
        name: '',
        imgUrl: '',
        fileId: null,
        description: '',
        optionType: 'A',
      },
      {
        id: idx * 2 + 1,
        name: '',
        imgUrl: '',
        fileId: null,
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

/**
 * GameSet 데이터를 BalanceGameSet 형식으로 변환하는 함수
 * @param gameSet GameSet API에서 받은 원본 데이터
 * @returns BalanceGameSet[]로 가공된 데이터
 */
export const transformGameSetToBalanceGame = (
  gameSet: GameSet,
): BalanceGameSet[] => {
  return gameSet.gameDetailResponses.map(
    ({ description = '', gameOptions }) => ({
      description,
      gameOptions: gameOptions.map(
        ({
          id,
          name,
          description: optionDescription,
          optionType,
          imgUrl,
          fileId,
        }) => ({
          id,
          name,
          description: optionDescription,
          optionType,
          imgUrl: imgUrl || '',
          fileId: fileId ?? null,
        }),
      ),
    }),
  );
};
