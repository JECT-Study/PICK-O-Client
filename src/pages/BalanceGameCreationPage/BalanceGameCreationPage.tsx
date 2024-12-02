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
      console.log('임시 저장 불러오기 시작');
      console.log('불러온 임시 저장 데이터:', tempGame);
      const initialStages = createInitialGameStages(10);
      console.log('생성된 초기 스테이지 데이터:', initialStages);

      const mappedGames: BalanceGameSet[] = initialStages.map((stage, idx) => ({
        description: tempGame.tempGames[idx]?.description || stage.description,
        gameOptions: stage.gameOptions.map((option, optionIdx) => ({
          ...option,
          ...tempGame.tempGames[idx]?.tempGameOptions[optionIdx],
        })),
      }));
      console.log('병합된 게임 데이터:', mappedGames);

      setTitle(tempGame.title);
      setLoadedGames(mappedGames);
      showToastModal('임시 저장 데이터를 불러왔습니다!');
    } else {
      showToastModal('임시 저장 데이터를 불러오는 데 실패했습니다.');
    }
  };

  const handleImageUpload = async (
    imageFile: File,
    type: 'GAME_OPTION',
  ): Promise<{ imgUrl: string; fileId: number }> => {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await uploadImage({
        formData,
        params: { type },
      });

      const { imgUrls, fileIds } = response;
      return { imgUrl: imgUrls[0], fileId: fileIds[0] };
    } catch (error) {
      console.error('API 호출 에러:', error);
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
      console.error('onImageChange 에러:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
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
      showToastModal('이미지가 삭제되었습니다.');
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
      alert('게임 데이터가 없습니다. 입력 후 완료 버튼을 눌러주세요.');
      return;
    }

    const gameData: BalanceGame = {
      title,
      mainTag: selectedMainTag,
      subTag: selectedSubTag,
      games,
    };

    try {
      console.log('게임 생성 요청 중...');
      await handleCreateBalanceGame(gameData);
      showToastModal('게임 생성이 완료되었습니다.', () => navigate('/'));
    } catch (error) {
      console.error('게임 생성 실패:', error);
      alert('게임 생성에 실패했습니다. 다시 시도해주세요.');
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
    console.log('임시 저장 실행 데이터:', tempGameData);
    saveTempGame(tempGameData, {
      onSuccess: () => {
        showToastModal('임시 저장이 완료되었습니다!');
      },
      onError: () => {
        showToastModal('임시 저장에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <div css={S.PageContainer}>
      <div css={S.pageWrapper}>
        <span css={S.subLabel}>
          센스 가득한 질문들로 고민 500번 하게 만들어 볼까?
        </span>
        <span css={S.titleLabel}>나만의 밸런스게임 만들기</span>
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
