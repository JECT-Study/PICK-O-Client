import React, { useState } from 'react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';
import Button from '@/components/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import { BalanceGame, BalanceGameSet, TempGame } from '@/types/game';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import { UploadedImage } from '@/types/file';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import TagModal from '@/components/molecules/TagModal/TagModal';
import { useCreateBalanceGameMutation } from '@/hooks/api/game/useCreateBalanceGameMutation';
import { useSaveTempGameMutation } from '@/hooks/api/game/useTempGameSaveMutation';
import { useTempGameQuery } from '@/hooks/api/game/useTempGameQuery';
import * as S from './BalanceGameCreationPage.style';

const BalanceGameCreationPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [games, setGames] = useState<BalanceGameSet[]>([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const { handleCreateBalanceGame } = useCreateBalanceGameMutation();
  const { handleSaveTempGame } = useSaveTempGameMutation();
  const { mutateAsync: uploadImage } = useFileUploadMutation();
  const { refetch: fetchTempGame } = useTempGameQuery();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
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
            storedName: '',
            description: option.description,
            optionType: option.optionType,
          })),
        })),
      );
      console.log('임시 저장된 게임 데이터를 불러왔습니다:', data);
    }
  };

  const handleImageUpload = async (
    imageFiles: File[],
  ): Promise<UploadedImage> => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('file', file);
    });

    try {
      return await uploadImage({ formData, params: { type: 'GAME' } });
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다:', error);
      throw error;
    }
  };

  const uploadAllImages = async (
    BalanceGameSets: BalanceGameSet[],
  ): Promise<UploadedImage[]> => {
    const uploadPromises = BalanceGameSets.flatMap((game) =>
      game.gameOptions.map(async (option) => {
        try {
          const imageFile = option.imageFile as File;
          return await handleImageUpload([imageFile]);
        } catch (error) {
          console.error('해당 옵션의 이미지 업로드 실패:', error);
          throw error;
        }
      }),
    );

    return Promise.all(uploadPromises);
  };

  const handleCompleteClick = () => {
    setIsTagModalOpen(true);
  };

  const handleTagSubmit = async (
    selectedMainTag: string,
    selectedSubTag: string,
  ) => {
    setIsTagModalOpen(false);

    try {
      const allUploadedImages = await uploadAllImages(games);

      let imageIndex = 0;
      const updatedGames = games.map((game) => ({
        description,
        gameOptions: game.gameOptions.map((option) => {
          const { imgUrls, storedNames } = allUploadedImages[imageIndex];
          imageIndex += 1;
          return {
            ...option,
            imgUrl: imgUrls[0],
            storedName: storedNames[0],
          };
        }),
      }));

      const gameData: BalanceGame = {
        title,
        mainTag: selectedMainTag,
        subTag: selectedSubTag,
        games: updatedGames,
      };

      await handleCreateBalanceGame(gameData);
      console.log('전송할 gameData:', gameData);
      console.log('게임 생성이 완료되었습니다!');
    } catch (error) {
      console.error('게임 생성 중 오류가 발생했습니다:', error);
    }
  };

  const handleSaveDraft = async () => {
    const activeGame = games[activeStage];
    const tempGameData: TempGame = {
      mainTag: 'ExampleMainTag',
      subTag: 'ExampleSubTag',
      tempGames: [
        {
          title,
          description,
          tempGameOptions: activeGame.gameOptions.map((option) => ({
            name: option.name,
            imgUrl: option.imgUrl,
            storedName: option.storedName,
            description: option.description,
            optionType: option.optionType,
          })),
        },
      ],
    };

    try {
      await handleSaveTempGame(tempGameData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      console.log('임시 저장 성공:', tempGameData);
    } catch (error) {
      console.error('임시 저장 중 오류:', error);
    }
  };

  const handleTagSubmitWrapper = (mainTag: string, subTag: string) => {
    handleTagSubmit(mainTag, subTag).catch((error) =>
      console.error('태그 제출 중 에러 발생:', error),
    );
  };

  return (
    <div css={S.pageContainer}>
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
              onTagSubmit={handleTagSubmitWrapper}
            />
          </div>
        </>
      )}
      <div css={S.toastModalStyling}>
        {showToast && <ToastModal bgColor="black">임시저장완료</ToastModal>}
      </div>
    </div>
  );
};

export default BalanceGameCreationPage;
