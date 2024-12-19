import { useState } from 'react';
import { BalanceGameOption, BalanceGameSet } from '@/types/game';
import {
  createInitialGameStages,
  updateOptionInGameSets,
} from '@/utils/balanceGameUtils';
import { ERROR } from '@/constants/message';

export const useBalanceGameCreation = (
  showToast: (message: string) => void,
  totalStage: number = 10,
  loadedGames?: BalanceGameSet[],
) => {
  const [games, setGames] = useState<BalanceGameSet[]>(
    loadedGames || createInitialGameStages(totalStage),
  );
  const [currentStage, setCurrentStage] = useState(0);
  const [clearInput, setClearInput] = useState(false);

  const updateOption = (
    stageIndex: number,
    optionType: 'A' | 'B',
    newOption: Partial<BalanceGameOption>,
  ) => {
    setGames((prevGames) =>
      prevGames.map((game, idx) =>
        idx === stageIndex
          ? {
              ...game,
              gameOptions: updateOptionInGameSets(
                game.gameOptions,
                optionType,
                newOption,
              ),
            }
          : game,
      ),
    );
  };

  const validateStage = (): true | string => {
    const { gameOptions } = games[currentStage] || { gameOptions: [] };

    if (!gameOptions[0]?.name.trim() || !gameOptions[1]?.name.trim()) {
      return ERROR.VALIDATE.OPTION;
    }

    const hasBothImages =
      gameOptions[0]?.imgUrl.trim() && gameOptions[1]?.imgUrl.trim();
    const hasNoImages =
      !gameOptions[0]?.imgUrl.trim() && !gameOptions[1]?.imgUrl.trim();

    if (!(hasBothImages || hasNoImages)) {
      return ERROR.VALIDATE.GAME_IMAGE;
    }

    return true;
  };

  const handleNextStage = () => {
    const validationResult = validateStage();
    if (currentStage < totalStage - 1) {
      if (validationResult === true) {
        setClearInput(true);
        setCurrentStage((prev) => prev + 1);
      } else {
        showToast(validationResult);
      }
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setClearInput(true);
      setCurrentStage((prev) => prev - 1);
    }
  };

  const handleStageDescriptionChange = (newDescription: string) => {
    setGames((prevGames) =>
      prevGames.map((game, idx) =>
        idx === currentStage ? { ...game, description: newDescription } : game,
      ),
    );
  };

  const handleOptionUpdate = (
    optionType: 'A' | 'B',
    field: 'name' | 'description',
    value: string,
  ) => {
    updateOption(currentStage, optionType, { [field]: value });
  };

  return {
    games,
    currentStage,
    currentOptions: games[currentStage]?.gameOptions || [],
    currentDescription: games[currentStage]?.description || '',
    clearInput,
    handleNextStage,
    handlePrevStage,
    handleStageDescriptionChange,
    handleOptionUpdate,
    validateStage,
  };
};
