import {
  BalanceGameOption,
  BalanceGameSet,
  BalanceGame,
  TempGame,
} from '@/types/game';

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

export const transformBalanceGameToTempGame = (
  balanceGame: BalanceGame,
  isTempLoaded: boolean,
): TempGame => ({
  title: balanceGame.title,
  isLoaded: isTempLoaded,
  tempGames: balanceGame.games.map((gameSet) => ({
    description: gameSet.description,
    tempGameOptions: gameSet.gameOptions.map((option) => ({
      name: option.name,
      description: option.description,
      fileId: option.fileId || null,
      imgUrl: option.imgUrl || '',
      optionType: option.optionType,
    })),
  })),
});

export const transformTempGameToBalanceGame = (
  tempGame: TempGame,
  gameMainTag: string,
  gameSubTag: string,
): BalanceGame => ({
  title: tempGame.title,
  mainTag: gameMainTag,
  subTag: gameSubTag,
  games: tempGame.tempGames.map((tempGameSet) => ({
    description: tempGameSet.description,
    gameOptions: tempGameSet.tempGameOptions.map((tempOption, index) => ({
      id: index,
      name: tempOption.name,
      imgUrl: tempOption.imgUrl || '',
      fileId: tempOption.fileId || null,
      description: tempOption.description,
      optionType: tempOption.optionType,
    })),
  })),
});
