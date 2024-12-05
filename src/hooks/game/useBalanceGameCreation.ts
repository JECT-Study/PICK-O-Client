import { useEffect, useState, useRef } from 'react';
import { BalanceGameOption, BalanceGameSet } from '@/types/game';
import {
  createInitialGameStages,
  updateOptionInGameSets,
} from '@/utils/balanceGameUtils';

export const useBalanceGameCreation = (
  showToast: (message: string) => void,
  totalStage: number = 10,
  loadedGames?: BalanceGameSet[],
) => {
  const [games, setGames] = useState<BalanceGameSet[]>(
    loadedGames || createInitialGameStages(totalStage),
  );
  const [currentStage, setCurrentStage] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<BalanceGameOption[]>([]);
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [clearInput, setClearInput] = useState(false);

  const timerRef = useRef<number | NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (clearInput) {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setClearInput(false);
      }, 500);
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clearInput]);

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

  const validateStage = (): true | string => {
    if (!currentOptions[0]?.name.trim() || !currentOptions[1]?.name.trim()) {
      return '모든 옵션의 설명을 입력해주세요!';
    }

    const hasBothImages =
      currentOptions[0]?.imgUrl.trim() && currentOptions[1]?.imgUrl.trim();
    const hasNoImages =
      !currentOptions[0]?.imgUrl.trim() && !currentOptions[1]?.imgUrl.trim();

    if (!(hasBothImages || hasNoImages)) {
      return 'A와 B의 이미지가 모두 없거나 모두 있어야 합니다!';
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
    setCurrentDescription(newDescription);

    setGames((prevGames) =>
      prevGames.map((game, idx) =>
        idx === currentStage ? { ...game, description: newDescription } : game,
      ),
    );
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
    currentStage,
    currentOptions,
    currentDescription,
    clearInput,
    handleNextStage,
    handlePrevStage,
    handleStageDescriptionChange,
    handleOptionChange,
    handleDescriptionChange,
    validateStage,
  };
};
