import React, { useState } from 'react';
import {
  GameEnding,
  MobileBookmarkDF,
  MobileBookmarkPR,
  MobileShare,
} from '@/assets';
import { PATH } from '@/constants/path';
import { ERROR } from '@/constants/message';
import { useNavigate } from 'react-router-dom';
import { useCreateDoneGameBookmarkMutation } from '@/hooks/api/bookmark/useCreateDoneGameBookmark';
import { useDeleteDoneGameBookmarkMutation } from '@/hooks/api/bookmark/useDeleteDoneGameBookmark';
import useToastModal from '@/hooks/modal/useToastModal';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import InteractionButton from '../../atoms/InteractionButton/InteractionButton';
import Button from '../../atoms/Button/Button';
import ShareModal from '../../molecules/ShareModal/ShareModal';
import * as S from './BalanceGameEndingSection.style';

export interface BalanceGameEndingSectionProps {
  title: string;
  gameSetId: number;
  isMyGame: boolean;
  isMyEndBookmark: boolean;
}

const BalanceGameEndingSection = ({
  title,
  gameSetId,
  isMyGame,
  isMyEndBookmark,
}: BalanceGameEndingSectionProps) => {
  const navigate = useNavigate();
  const isGuest = !localStorage.getItem('accessToken');

  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { mutate: createEndBookmark } =
    useCreateDoneGameBookmarkMutation(gameSetId);

  const { mutate: deleteEndBookmark } =
    useDeleteDoneGameBookmarkMutation(gameSetId);

  const handleEndBookmarkClick = () => {
    if (isGuest) {
      navigate(`/${PATH.LOGIN}`);
      return;
    }

    if (isMyGame) {
      showToastModal(ERROR.BOOKMARK.MY_GAME);
      return;
    }

    if (isMyEndBookmark) {
      deleteEndBookmark();
    } else {
      createEndBookmark();
    }
  };

  return (
    <div css={S.balanceGameEndingStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <ShareModal
          isOpen={shareModalOpen}
          onConfirm={() => {}}
          onClose={() => setShareModalOpen(false)}
        />
      </div>
      <div css={S.titleStyling}>{title}</div>
      <div css={S.checkIconWrapper}>
        <img src={GameEnding} alt="BalanceGame Ending" />
      </div>
      <div css={S.buttonWrapper}>
        <InteractionButton
          buttonLabel="다른 사람들은 어떤 선택을 할까?"
          icon={<MobileShare />}
          iconLabel="공유하기"
          onClick={() => setShareModalOpen(true)}
        />
        <InteractionButton
          buttonLabel="이 게임 제법 폼이 좋아?"
          icon={isMyEndBookmark ? <MobileBookmarkPR /> : <MobileBookmarkDF />}
          iconLabel="저장하기"
          onClick={handleEndBookmarkClick}
        />
      </div>
      <div css={S.buttonStyling}>
        <Button variant="primary" size="large">
          더 많은 밸런스게임 하기
        </Button>
      </div>
    </div>
  );
};

export default BalanceGameEndingSection;
