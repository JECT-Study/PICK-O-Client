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
import { resizeImage } from '@/utils/imageUtils';
import { useLoadTempGameQuery } from '@/hooks/api/game/useLoadTempGameQuery';
import { SUCCESS, ERROR } from '@/constants/message';
import { PATH } from '@/constants/path';
import * as S from './BalanceGameCreationPage.style';

const BalanceGameCreationPage = () => {
  const [title, setTitle] = useState('');
  const [games, setGames] = useState<BalanceGameSet[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [popupData, setPopupData] = useState<{
    stageIndex: number;
    optionIndex: number;
  } | null>(null);
  const navigate = useNavigate();
  const { handleCreateBalanceGame } = useCreateBalanceGameMutation();
  const { mutateAsync: uploadImage } = useFileUploadMutation();
  const { mutate: saveTempGame } = useSaveTempGameMutation();
  const { data: tempGame, isSuccess } = useLoadTempGameQuery();
  const { isVisible, modalText, showToastModal } = useToastModal();
  const [loadedGames, setLoadedGames] = useState<BalanceGameSet[] | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDraftLoad = () => {
    if (isSuccess && tempGame) {
      const initialStages = createInitialGameStages(10);
      const mappedGames: BalanceGameSet[] = initialStages.map((stage, idx) => ({
        description: tempGame.tempGames[idx]?.description || stage.description,
        gameOptions: stage.gameOptions.map((option, optionIdx) => ({
          ...option,
          ...tempGame.tempGames[idx]?.tempGameOptions[optionIdx],
        })),
      }));

      setTitle(tempGame.title);
      setLoadedGames(mappedGames);
      showToastModal(SUCCESS.TEMPGAME.LOAD);
    } else {
      showToastModal(ERROR.TEMPGAME.LOAD);
    }
  };

  const handleImageUpload = async (
    imageFile: File,
    type: 'GAME_OPTION',
  ): Promise<{ imgUrl: string; fileId: number }> => {
    const resizedBlob = await resizeImage(imageFile, 577, 359);
    const resizedFile = new File([resizedBlob], imageFile.name, {
      type: imageFile.type,
    });

    const formData = new FormData();
    formData.append('file', resizedFile);

    try {
      const response = await uploadImage({
        formData,
        params: { type },
      });

      const { imgUrls, fileIds } = response;
      return { imgUrl: imgUrls[0], fileId: fileIds[0] };
    } catch (error) {
      throw new Error('이미지 업로드 실패');
    }
  };

  const onImageChange = async (
    stageIndex: number,
    optionIndex: number,
    imageFile: File,
  ) => {
    try {
      const { imgUrl, fileId } = await handleImageUpload(
        imageFile,
        'GAME_OPTION',
      );
      setGames((prevGames) => {
        const updatedGames = [...prevGames];
        updatedGames[stageIndex].gameOptions[optionIndex] = {
          ...updatedGames[stageIndex].gameOptions[optionIndex],
          imgUrl,
          fileId,
        };
        return updatedGames;
      });
    } catch (error) {
      alert(ERROR.IMAGE.UPLOAD);
    }
  };

  const onImageDelete = (stageIndex: number, optionIndex: number) => {
    setPopupData({ stageIndex, optionIndex });
    setIsTextModalOpen(true);
  };

  const confirmDeleteImage = () => {
    if (popupData) {
      const { stageIndex, optionIndex } = popupData;
      setGames((prevGames) => {
        const updatedGames = [...prevGames];
        updatedGames[stageIndex].gameOptions[optionIndex] = {
          ...updatedGames[stageIndex].gameOptions[optionIndex],
          imgUrl: '',
          fileId: 0,
        };
        return updatedGames;
      });
      showToastModal(SUCCESS.IMAGE.DELETE);
    }
    setPopupData(null);
    setIsTextModalOpen(false);
  };

  const cancelDeleteImage = () => {
    setPopupData(null);
    setIsTextModalOpen(false);
  };

  const handleCompleteClick = () => {
    setIsTagModalOpen(true);
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
        navigate(PATH.BALANCEGAME(gameId));
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

  return (
    <div css={S.PageContainer}>
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
          onGamesUpdate={(updatedGames) => setGames(updatedGames)}
          onImageChange={onImageChange}
          onImageDelete={onImageDelete}
          loadedGames={loadedGames || undefined}
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
                onClose={() => setIsTagModalOpen(false)}
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
                onConfirm={confirmDeleteImage}
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
