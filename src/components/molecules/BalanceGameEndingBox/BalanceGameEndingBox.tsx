/* eslint-disable no-console */
import React, { useState } from 'react';
import { BookmarkDF, BookmarkPR, GameEnding, Share } from '@/assets';
import { ERROR, SUCCESS } from '@/constants/message';
import Divider from '@/components/atoms/Divider/Divider';
import InteractionButton from '@/components/atoms/InteractionButton/InteractionButton';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import ShareModal from '@/components/molecules/ShareModal/ShareModal';
import { useCreateDoneGameBookmarkMutation } from '@/hooks/api/bookmark/useCreateDoneGameBookmark';
import { useDeleteDoneGameBookmarkMutation } from '@/hooks/api/bookmark/useDeleteDoneGameBookmark';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './BalanceGameEndingBox.style';

export interface BalanceGameEndingBoxProps {
  title: string;
  gameSetId: number;
  isMyGame: boolean;
  isMyEndBookmark: boolean;
}

const BalanceGameEndingBox = ({
  title,
  gameSetId,
  isMyGame,
  isMyEndBookmark,
}: BalanceGameEndingBoxProps) => {
  const currentURL: string = window.location.href;

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

  const { mutate: createEndBookmark } =
    useCreateDoneGameBookmarkMutation(gameSetId);

  const { mutate: deleteEndBookmark } =
    useDeleteDoneGameBookmarkMutation(gameSetId);

  const handleEndBookmarkClick = () => {
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
    <div css={S.balanceGameContainer}>
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
      <div css={S.titleStyling}>{title}</div>
      <div css={S.imgWrapper}>
        <img src={GameEnding} alt="BalanceGame Ending" />
      </div>
      <Divider orientation="width" length={1095} />
      <div css={S.buttonWrapper}>
        <InteractionButton
          buttonLabel="다른 사람들은 어떤 선택을 할까?"
          icon={<Share />}
          iconLabel="공유하기"
          onClick={() => setShareModalOpen(true)}
        />
        <InteractionButton
          buttonLabel="이 게임 제법 폼이 좋아?"
          icon={isMyEndBookmark ? <BookmarkPR /> : <BookmarkDF />}
          iconLabel="저장하기"
          onClick={handleEndBookmarkClick}
        />
      </div>
    </div>
  );
};

export default BalanceGameEndingBox;
