import React, { useEffect, useState } from 'react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';
import Button from '@/components/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import { BalanceGame, BalanceGameSet, TempGame } from '@/types/game';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import TagModal from '@/components/molecules/TagModal/TagModal';
import { useCreateBalanceGameMutation } from '@/hooks/api/game/useCreateBalanceGameMutation';
import { useSaveTempGameMutation } from '@/hooks/api/game/useTempGameSaveMutation';
import { useTempGameQuery } from '@/hooks/api/game/useTempGameQuery';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './BalanceGameCreationPage.style';

const BalanceGameCreationPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [games, setGames] = useState<BalanceGameSet[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const { handleCreateBalanceGame } = useCreateBalanceGameMutation();
  const { handleSaveTempGame } = useSaveTempGameMutation();
  const { mutateAsync: uploadImage } = useFileUploadMutation();
  const { refetch: fetchTempGame } = useTempGameQuery();
  const { isVisible, showToastModal } = useToastModal();

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

  const handleDraftLoad = async () => {
    const { data } = await fetchTempGame();
    if (data) {
      setTitle(data.tempGameDetailResponses[0].title);
      setDescription(data.tempGameDetailResponses[0].description);
      setGames(
        data.tempGameDetailResponses.map((gameDetail) => ({
          description: gameDetail.description,
          gameOptions: gameDetail.tempGameOptions.map((option) => ({
            id: 100,
            name: option.name,
            imgUrl: option.imgUrl,
            fileId: 0,
            description: option.description,
            optionType: option.optionType,
          })),
        })),
      );
    }
  };

  const handleImageUpload = async (
    imageFile: File,
    type: 'GAME_OPTION',
  ): Promise<{ imgUrl: string; fileId: number }> => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const { imgUrls, fileIds } = await uploadImage({
      formData,
      params: { type },
    });
    return { imgUrl: imgUrls[0], fileId: fileIds[0] };
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
      console.error('Image upload failed:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
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
      await handleCreateBalanceGame(gameData);
      alert('게임 생성이 완료되었습니다.');
    } catch (error) {
      console.error('게임 생성 실패:', error);
      alert('게임 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSaveDraft = async () => {
    const activeGame = games[activeStage];
    const tempGameData: TempGame = {
      mainTag: '임시메인태그',
      subTag: '임시서브태그',
      tempGames: [
        {
          title,
          description,
          tempGameOptions: activeGame.gameOptions.map((option) => ({
            name: option.name,
            imgUrl: option.imgUrl,
            fileId: option.fileId,
            description: option.description,
            optionType: option.optionType,
          })),
        },
      ],
    };
    await handleSaveTempGame(tempGameData);
    showToastModal('임시저장완료');
  };

  useEffect(() => {
    if (games[activeStage]) {
      setDescription(games[activeStage].description || '');
    }
  }, [activeStage, games]);

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
          description={description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          handleCompleteClick={handleCompleteClick}
          onDraftLoad={handleDraftLoad}
          onStageChange={(stage) => setActiveStage(stage)}
          onGamesUpdate={(updatedGames) => setGames(updatedGames)}
          onImageChange={onImageChange}
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
        <div css={S.toastModalStyling}>
          {isVisible && <ToastModal bgColor="black">임시저장완료</ToastModal>}
        </div>
      </div>
    </div>
  );
};

export default BalanceGameCreationPage;
