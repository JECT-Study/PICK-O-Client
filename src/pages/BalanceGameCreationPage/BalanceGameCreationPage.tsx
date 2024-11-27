import React, { useEffect, useState } from 'react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';
import Button from '@/components/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import { BalanceGame, BalanceGameSet } from '@/types/game';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import TagModal from '@/components/molecules/TagModal/TagModal';
import { useCreateBalanceGameMutation } from '@/hooks/api/game/useCreateBalanceGameMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import TextModal from '@/components/molecules/TextModal/TextModal';
import { useNavigate } from 'react-router-dom';
import * as S from './BalanceGameCreationPage.style';

const BalanceGameCreationPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [games, setGames] = useState<BalanceGameSet[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [popupData, setPopupData] = useState<{
    stageIndex: number;
    optionIndex: number;
  } | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const navigate = useNavigate();

  const { handleCreateBalanceGame } = useCreateBalanceGameMutation();
  const { mutateAsync: uploadImage } = useFileUploadMutation();
  const { isVisible, modalText, showToastModal } = useToastModal();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    setGames((prevGames) => {
      const updatedGames = [...prevGames];
      updatedGames[activeStage] = {
        ...updatedGames[activeStage],
        description,
      };
      return updatedGames;
    });
  };

  const handleDraftLoad = () => {
    alert('준비 중입니다!');
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

  const handleSaveDraft = () => {
    alert('준비 중입니다!');
  };

  useEffect(() => {
    if (games[activeStage]) {
      setDescription(games[activeStage].description || '');
    }
  }, [activeStage, games]);

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
          description={description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          handleCompleteClick={handleCompleteClick}
          onDraftLoad={handleDraftLoad}
          onStageChange={(stage) => setActiveStage(stage)}
          onGamesUpdate={(updatedGames) => setGames(updatedGames)}
          onImageChange={onImageChange}
          onImageDelete={onImageDelete}
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
            <div css={S.modalBackdrop} />
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
            <div css={S.modalBackdrop} />
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
