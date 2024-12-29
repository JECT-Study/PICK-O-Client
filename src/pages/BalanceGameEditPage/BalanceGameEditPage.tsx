import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameBySetId } from '@/hooks/api/game/useGameBySetIdQuery';
import { transformGameSetToBalanceGame } from '@/utils/balanceGameUtils';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';
import { BalanceGameSet } from '@/types/game';
import Divider from '@/components/atoms/Divider/Divider';
import Button from '@/components/atoms/Button/Button';
import TagModal from '@/components/molecules/TagModal/TagModal';
import TextModal from '@/components/molecules/TextModal/TextModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { useImageHandlers } from '@/hooks/game/useImageHandlers';
import useModal from '@/hooks/modal/useModal';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import { ERROR, SUCCESS } from '@/constants/message';
import useToastModal from '@/hooks/modal/useToastModal';
import { useEditGamesMutation } from '@/hooks/api/game/useEditGamesMutation';
import * as S from '../BalanceGameCreationPage/BalanceGameCreationPage.style';

const BalanceGameEditPage = () => {
  const { gameSetId } = useParams<{ gameSetId: string }>();
  const navigate = useNavigate();
  const currentGameSetId = Number(gameSetId);
  const { gameSet } = useGameBySetId(currentGameSetId);
  const { isVisible, modalText, showToastModal } = useToastModal();
  const [title, setTitle] = useState('');
  const [games, setGames] = useState<BalanceGameSet[]>([]);
  const [mainTag, setMainTag] = useState('');
  const [subTag, setSubTag] = useState('');

  const { mutateAsync: uploadImage } = useFileUploadMutation();
  const { mutate } = useEditGamesMutation();

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

  const { onImageChange: handleOptionImageChange, deleteImage } =
    useImageHandlers({ uploadImage });

  useEffect(() => {
    if (gameSet) {
      setTitle(gameSet.title);
      setGames(transformGameSetToBalanceGame(gameSet));
      setMainTag(gameSet.mainTag || '');
      setSubTag(gameSet.subTag || '');
    }
  }, [gameSet]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCompleteClick = () => {
    openTagModal();
  };

  const handleSaveEdit = () => {
    const data = {
      title,
      mainTag,
      subTag,
      games,
    };

    mutate(
      { gameSetId: currentGameSetId, data },
      {
        onSuccess: () => {
          showToastModal(SUCCESS.GAME.EDIT);
          navigate(`/balancegame/${currentGameSetId}`);
        },
        onError: () => {
          showToastModal(ERROR.EDITGAME.FAIL);
        },
      },
    );
  };

  const handleTagEditClick = () => {
    openTagModal();
  };

  const handleImageDelete = (stageIndex: number, optionIndex: number) => {
    setPopupData({ stageIndex, optionIndex });
    openTextModal();
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

  const handleTagSubmit = (selectedMainTag: string, selectedSubTag: string) => {
    setMainTag(selectedMainTag);
    setSubTag(selectedSubTag);
    showToastModal(SUCCESS.TAG.EDIT);
    closeTagModal();
  };

  const handleGamesChange = (updatedGames: BalanceGameSet[]) => {
    setGames(updatedGames);
  };

  const handleImageChange = async (
    stageIndex: number,
    optionIndex: number,
    file: File,
  ) => {
    return handleOptionImageChange(stageIndex, optionIndex, file, (updater) => {
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
          <div css={S.titleLabel}>나만의 밸런스게임 수정하기</div>
        </div>
        <Divider orientation="width" length={1175} />
        <BalanceGameCreation
          title={title}
          onTitleChange={handleTitleChange}
          handleCompleteClick={handleCompleteClick}
          games={games}
          onGamesChange={handleGamesChange}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
          handleTagEditClick={handleTagEditClick}
        />
        <div css={S.buttonContainer}>
          <Button
            size="medium"
            variant="outlinePrimarySquare"
            onClick={handleSaveEdit}
            css={S.customButtonStyle}
          >
            수정하기
          </Button>
        </div>
        {isTagModalOpen && (
          <div css={S.centerStyling}>
            <TagModal
              isOpen={isTagModalOpen}
              onClose={closeTagModal}
              onTagSubmit={handleTagSubmit}
              initialMainTag={mainTag}
              initialSubTag={subTag}
            />
          </div>
        )}
        {isTextModalOpen && (
          <div css={S.centerStyling}>
            <TextModal
              text="이미지를 삭제하시겠습니까?"
              isOpen={isTextModalOpen}
              onConfirm={handleConfirmDeleteImage}
              onClose={cancelDeleteImage}
            />
          </div>
        )}
        <div css={S.toastModalStyling}>
          {isVisible && <ToastModal bgColor="black">{modalText}</ToastModal>}
        </div>
      </div>
    </div>
  );
};

export default BalanceGameEditPage;
