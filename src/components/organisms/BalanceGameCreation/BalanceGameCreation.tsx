import React, { useEffect } from 'react';
import TitleDescriptionField from '@/components/atoms/TitleDescriptionField/TitleDescriptionField';
import BalanceGameOptionCard from '@/components/molecules/BalanceGameOptionCard/BalanceGameOptionCard';
import DraftPostButton from '@/components/atoms/DraftPostButton/DraftPostButton';
import { BalanceGameSet } from '@/types/game';
import { useBalanceGameCreation } from '@/hooks/game/useBalanceGameCreation';
import GameNavigationSection from '@/components/molecules/GameNavigationSection/GameNavigationSection';
import { useStageNavigation } from '@/hooks/game/useStageNavigation';
import * as S from './BalanceGameCreation.style';

export interface BalanceGameCreationProps {
  title: string;
  description?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (description: string) => void;
  handleCompleteClick: () => void;
  onDraftLoad: () => void;
  onStageChange: (stage: number) => void;
  onGamesUpdate: (games: BalanceGameSet[]) => void;
  onImageChange: (stageIndex: number, optionIndex: number, file: File) => void;
}

const BalanceGameCreation = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  handleCompleteClick,
  onDraftLoad,
  onStageChange,
  onGamesUpdate,
  onImageChange,
}: BalanceGameCreationProps) => {
  const totalStage = 10;

  const { currentStage, clearInput, handleNextStage, handlePrevStage } =
    useStageNavigation(totalStage);

  const {
    games,
    currentOptions,
    currentDescription,
    handleOptionChange,
    handleDescriptionChange,
    handleStageDescriptionChange,
  } = useBalanceGameCreation(totalStage, currentStage);

  useEffect(() => {
    onStageChange(currentStage);
    onDescriptionChange(currentDescription);
  }, [currentStage, onStageChange, currentDescription, onDescriptionChange]);

  useEffect(() => {
    if (currentOptions.length > 0) {
      onGamesUpdate(games);
    }
  }, [currentOptions, games, onGamesUpdate]);

  return (
    <div css={S.pageContainer}>
      <TitleDescriptionField
        title={title}
        description={description}
        onTitleChange={onTitleChange}
        onDescriptionChange={(e) =>
          handleStageDescriptionChange(e.target.value)
        }
      />
      <div css={S.optionsContainer}>
        <BalanceGameOptionCard
          option="A"
          imgUrl={currentOptions[0]?.imgUrl || ''}
          onImageChange={(file) => onImageChange(currentStage, 0, file)}
          choiceInputProps={{
            value: currentOptions[0]?.name || '',
            onChange: handleOptionChange('A'),
          }}
          infoInputProps={{
            value: currentOptions[0]?.description || '',
            onChange: (e) => handleDescriptionChange('A', e),
          }}
          clearInput={clearInput}
        />
        <BalanceGameOptionCard
          option="B"
          imgUrl={currentOptions[1]?.imgUrl || ''}
          onImageChange={(file) => onImageChange(currentStage, 1, file)}
          choiceInputProps={{
            value: currentOptions[1]?.name || '',
            onChange: handleOptionChange('B'),
          }}
          infoInputProps={{
            value: currentOptions[1]?.description || '',
            onChange: (e) => handleDescriptionChange('B', e),
          }}
          clearInput={clearInput}
        />
      </div>
      <div css={S.draftPostButtonContainer}>
        <DraftPostButton onClick={onDraftLoad} />
      </div>
      <div css={S.navigationContainer}>
        <GameNavigationSection
          currentStage={currentStage}
          totalStage={totalStage}
          handleNextClick={handleNextStage}
          handlePrevClick={handlePrevStage}
          handleCompleteClick={handleCompleteClick}
        />
      </div>
    </div>
  );
};

export default BalanceGameCreation;
