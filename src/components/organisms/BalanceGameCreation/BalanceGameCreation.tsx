import React, { useState } from 'react';
import TitleDescriptionField from '@/components/atoms/TitleDescriptionField/TitleDescriptionField';
import BalanceGameOptionCard from '@/components/molecules/BalanceGameOptionCard/BalanceGameOptionCard';
import DraftPostButton from '@/components/atoms/DraftPostButton/DraftPostButton';
import { BalanceGameOption, BalanceGameSet } from '@/types/game';
import GameNavigationSection from '@/components/molecules/GameNavigationSection/GameNavigationSection';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import Button from '@/components/atoms/Button/Button';
import { ERROR } from '@/constants/message';
import * as S from './BalanceGameCreation.style';

export interface BalanceGameCreationProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteClick: () => void;
  onDraftLoad?: () => void;
  games: BalanceGameSet[];
  onGamesChange: (updatedGames: BalanceGameSet[]) => void;
  onImageChange: (
    stageIndex: number,
    optionIndex: number,
    file: File,
  ) => Promise<boolean>;
  onImageDelete: (stageIndex: number, optionIndex: number) => void;
  handleTagEditClick?: () => void;
}

const BalanceGameCreation = ({
  title,
  onTitleChange,
  handleCompleteClick,
  onDraftLoad,
  games,
  onGamesChange,
  onImageChange,
  onImageDelete,
  handleTagEditClick,
}: BalanceGameCreationProps) => {
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [currentStage, setCurrentStage] = useState(0);
  const [clearInput, setClearInput] = useState(false);

  const currentGame = games[currentStage];
  const currentOptions = currentGame?.gameOptions || [];
  const currentDescription = currentGame?.description || '';

  const updateOption = (
    stageIndex: number,
    optionType: 'A' | 'B',
    newOption: Partial<BalanceGameOption>,
  ) => {
    const updatedGames = games.map((game, idx) =>
      idx === stageIndex
        ? {
            ...game,
            gameOptions: game.gameOptions.map((opt, optIdx) => {
              const isA = optionType === 'A' && optIdx === 0;
              const isB = optionType === 'B' && optIdx === 1;
              if (isA || isB) {
                return { ...opt, ...newOption };
              }
              return opt;
            }),
          }
        : game,
    );
    onGamesChange(updatedGames);
  };

  const validateStage = (): true | string => {
    const { gameOptions } = currentGame || { gameOptions: [] };

    if (!gameOptions[0]?.name.trim() || !gameOptions[1]?.name.trim()) {
      return ERROR.VALIDATE.OPTION;
    }

    const hasBothImages =
      !!gameOptions[0]?.imgUrl.trim() && !!gameOptions[1]?.imgUrl.trim();
    const hasNoImages =
      !gameOptions[0]?.imgUrl.trim() && !gameOptions[1]?.imgUrl.trim();

    if (!(hasBothImages || hasNoImages)) {
      return ERROR.VALIDATE.GAME_IMAGE;
    }

    return true;
  };

  const handleNextStage = () => {
    const validationResult = validateStage();
    if (currentStage < games.length - 1) {
      if (validationResult === true) {
        setClearInput(true);
        setCurrentStage((prev) => prev + 1);
      } else {
        showToastModal(validationResult);
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
    const updatedGames = games.map((game, idx) =>
      idx === currentStage ? { ...game, description: newDescription } : game,
    );
    onGamesChange(updatedGames);
  };

  const handleOptionUpdate = (
    optionType: 'A' | 'B',
    field: 'name' | 'description',
    value: string,
  ) => {
    updateOption(currentStage, optionType, { [field]: value });
  };

  return (
    <div css={S.pageContainer}>
      <div css={S.titleDescriptionFieldContainer}>
        <TitleDescriptionField
          title={title}
          description={currentDescription}
          onTitleChange={onTitleChange}
          onDescriptionChange={(e) =>
            handleStageDescriptionChange(e.target.value)
          }
        />
        {handleTagEditClick && (
          <div css={S.tagEditButtonContainer}>
            <Button
              size="large"
              variant="outlinePrimary"
              onClick={handleTagEditClick}
            >
              태그 수정
            </Button>
          </div>
        )}
      </div>
      <div css={S.optionsContainer}>
        <BalanceGameOptionCard
          option="A"
          imgUrl={currentOptions[0]?.imgUrl || ''}
          onImageChange={(file) => {
            void onImageChange(currentStage, 0, file);
          }}
          onImageDelete={() => onImageDelete(currentStage, 0)}
          choiceInputProps={{
            value: currentOptions[0]?.name || '',
            onChange: (e) => handleOptionUpdate('A', 'name', e.target.value),
          }}
          infoInputProps={{
            value: currentOptions[0]?.description || '',
            onChange: (e) =>
              handleOptionUpdate('A', 'description', e.target.value),
          }}
          clearInput={clearInput}
        />
        <BalanceGameOptionCard
          option="B"
          imgUrl={currentOptions[1]?.imgUrl || ''}
          onImageChange={(file) => {
            void onImageChange(currentStage, 1, file);
          }}
          onImageDelete={() => onImageDelete(currentStage, 1)}
          choiceInputProps={{
            value: currentOptions[1]?.name || '',
            onChange: (e) => handleOptionUpdate('B', 'name', e.target.value),
          }}
          infoInputProps={{
            value: currentOptions[1]?.description || '',
            onChange: (e) =>
              handleOptionUpdate('B', 'description', e.target.value),
          }}
          clearInput={clearInput}
        />
      </div>
      {onDraftLoad && (
        <div css={S.draftPostButtonContainer}>
          <DraftPostButton onClick={onDraftLoad} />
        </div>
      )}
      <div css={S.navigationContainer}>
        <GameNavigationSection
          currentStage={currentStage}
          totalStage={games.length}
          handleNextClick={handleNextStage}
          handlePrevClick={handlePrevStage}
          handleCompleteClick={handleCompleteClick}
        />
      </div>
      <div css={S.toastModalStyling}>
        {isVisible && <ToastModal>{modalText}</ToastModal>}
      </div>
    </div>
  );
};

export default BalanceGameCreation;
