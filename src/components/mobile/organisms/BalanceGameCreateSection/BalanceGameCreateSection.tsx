/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { usePostBalanceGameForm } from '@/hooks/game/usePostBalanceGameForm';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import Button from '../../atoms/Button/Button';
import GameStageLabel from '../../atoms/GameStageLabel/GameStageLabel';
import DraftSaveButton from '../../atoms/DraftSaveButton/DraftSaveButton';
import TitleDescriptionField from '../../atoms/TitleDescriptionField/TitleDescriptionField';
import OptionCard from '../../molecules/OptionCard/OptionCard';
import GameTagModal from '../../molecules/GameTagModal/GameTagModal';
import TempGameModal from '../../molecules/TempGameModal/TempGameModal';
import * as S from './BalanceGameCreateSection.style';
import TextModal from '../../molecules/TextModal/TextModal';

const BalanceGameCreateSection = () => {
  const [gameStage, setGameStage] = useState<number>(0);

  const [tagModalOpen, setTagModalOpen] = useState<boolean>(false);
  const [tempModalOpen, setTempModalOpen] = useState<boolean>(false);

  const [imgDeleteModalOpen, setImgDeleteModalOpen] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0);

  const {
    form,
    onChange,
    setEach,
    isVisible,
    modalText,
    handleImgChange,
    handleDeleteImg,
    handlePrevGame,
    handleNextGame,
    handleBalanceGame,
    handleTempBalanceGame,
    handleDraftButton,
  } = usePostBalanceGameForm(gameStage, setGameStage, setTagModalOpen);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <form css={S.balanceGameStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal bgColor="black">{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        {tagModalOpen && (
          <GameTagModal
            form={form}
            isOpen={tagModalOpen}
            onClose={() => setTagModalOpen(false)}
            setMainTagValue={setEach}
            setSubTagValue={onChange}
            submitGame={handleBalanceGame}
          />
        )}
        {tempModalOpen && (
          <TempGameModal
            isOpen={tempModalOpen}
            onClose={() => {
              setTempModalOpen(false);
            }}
            onGetGame={() => {
              handleDraftButton();
              setTempModalOpen(false);
            }}
            onSaveGame={() => {
              handleTempBalanceGame();
              setTempModalOpen(false);
            }}
          />
        )}
        {imgDeleteModalOpen && (
          <TextModal
            text="이미지를 삭제하시겠습니까?"
            isOpen={imgDeleteModalOpen}
            onClose={() => {
              setImgDeleteModalOpen(false);
            }}
            onConfirm={() => {
              handleDeleteImg(
                form.games[gameStage].gameOptions[selectedOptionId].fileId,
                selectedOptionId,
              );
              setImgDeleteModalOpen(false);
            }}
          />
        )}
      </div>
      <div css={S.balanceGameTopWrapper}>
        <div css={S.balanceGameTextWrapper}>
          <p css={S.balanceGameTextStyle}>밸런스게임 작성하기</p>
          <GameStageLabel stage={gameStage} />
        </div>
        <DraftSaveButton
          onClick={() => {
            setTempModalOpen(true);
          }}
        />
      </div>
      <TitleDescriptionField
        titleProps={{
          name: 'title',
          value: form.title,
          onChange: (e) => onChange(e),
        }}
        subTitleProps={{
          name: 'description',
          value: form.games[gameStage].description,
          onChange: (e) => onChange(e, gameStage, -1),
        }}
      />
      <div css={S.cardButtonWrapper}>
        <div css={S.cardTextWrapper}>
          <span css={S.cardTextStyle}>선택지 입력</span>
          <span css={S.cardTextSubStyle}>(필수)</span>
        </div>
        <OptionCard
          type="A"
          nameProps={{
            name: 'name',
            value: form.games[gameStage].gameOptions[0].name,
            onChange: (e) => onChange(e, gameStage, 0),
          }}
          descriptionProps={{
            name: 'description',
            value: form.games[gameStage].gameOptions[0].description,
            onChange: (e) => onChange(e, gameStage, 0),
          }}
          imgUrl={form.games[gameStage].gameOptions[0].imgUrl}
          handleImgChange={handleImgChange}
          handleDeleteImg={() => {
            setSelectedOptionId(0);
            setImgDeleteModalOpen(true);
          }}
        />
        <OptionCard
          type="B"
          nameProps={{
            name: 'name',
            value: form.games[gameStage].gameOptions[1].name,
            onChange: (e) => onChange(e, gameStage, 1),
          }}
          descriptionProps={{
            name: 'description',
            value: form.games[gameStage].gameOptions[1].description,
            onChange: (e) => onChange(e, gameStage, 1),
          }}
          imgUrl={form.games[gameStage].gameOptions[1].imgUrl}
          handleImgChange={handleImgChange}
          handleDeleteImg={() => {
            setSelectedOptionId(1);
            setImgDeleteModalOpen(true);
          }}
        />
        <div css={S.buttonWrapper}>
          <Button
            variant="primary"
            size="medium"
            css={S.getButtonVisibility(gameStage)}
            onClick={handlePrevGame}
          >
            이전
          </Button>
          <Button variant="primary" size="medium" onClick={handleNextGame}>
            {gameStage === 9 ? '제작완료' : '다음'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BalanceGameCreateSection;
