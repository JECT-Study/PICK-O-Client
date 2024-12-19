import React, { useState } from 'react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';
import Button from '@/components/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import {
  BalanceGame,
  BalanceGameSet,
  TempGame,
  TempGameSet,
} from '@/types/game';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import TagModal from '@/components/molecules/TagModal/TagModal';
import { useCreateBalanceGameMutation } from '@/hooks/api/game/useCreateBalanceGameMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import TextModal from '@/components/molecules/TextModal/TextModal';
import { useNavigate } from 'react-router-dom';
import { useSaveTempGameMutation } from '@/hooks/api/game/useSaveTempGameMutation';
import { createInitialGameStages } from '@/utils/balanceGameUtils';
import { useLoadTempGameQuery } from '@/hooks/api/game/useLoadTempGameQuery';
import useModal from '@/hooks/modal/useModal';
import { SUCCESS, ERROR } from '@/constants/message';
import { useImageHandlers } from '@/hooks/game/useImageHandlers';
import * as S from './BalanceGameCreationPage.style';

const TOTAL_STAGE = 10;

const BalanceGameCreationPage = () => {
  const [title, setTitle] = useState('');
  const [games, setGames] = useState<BalanceGameSet[]>(() =>
    createInitialGameStages(TOTAL_STAGE),
  );
  const navigate = useNavigate();
  const { handleCreateBalanceGame } = useCreateBalanceGameMutation();
  const { mutateAsync: uploadImage } = useFileUploadMutation();
  const { mutate: saveTempGame } = useSaveTempGameMutation();
  const { data: tempGame, isSuccess } = useLoadTempGameQuery();
  const { isVisible, modalText, showToastModal } = useToastModal();

  const {
    isOpen: isTagModalOpen,
    openModal: openTagModal,
    closeModal: closeTagModal,
  } = useModal();
  const {
    isOpen: isTextModalOpen,
    openModal: openTextModal,
    closeModal: closeTextModal,
  } = useModal();

  const [popupData, setPopupData] = useState<{
    stageIndex: number;
    optionIndex: number;
  } | null>(null);

  const { onImageChange, deleteImage } = useImageHandlers({ uploadImage });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDraftLoad = () => {
    if (isSuccess && tempGame) {
      const initialStages = createInitialGameStages(TOTAL_STAGE);
      const mappedGames: BalanceGameSet[] = initialStages.map((stage, idx) => ({
        description: tempGame.tempGames[idx]?.description || stage.description,
        gameOptions: stage.gameOptions.map((option, optionIdx) => ({
          ...option,
          ...tempGame.tempGames[idx]?.tempGameOptions[optionIdx],
        })),
      }));

      setTitle(tempGame.title);
      setGames(mappedGames);
      showToastModal(SUCCESS.TEMPGAME.LOAD);
    } else {
      showToastModal(ERROR.TEMPGAME.LOAD);
    }
  };

  const handleConfirmDeleteImage = () => {
    if (popupData) {
      deleteImage(popupData.stageIndex, popupData.optionIndex, (updater) => {
        setGames(updater);
      });
      showToastModal(SUCCESS.IMAGE.DELETE);
    }
    setPopupData(null);
    closeTextModal();
  };

  const cancelDeleteImage = () => {
    setPopupData(null);
    closeTextModal();
  };

  const handleCompleteClick = () => {
    openTagModal();
  };

  const handleTagSubmit = async (
    selectedMainTag: string,
    selectedSubTag: string,
  ) => {
    if (!games.length) {
      showToastModal(ERROR.CREATEGAME.EMPTY_DATA);
      return;
    }

    const gameData: BalanceGame = {
      title,
      mainTag: selectedMainTag,
      subTag: selectedSubTag,
      games,
    };

    try {
      const gameId = await handleCreateBalanceGame(gameData);
      showToastModal(SUCCESS.CREATEGAME.CREATE, () => {
        navigate(`/balancegame/${gameId}`);
      });
    } catch (error) {
      showToastModal(ERROR.CREATEGAME.FAIL);
    }
  };

  const convertToTempGameSets = (gameSets: BalanceGameSet[]): TempGameSet[] => {
    return gameSets.map(({ description: setDescription, gameOptions }) => ({
      description: setDescription,
      tempGameOptions: gameOptions.map(
        ({ name, description: optionDescription, fileId, optionType }) => ({
          name,
          description: optionDescription,
          fileId: fileId ?? null,
          optionType,
        }),
      ),
    }));
  };

  const handleSaveDraft = () => {
    const tempGameData: TempGame = {
      title,
      isLoaded: false,
      tempGames: convertToTempGameSets(games),
    };
    saveTempGame(tempGameData, {
      onSuccess: () => {
        showToastModal(SUCCESS.TEMPGAME.SAVE);
      },
      onError: () => {
        showToastModal(ERROR.TEMPGAME.SAVE);
      },
    });
  };

  /**
   * 상태 변경 요청을 처리하는 콜백
   * 자식이 상태를 갱신하고자 할 때 이 함수를 호출하면
   * 부모에서 setGames를 통해 상태를 갱신
   */
  const handleGamesChange = (updatedGames: BalanceGameSet[]) => {
    setGames(updatedGames);
  };

  const handleImageDeleteClick = (stageIndex: number, optionIndex: number) => {
    setPopupData({ stageIndex, optionIndex });
    openTextModal();
  };

  const handleImageChange = async (
    stageIndex: number,
    optionIndex: number,
    file: File,
  ) => {
    return onImageChange(stageIndex, optionIndex, file, (updater) => {
      setGames(updater);
    });
  };

  return (
    <div css={S.pageContainer}>
      <div css={S.pageWrapper}>
        <div css={S.textWrapper}>
          <div css={S.subLabel}>
            센스 가득한 질문들로 고민 500번 하게 만들어 볼까?
          </div>
          <div css={S.titleLabel}>나만의 밸런스게임 만들기</div>
        </div>
        <Divider orientation="width" length={1175} />
        <BalanceGameCreation
          title={title}
          onTitleChange={handleTitleChange}
          handleCompleteClick={handleCompleteClick}
          onDraftLoad={handleDraftLoad}
          games={games}
          onGamesChange={handleGamesChange}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDeleteClick}
        />
        <div css={S.buttonContainer}>
          <Button
            size="medium"
            variant="outlinePrimarySquare"
            onClick={handleSaveDraft}
            css={S.customButtonStyle}
          >
            임시저장하기
          </Button>
        </div>
        {isTagModalOpen && (
          <>
            <div css={S.submitModalBackdrop} />
            <div css={S.centerStyling}>
              <TagModal
                isOpen={isTagModalOpen}
                onClose={closeTagModal}
                onTagSubmit={handleTagSubmit}
              />
            </div>
          </>
        )}
        {isTextModalOpen && (
          <>
            <div css={S.deleteModalBackdrop} />
            <div css={S.centerStyling}>
              <TextModal
                text="이미지를 삭제하시겠습니까?"
                isOpen={isTextModalOpen}
                onConfirm={handleConfirmDeleteImage}
                onClose={cancelDeleteImage}
              />
            </div>
          </>
        )}
        <div css={S.toastModalStyling}>
          {isVisible && <ToastModal bgColor="black">{modalText}</ToastModal>}
        </div>
      </div>
    </div>
  );
};

export default BalanceGameCreationPage;
