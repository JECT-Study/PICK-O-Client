import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useGameBySetId } from '@/hooks/api/game/useGameBySetIdQuery';
import Divider from '@/components/atoms/Divider/Divider';
import BalanceGameSection from '@/components/organisms/BalanceGameSection/BalanceGameSection';
import BalanceGameEndingSection from '@/components/organisms/BalanceGameEndingSection/BalanceGameEndingSection';
import useModal from '@/hooks/modal/useModal';
import { PATH } from '@/constants/path';
import TextModal, {
  TextModalProps,
} from '@/components/molecules/TextModal/TextModal';
import { useDeleteGameSetMutation } from '@/hooks/api/game/useDeleteGameSetMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import { ERROR, SUCCESS } from '@/constants/message';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import * as S from './BalanceGamePage.style';

const BalanceGamePage = () => {
  const { setId } = useParams<{ setId: string }>();
  const gameSetId = Number(setId);
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const [modalProps, setModalProps] = useState<Omit<TextModalProps, 'isOpen'>>({
    text: '',
  });

  const { gameSet } = useGameBySetId(gameSetId);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const isMyGame: boolean = member?.nickname === gameSet?.member;

  const { mutate: deleteGameSet } = useDeleteGameSetMutation();

  const handleNextGame = () => {
    setCurrentStage((stage) => (stage < 10 ? stage + 1 : stage));
  };

  const handlePrevGame = () => {
    setCurrentStage((stage) => (stage > 0 ? stage - 1 : stage));
  };

  const handleEditClick = () => {
    navigate(`/${PATH.BALANCEGAME_EDIT_LINK(gameSetId)}`);
  };

  const handleDeleteClick = () => {
    setModalProps({
      text: '정말 삭제하시겠습니까?',
      onConfirm: () => {
        deleteGameSet(
          { gameSetId },
          {
            onSuccess: () => {
              closeModal();
              showToastModal(SUCCESS.GAME.DELETE);
              navigate('/');
            },
            onError: () => {
              closeModal();
              showToastModal(ERROR.DELETEGAME.FAIL);
            },
          },
        );
      },
      onClose: closeModal,
    });
    openModal();
  };

  const handleReportClick = () => {
    setModalProps({
      text: '정말 신고하시겠습니까?',
      onConfirm: () => {
        closeModal();
      },
      onClose: closeModal,
    });
    openModal();
  };

  return (
    <div css={S.pageStyle}>
      <div css={S.textContainer}>
        <div css={S.titleTextWrapper}>
          <div css={S.subTitleStyling}>
            반드시 둘 중 하나는 골라야 한다면, 그대의 선택은?
          </div>
          <div css={S.titleStyling}>지금은 밸런스게임 타임</div>
        </div>
        <Divider length={1175} orientation="width" />
      </div>
      {currentStage === 10 ? (
        <BalanceGameEndingSection
          title={gameSet?.title ?? ''}
          gameSetId={gameSetId}
          isMyGame={isMyGame}
          isMyEndBookmark={gameSet?.isEndBookmarked ?? false}
        />
      ) : (
        <BalanceGameSection
          gameSetId={gameSetId}
          game={gameSet}
          isMyGame={isMyGame}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          handleNextGame={handleNextGame}
          handlePrevGame={handlePrevGame}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onReport={handleReportClick}
        />
      )}
      <div css={S.centerStyling}>
        <TextModal {...modalProps} isOpen={isOpen} />
      </div>
      <div css={S.toastModalStyling}>
        {isVisible && <ToastModal bgColor="black">{modalText}</ToastModal>}
      </div>
    </div>
  );
};

export default BalanceGamePage;
