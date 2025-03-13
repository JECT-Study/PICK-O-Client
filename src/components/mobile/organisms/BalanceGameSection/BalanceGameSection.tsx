import React, { useState, useEffect, useRef } from 'react';
import { MobileBookmarkDF, MobileBookmarkPR, MobileShare } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { GameDetail, GameSet } from '@/types/game';
import { createArrayFromCommaString } from '@/utils/array';
import { PATH } from '@/constants/path';
import { ERROR, PROMPT } from '@/constants/message';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import useToastModal from '@/hooks/modal/useToastModal';
import { VoteRecord } from '@/types/vote';
import Button from '@/components/mobile//atoms/Button/Button';
import IconButton from '@/components/mobile//atoms/IconButton/IconButton';
import GameTag from '@/components/mobile//atoms/GameTag/GameTag';
import GameTagChip from '@/components/mobile//atoms/GameTagChip/GameTagChip';
import GameStageLabel from '@/components/mobile//atoms/GameStageLabel/GameStageLabel';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import BalanceGameBox from '@/components/mobile/molecules/BalanceGameBox/BalanceGameBox';
import { useGuestGameVote } from '@/hooks/game/useBalanceGameVote';
import { useGameBookmark } from '@/hooks/game/useBalanceGameBookmark';
import { useDeleteGameSetMutation } from '@/hooks/api/game/useDeleteGameSetMutation';
import ShareModal from '@/components/mobile/molecules/ShareModal/ShareModal';
import TextModal from '@/components/mobile/molecules/TextModal/TextModal';
import ReportModal from '@/components/mobile/molecules/ReportModal/ReportModal';
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
  const navigate = useNavigate();

  const gameStages: GameDetail[] =
    game?.gameDetailResponses ?? gameDefaultDetail;
  const isGuest = !useNewSelector(selectAccessToken);

  const [guestVotedList, setGuestVotedList] = useState<VoteRecord[]>([]);

  const currentGame: GameDetail = gameStages[currentStage];
  const subTagList = createArrayFromCommaString(game?.subTag ?? '');

  const { handleGuestGameVote } = useGuestGameVote(
    guestVotedList,
    setGuestVotedList,
    gameSetId,
    currentStage,
    game,
  );

  const { isVisible, modalText, showToastModal } = useToastModal();
  const { mutate: deleteBalanceGame } = useDeleteGameSetMutation();

  const [activeModal, setActiveModal] = useState<
    'reportGame' | 'reportText' | 'deleteText' | 'share' | 'none'
  >('none');

  const onCloseModal = () => {
    setActiveModal('none');
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

  const handleGameDeleteButton = () => {
    deleteBalanceGame(
      { gameSetId },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: () => {
          showToastModal(ERROR.DELETEGAME.FAIL);
        },
      },
    );
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

  const myGameItem: MenuItem[] = [
    {
      id: 0,
      label: '수정',
      onClick: () => {
        navigate(`/${PATH.CREATE.GAME}`, { state: { game, gameSetId } });
      },
    },
    {
      id: 1,
      label: '삭제',
      onClick: () => {
        setActiveModal('deleteText');
      },
    },
  ];
  const otherGameItem: MenuItem[] = [
    {
      id: 0,
      label: '신고',
      onClick: () => {
        setActiveModal('reportText');
      },
    },
  ];

  return (
    <div css={S.balanceGameStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <ShareModal
          isOpen={activeModal === 'share'}
          onConfirm={() => {}}
          onClose={onCloseModal}
        />
        <TextModal
          text={PROMPT.GAME.DELETE}
          isOpen={activeModal === 'deleteText'}
          onConfirm={handleGameDeleteButton}
          onClose={onCloseModal}
        />
        <TextModal
          text={PROMPT.GAME.REPORT}
          isOpen={activeModal === 'reportText'}
          onConfirm={() => setActiveModal('reportGame')}
          onClose={onCloseModal}
        />
        <ReportModal
          isOpen={activeModal === 'reportGame'}
          onConfirm={() => {}}
          onClose={onCloseModal}
        />
      </div>
      <div css={S.balancGameTopWrapper}>
        <GameTag tag={game?.mainTag ?? ''} />
        <div css={S.iconButtonWrapper}>
          <IconButton
            icon={<MobileShare />}
            onClick={() => setActiveModal('share')}
          />
          <IconButton
            icon={
              currentGame.myBookmark ? (
                <MobileBookmarkPR />
              ) : (
                <MobileBookmarkDF />
              )
            }
            onClick={() =>
              handleBookmarkClick(() => navigate(`/${PATH.LOGIN}`))
            }
          />
        </div>
      </div>
      {game && (
        <div css={S.balanceGameScrollStyling}>
          <div css={S.balanceGameSectionStyling}>
            <div css={S.stageWrapper}>
              <div css={S.stageStyling}>
                <GameStageLabel color="main" stage={currentStage} />
              </div>
              <div css={S.menuStyling}>
                <MenuTap menuData={isMyGame ? myGameItem : otherGameItem} />
              </div>
            </div>
            <div css={S.titleStyling}>{game.title}</div>
            <div css={S.descriptionStyling}>{currentGame.description}</div>
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
          </div>
          <div css={S.subTagWrapper}>
            {game.subTag &&
              subTagList.map((tag) => <GameTagChip key={tag} tag={tag} />)}
          </div>
        </div>
      )}
      <div css={S.stageButtonWrapper}>
        <Button
          variant="primary"
          size="medium"
          css={S.getButtonVisibility(currentStage)}
          onClick={() => changeStage(-1)}
        >
          이전
        </Button>
        <Button
          variant="primary"
          size="medium"
          active={
            isGuest
              ? guestVotedList[currentStage]?.votedOption !== null
              : currentGame.votedOption !== null
          }
          onClick={handleNextButton}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default BalanceGameSection;
