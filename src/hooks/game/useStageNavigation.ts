import { useEffect, useRef, useState } from 'react';

export const useStageNavigation = (
  totalStage: number,
  showToast: (message: string) => void,
) => {
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

  const handleNextStage = (canNavigateNext: () => boolean) => {
    if (currentStage < totalStage - 1 && canNavigateNext()) {
      setClearInput(true);
      setCurrentStage((prev) => prev + 1);
    } else if (!canNavigateNext()) {
      showToast('모든 옵션의 설명을 입력해주세요.');
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
