/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { BalanceGame, TempGame } from '@/types/game';
import {
  createInitialGameStages,
  transformBalanceGameToTempGame,
  transformTempGameToBalanceGame,
} from '@/utils/balanceGameUtils';
import useGameInputs from '@/hooks/game/useGameInputs';
import useToastModal from '@/hooks/modal/useToastModal';
import { useCreateGameMutation } from '@/hooks/api/game/useCreateGameMutation';
import { useLoadTempGameQuery } from '@/hooks/api/game/useLoadTempGameQuery';
import { useSaveTempGameMutation } from '@/hooks/api/game/useSaveTempGameMutation';
import {
  validateBalanceGameForm,
  validateGameTag,
} from './validateBalanceGameForm';

export const usePostBalanceGameForm = (
  gameStage: number,
  setGameStage: React.Dispatch<React.SetStateAction<number>>,
  setTagModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const defaultGameOptions = createInitialGameStages(10);
  const initialState: BalanceGame = {
    title: '',
    mainTag: '',
    subTag: '',
    games: defaultGameOptions,
  };

  const { form, setForm, onChange, setEach } = useGameInputs(initialState);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { mutate: createBalanceGame } = useCreateGameMutation(showToastModal);

  const { data: tempGame } = useLoadTempGameQuery();
  const { mutate: saveTempGame } = useSaveTempGameMutation();

  const [isTempGameLoaded, setIsTempGameLoaded] = useState<boolean>(false);

  // 게임 생성
  const handleBalanceGame = () => {
    const gameValidation = validateGameTag(form);

    if (!gameValidation.isValid) {
      return;
    }
    createBalanceGame(form);
  };

  // 임시저장하기
  const handleTempBalanceGame = () => {
    const tempBalanceGame: TempGame = transformBalanceGameToTempGame(
      form,
      isTempGameLoaded,
    );
    saveTempGame(tempBalanceGame);
    setIsTempGameLoaded(true);
  };

  // 임시저장 불러오기
  const handleDraftButton = () => {
    if (tempGame) {
      const savedBalanceGame: BalanceGame = transformTempGameToBalanceGame(
        tempGame,
        form.mainTag,
        form.subTag,
      );
      setForm(savedBalanceGame);
      setIsTempGameLoaded(true);
    }
  };

  const handleFileId = (name: string, fileId: number, gameOptionId: number) => {
    setEach(name, fileId, gameStage, gameOptionId);
  };

  const handleImgUrl = (name: string, imgUrl: string, gameOptionId: number) => {
    setEach(name, imgUrl, gameStage, gameOptionId);
  };

  const handlePrevGame = () => {
    setGameStage((prev) => prev - 1);
  };

  const handleNextGame = () => {
    const gameValidation = validateBalanceGameForm(form, gameStage);

    if (!gameValidation.isValid) {
      showToastModal(gameValidation.message);
      return;
    }

    if (gameStage === 9) {
      setTagModalOpen(true);
      return;
    }

    setGameStage((prev) => prev + 1);
  };

  return {
    form,
    onChange,
    setEach,
    isVisible,
    modalText,
    handleFileId,
    handleImgUrl,
    handlePrevGame,
    handleNextGame,
    handleBalanceGame,
    handleTempBalanceGame,
    handleDraftButton,
  };
};
