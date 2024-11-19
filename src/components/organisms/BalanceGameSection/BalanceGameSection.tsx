/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { BookmarkDF, BookmarkPR, NextArrow, PrevArrow, Share } from '@/assets';
import { ERROR, SUCCESS } from '@/constants/message';
import { GameDetail, GameSet } from '@/types/game';
import { formatDateFromISO } from '@/utils/formatData';
import Chips from '@/components/atoms/Chips/Chips';
import Divider from '@/components/atoms/Divider/Divider';
import { SubTag } from '@/components/atoms/SubTag/SubTag';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import GameStageBar from '@/components/atoms/GameStageBar/GameStageBar';
import InteractionButton from '@/components/atoms/InteractionButton/InteractionButton';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import ShareModal from '@/components/molecules/ShareModal/ShareModal';
import BalanceGameBox from '@/components/molecules/BalanceGameBox/BalanceGameBox';
import useToastModal from '@/hooks/modal/useToastModal';
import { useCreateGameBookmarkMutation } from '@/hooks/api/bookmark/useCreateGameBookmarkMutation';
import { useDeleteGameBookmarkMutation } from '@/hooks/api/bookmark/useDeleteGameBookmarkMutation';
import { MyVoteOption, VoteOption, VoteRecord } from '@/types/vote';
import * as S from './BalanceGameSection.style';

export interface BalanceGameSectionProps {
  gameSetId: number;
  game?: GameSet;
  isMyGame?: boolean;
  currentStage: number;
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  handleNextGame: () => void;
  handlePrevGame: () => void;
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
  handleNextGame,
  handlePrevGame,
}: BalanceGameSectionProps) => {
  const initialRender = useRef(true);
  const currentURL: string = window.location.href;

  const gameStages: GameDetail[] =
    game?.gameDetailResponses ?? gameDefaultDetail;
  const isGuest = !localStorage.getItem('accessToken');

  const [guestVotedList, setGuestVotedList] = useState<VoteRecord[]>([]);

  useEffect(() => {
    const updateGuestVotedList = () => {
      const storedVotes = localStorage.getItem(`game_${gameSetId}`);
      setGuestVotedList(
        storedVotes ? (JSON.parse(storedVotes) as VoteRecord[]) : [],
      );
    };

    updateGuestVotedList();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `game_${gameSetId}`) {
        updateGuestVotedList();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    updateGuestVotedList();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [gameSetId]);

  const handleGuestGameVote = (
    selectedOption: MyVoteOption,
    voteOption: VoteOption,
  ) => {
    const updatedVotes = [...guestVotedList];
    const currentVoteIndex = updatedVotes.findIndex(
      (vote) => vote.gameId === game?.gameDetailResponses[currentStage]?.id,
    );

    if (!selectedOption) {
      updatedVotes.push({
        gameId: game?.gameDetailResponses[currentStage]?.id as number,
        votedOption: voteOption,
      });
    } else if (selectedOption === voteOption) {
      updatedVotes.splice(currentVoteIndex, 1);
    } else {
      updatedVotes[currentVoteIndex].votedOption = voteOption;
    }

    setGuestVotedList(updatedVotes);
    localStorage.setItem(`game_${gameSetId}`, JSON.stringify(updatedVotes));
  };

  const currentGame: GameDetail = gameStages[currentStage];

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

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
    handleNextGame();
  };

  const handleNextStage = () => {
    setCurrentStage((stage) => stage + 1);
  };

  const { mutate: createBookmark } = useCreateGameBookmarkMutation(
    gameSetId,
    currentGame.id,
  );

  const { mutate: deleteBookmark } = useDeleteGameBookmarkMutation(
    gameSetId,
    currentGame.id,
  );

  const handleBookmarkClick = () => {
    if (!game) return;

    if (isMyGame) {
      showToastModal(ERROR.BOOKMARK.MY_GAME);
      return;
    }

    if (currentGame.myBookmark) {
      deleteBookmark();
    } else {
      createBookmark();
    }
  };

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
          handleNextStage={handleNextStage}
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
            onClick={handlePrevGame}
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
          onClick={handleBookmarkClick}
        />
      </div>
    </div>
  );
};

export default BalanceGameSection;
