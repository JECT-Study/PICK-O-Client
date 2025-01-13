/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { BookmarkDF, BookmarkPR, NextArrow, PrevArrow, Share } from '@/assets';
import { VoteRecord } from '@/types/vote';
import { SUCCESS } from '@/constants/message';
import { GameDetail, GameSet } from '@/types/game';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { formatDateFromISO } from '@/utils/formatData';
import Chips from '@/components/atoms/Chips/Chips';
import Divider from '@/components/atoms/Divider/Divider';
import { SubTag } from '@/components/atoms/SubTag/SubTag';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import GameStageBar from '@/components/atoms/GameStageBar/GameStageBar';
import InteractionButton from '@/components/atoms/InteractionButton/InteractionButton';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import ShareModal from '@/components/molecules/ShareModal/ShareModal';
import LoginModal from '@/components/molecules/LoginModal/LoginModal';
import BalanceGameBox from '@/components/molecules/BalanceGameBox/BalanceGameBox';
import useToastModal from '@/hooks/modal/useToastModal';
import { useGameBookmark } from '@/hooks/game/useBalanceGameBookmark';
import { useGuestGameVote } from '@/hooks/game/useBalanceGameVote';
import * as S from './BalanceGameSection.style';

export interface BalanceGameSectionProps {
  gameSetId: number;
  game?: GameSet;
  isMyGame: boolean;
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  changeStage: (step: number) => void;
}

const gameDefaultDetail: GameDetail[] = Array.from({ length: 10 }, () => ({
  id: 0,
  title: '',
  description: '',
  gameOptions: [],
  votesCountOfOptionA: 0,
  votesCountOfOptionB: 0,
  myBookmark: false,
  votedOption: null,
}));

const BalanceGameSection = ({
  gameSetId,
  game,
  isMyGame,
  currentStage,
  setCurrentStage,
  changeStage,
}: BalanceGameSectionProps) => {
  const initialRender = useRef(true);
  const currentURL: string = window.location.href;

  const gameStages: GameDetail[] =
    game?.gameDetailResponses ?? gameDefaultDetail;
  const isGuest = !!useNewSelector(selectAccessToken);

  const [guestVotedList, setGuestVotedList] = useState<VoteRecord[]>([]);

  const currentGame: GameDetail = gameStages[currentStage];
  const { handleGuestGameVote } = useGuestGameVote(
    guestVotedList,
    setGuestVotedList,
    gameSetId,
    currentStage,
    game,
  );

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const handleLogin = () => {
    showToastModal(SUCCESS.LOGIN);
    setLoginModalOpen(false);
  };

  const copyGameLink = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log('게임 링크 복사 완료!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyButton = (link: string) => {
    copyGameLink(link);
    setShareModalOpen(false);
    showToastModal(SUCCESS.COPY.LINK);
  };

  useEffect(() => {
    if (game && initialRender.current) {
      const bookmarkedIndex = gameStages.findIndex(
        (gameDetail) => gameDetail.myBookmark,
      );

      if (bookmarkedIndex !== -1) {
        setCurrentStage(bookmarkedIndex);
      }
      initialRender.current = false;
    }
  }, [game, gameStages, setCurrentStage]);

  const handleNextButton = () => {
    if (
      (isGuest && !guestVotedList[currentStage]?.votedOption) ||
      (!isGuest && !currentGame.votedOption)
    )
      return;
    changeStage(1);
  };

  const { handleBookmarkClick } = useGameBookmark(
    isGuest,
    isMyGame,
    currentGame.myBookmark,
    gameSetId,
    currentGame.id,
    showToastModal,
    game,
  );

  const myGameItem: MenuItem[] = [{ label: '수정' }, { label: '삭제' }];
  const otherGameItem: MenuItem[] = [{ label: '신고' }];

  return (
    <div css={S.balanceGameStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <ShareModal
          link={currentURL}
          isOpen={shareModalOpen}
          onConfirm={() => handleCopyButton(currentURL)}
          onClose={() => setShareModalOpen(false)}
        />
        <LoginModal
          isOpen={loginModalOpen}
          onModalLoginSuccess={handleLogin}
          onClose={() => {
            setLoginModalOpen(false);
          }}
        />
      </div>
      <div css={S.balanceGameContainer}>
        <div css={S.balanceGameWrapper}>
          {game && (
            <>
              <div css={S.balanceGameTitleWrapper}>
                <div css={S.balanceGameInfoWrapper}>
                  <div css={S.titleWrapper}>
                    <Chips variant="roundOutline">{game.mainTag}</Chips>
                    <div css={S.balanceGameTitle}>{game.title}</div>
                  </div>
                  <SubTag tag={game.subTag} />
                </div>
                <div css={S.balanceGameMenuWrapper}>
                  <div css={S.textWrapper}>
                    <span css={S.nicknameStyling}>{game.member}</span>
                    <span css={S.dateStyling}>
                      {formatDateFromISO(game.createdAt)}
                    </span>
                  </div>
                  <MenuTap menuData={isMyGame ? myGameItem : otherGameItem} />
                </div>
              </div>
              <div css={S.balanceGameSubTitle}>{currentGame.description}</div>
            </>
          )}
        </div>
        <Divider orientation="width" length={1095} />
        <BalanceGameBox
          gameSetId={gameSetId}
          gameId={currentGame.id}
          options={currentGame.gameOptions}
          selectedVote={
            isGuest
              ? guestVotedList[currentStage]?.votedOption
              : currentGame.votedOption
          }
          handleNextStage={() => changeStage(1)}
          handleGuestGameVote={handleGuestGameVote}
        />
        <div css={S.stageBarBtnWrapper}>
          <button
            type="button"
            css={[
              S.buttonStyling,
              S.activeButtonStyling(true),
              S.getButtonVisibility(currentStage),
            ]}
            onClick={() => changeStage(-1)}
          >
            <PrevArrow />
            이전 질문
          </button>
          <GameStageBar stage={currentStage} />
          <button
            type="button"
            css={[
              S.buttonStyling,
              S.activeButtonStyling(
                isGuest
                  ? guestVotedList[currentStage]?.votedOption !== null
                  : currentGame.votedOption !== null,
              ),
            ]}
            onClick={handleNextButton}
          >
            다음 질문
            <NextArrow />
          </button>
        </div>
      </div>
      <div css={S.buttonWrapper}>
        <InteractionButton
          buttonLabel="다른 사람들은 어떤 선택을 할까?"
          icon={<Share />}
          iconLabel="공유하기"
          onClick={() => setShareModalOpen(true)}
        />
        <InteractionButton
          buttonLabel="이 게임 제법 폼이 좋아?"
          icon={currentGame.myBookmark ? <BookmarkPR /> : <BookmarkDF />}
          iconLabel="저장하기"
          onClick={() => handleBookmarkClick(() => setLoginModalOpen(true))}
        />
      </div>
    </div>
  );
};

export default BalanceGameSection;
