import React, { useEffect, useState } from 'react';
import { BalanceGameOption, BalanceGameSet } from '@/types/game';
import { createImageUrlFromFile } from '@/utils/file';
import {
  createInitialGameStages,
  updateOptionInGameSets,
} from '@/utils/balanceGameUtils';

export const useBalanceGameCreation = (
  totalStage: number,
  currentStage: number,
) => {
  const [games, setGames] = useState<BalanceGameSet[]>(
    createInitialGameStages(totalStage),
  );
  const [currentOptions, setCurrentOptions] = useState<BalanceGameOption[]>(
    games[0].gameOptions,
  );

  useEffect(() => {
    setCurrentOptions(games[currentStage]?.gameOptions || []);
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
        return {
          ...game,
          gameOptions: updatedOptions,
        };
      }),
    );
  };

  const handleImageChange =
    (optionType: 'A' | 'B') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imgUrl = createImageUrlFromFile(file);
        updateOption(currentStage, optionType, {
          imgUrl,
          storedName: file.name,
          imageFile: file,
        });
      }
    };

  const handleOptionChange =
    (optionType: 'A' | 'B') => (event: React.ChangeEvent<HTMLInputElement>) => {
      updateOption(currentStage, optionType, { name: event.target.value });
    };

  const handleDescriptionChange = (
    optionType: 'A' | 'B',
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    updateOption(currentStage, optionType, { description: value });
  };

  return {
    games,
    currentOptions,
    handleImageChange,
    handleOptionChange,
    handleDescriptionChange,
  };
};
