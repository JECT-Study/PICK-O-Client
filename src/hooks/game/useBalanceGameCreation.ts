import React, { useEffect, useState } from 'react';
import { BalanceGameOption, BalanceGameSet } from '@/types/game';
import { createImageUrlFromFile } from '@/utils/file';

const initializeGames = (totalStage: number): BalanceGameSet[] =>
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

export const useBalanceGameCreation = (totalStage: number) => {
  const [games, setGames] = useState<BalanceGameSet[]>(
    initializeGames(totalStage),
  );
  const [currentStage, setCurrentStage] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<BalanceGameOption[]>(
    games[0].gameOptions,
  );
  const [resetInfoInput, setResetInfoInput] = useState(false);

  useEffect(() => {
    if (resetInfoInput) {
      setResetInfoInput(false);
    }
  }, [resetInfoInput]);

  useEffect(() => {
    setCurrentOptions(games[currentStage].gameOptions);
  }, [currentStage, games]);

  const updateOption = (
    stageIndex: number,
    optionType: 'A' | 'B',
    newOption: Partial<BalanceGameOption>,
  ) => {
    setGames((prevGames) =>
      prevGames.map((game, idx) => {
        if (idx !== stageIndex) return game;

        const updatedOptions = game.gameOptions.map((opt) =>
          opt.optionType === optionType ? { ...opt, ...newOption } : opt,
        );

        return {
          ...game,
          gameOptions: updatedOptions,
        };
      }),
    );
  };

  const handleImageAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = createImageUrlFromFile(file);
      updateOption(currentStage, 'A', {
        imgUrl,
        storedName: file.name,
        imageFile: file,
      });
    }
  };

  const handleImageBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = createImageUrlFromFile(file);
      updateOption(currentStage, 'B', {
        imgUrl,
        storedName: file.name,
        imageFile: file,
      });
    }
  };

  const handleOptionAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateOption(currentStage, 'A', { name: event.target.value });
  };

  const handleOptionBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateOption(currentStage, 'B', { name: event.target.value });
  };

  const handleDescriptionChange = (
    optionType: 'A' | 'B',
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    updateOption(currentStage, optionType, { description: value });
  };

  const handleNextStage = () => {
    if (currentStage < totalStage - 1) {
      setResetInfoInput(true);
      setCurrentStage((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setResetInfoInput(true);
      setCurrentStage((prev) => prev - 1);
    }
  };

  return {
    currentStage,
    games,
    currentOptions,
    resetInfoInput,
    handleImageAChange,
    handleImageBChange,
    handleOptionAChange,
    handleOptionBChange,
    handleNextStage,
    handlePrevStage,
    handleDescriptionChange,
  };
};
