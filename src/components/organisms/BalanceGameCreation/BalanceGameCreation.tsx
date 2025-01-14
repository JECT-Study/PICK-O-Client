import React, { useEffect } from 'react';
import TitleDescriptionField from '@/components/atoms/TitleDescriptionField/TitleDescriptionField';
import BalanceGameOptionCard from '@/components/molecules/BalanceGameOptionCard/BalanceGameOptionCard';
import DraftPostButton from '@/components/atoms/DraftPostButton/DraftPostButton';
import { BalanceGameSet } from '@/types/game';
import { useBalanceGameCreation } from '@/hooks/game/useBalanceGameCreation';
import GameNavigationSection from '@/components/molecules/GameNavigationSection/GameNavigationSection';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import * as S from './BalanceGameCreation.style';

export interface BalanceGameCreationProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteClick: () => void;
  onDraftLoad: () => void;
  onGamesUpdate: (games: BalanceGameSet[]) => void;
  onImageChange: (stageIndex: number, optionIndex: number, file: File) => void;
  onImageDelete: (stageIndex: number, optionIndex: number) => void;
  loadedGames?: BalanceGameSet[];
}

const BalanceGameCreation = ({
  title,
  onTitleChange,
  handleCompleteClick,
  onDraftLoad,
  onGamesUpdate,
  onImageChange,
  onImageDelete,
  loadedGames,
}: BalanceGameCreationProps) => {
  const totalStage = 10;
  const { isVisible, modalText, showToastModal } = useToastModal();

  const {
    games,
    currentStage,
    currentOptions,
    currentDescription,
    clearInput,
    handleNextStage,
    handlePrevStage,
    handleStageDescriptionChange,
    handleOptionUpdate,
  } = useBalanceGameCreation(showToastModal, totalStage, loadedGames);

  useEffect(() => {
    onGamesUpdate(games);
  }, [games, onGamesUpdate]);

  return (
    <div css={S.pageContainer}>
      <TitleDescriptionField
        title={title}
        description={currentDescription}
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
          onImageChange={(file) => onImageChange(currentStage, 1, file)}
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
      <div css={S.toastModalStyling}>
        {isVisible && <ToastModal>{modalText}</ToastModal>}
      </div>
    </div>
  );
};

export default BalanceGameCreation;
