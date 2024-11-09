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
  onDescriptionChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteClick: () => void;
  onDraftLoad: () => void;
  onStageChange: (stage: number) => void;
  onGamesUpdate: (games: BalanceGameSet[]) => void;
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
}: BalanceGameCreationProps) => {
  const totalStage = 10;

  const { currentStage, clearInput, handleNextStage, handlePrevStage } =
    useStageNavigation(totalStage);

  const {
    games,
    currentOptions,
    handleImageChange,
    handleOptionChange,
    handleDescriptionChange,
  } = useBalanceGameCreation(totalStage, currentStage);

  useEffect(() => {
    onStageChange(currentStage);
  }, [currentStage, onStageChange]);

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
        onDescriptionChange={onDescriptionChange}
      />
      <div css={S.optionsContainer}>
        <BalanceGameOptionCard
          option="A"
          imgUrl={currentOptions[0].imgUrl}
          imageFile={currentOptions[0].imageFile ?? null}
          onImageChange={handleImageChange('A')}
          choiceInputProps={{
            value: currentOptions[0].name,
            onChange: handleOptionChange('A'),
          }}
          infoInputProps={{
            value: currentOptions[0].description,
            placeholder: '해당 선택지에 대해 추가로 설명을 입력할 수 있어요!',
            onChange: (e) => handleDescriptionChange('A', e),
          }}
          clearInput={clearInput}
        />
        <BalanceGameOptionCard
          option="B"
          imgUrl={currentOptions[1].imgUrl}
          imageFile={currentOptions[1].imageFile ?? null}
          onImageChange={handleImageChange('B')}
          choiceInputProps={{
            value: currentOptions[1].name,
            onChange: handleOptionChange('B'),
          }}
          infoInputProps={{
            value: currentOptions[1].description,
            placeholder: '해당 선택지에 대해 추가로 설명을 입력할 수 있어요!',
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
