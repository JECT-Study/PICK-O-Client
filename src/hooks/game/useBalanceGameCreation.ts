import React, { useEffect, useState } from 'react';
import { BalanceGameOption, BalanceGameSet } from '@/types/game';
import {
  createInitialGameStages,
  updateOptionInGameSets,
} from '@/utils/balanceGameUtils';

export const useBalanceGameCreation = (
  currentStage: number,
  loadedGames?: BalanceGameSet[],
  totalStage: number = 10,
) => {
  const [games, setGames] = useState<BalanceGameSet[]>(
    loadedGames || createInitialGameStages(totalStage),
  );
  const [currentOptions, setCurrentOptions] = useState<BalanceGameOption[]>([]);
  const [currentDescription, setCurrentDescription] = useState<string>('');

  useEffect(() => {
    if (loadedGames) {
      setGames(loadedGames);
    }
  }, [loadedGames]);

  useEffect(() => {
    const stage = games[currentStage] || { gameOptions: [], description: '' };
    setCurrentOptions(stage.gameOptions);
    setCurrentDescription(stage.description);
  }, [currentStage, games]);

  const updateOption = (
    stageIndex: number,
    optionType: 'A' | 'B',
    newOption: Partial<BalanceGameOption>,
  ) => {
    setGames((prevGames) =>
      prevGames.map((game, idx) => {
        if (idx !== stageIndex) return game;

        const updatedOptions = updateOptionInGameSets(
          game.gameOptions,
          optionType,
          newOption,
        );

        if (idx === currentStage) {
          setCurrentOptions(updatedOptions);
        }

        return {
          ...game,
          gameOptions: updatedOptions,
        };
      }),
    );
  };

  const handleOptionChange =
    (optionType: 'A' | 'B') => (event: React.ChangeEvent<HTMLInputElement>) => {
      updateOption(currentStage, optionType, { name: event.target.value });
    };

  const isStageComplete = () => {
    return (
      currentOptions[0]?.name.trim().length > 0 &&
      currentOptions[1]?.name.trim().length > 0
    );
  };

  const handleDescriptionChange = (
    optionType: 'A' | 'B',
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    updateOption(currentStage, optionType, { description: value });
  };

  const handleStageDescriptionChange = (newDescription: string) => {
    setCurrentDescription(newDescription);

    setGames((prevGames) =>
      prevGames.map((game, idx) =>
        idx === currentStage ? { ...game, description: newDescription } : game,
      ),
    );
  };

  return {
    games,
    currentOptions,
    isStageComplete,
    currentDescription,
    handleOptionChange,
    handleDescriptionChange,
    handleStageDescriptionChange,
  };
};
