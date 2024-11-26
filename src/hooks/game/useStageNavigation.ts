import { useEffect, useRef, useState } from 'react';

export const useStageNavigation = (totalStage: number) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [clearInput, setClearInput] = useState(false);
  const timerRef = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (clearInput) {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setClearInput(false);
      }, 500);

      return () => {
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [currentStage, clearInput]);

  const handleNextStage = () => {
    if (currentStage < totalStage - 1) {
      setClearInput(true);
      setCurrentStage((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setClearInput(true);
      setCurrentStage((prev) => prev - 1);
    }
  };

  return {
    currentStage,
    clearInput,
    handleNextStage,
    handlePrevStage,
    setClearInput,
  };
};
