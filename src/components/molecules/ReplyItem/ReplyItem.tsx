import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Comment } from '@/types/comment';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { formatDateFromISOWithTime } from '@/utils/formatData';
import { useCommentActions } from '@/hooks/comment/useCommentActions';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import LikeButton from '@/components/atoms/LikeButton/LikeButton';
import CategoryBarChip from '@/components/atoms/CategoryBarChip/CategoryBarChip';
import TextArea from '@/components/molecules/TextArea/TextArea';
import TextModal from '@/components/molecules/TextModal/TextModal';
import ReportModal from '@/components/molecules/ReportModal/ReportModal';
import useToastModal from '@/hooks/modal/useToastModal';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import * as S from './ReplyItem.style';

export interface ReplyItemProps {
  reply: Comment;
  selectedPage: number;
  talkPickWriter: string;
  parentId: number;
}

const ReplyItem = ({
  reply,
  selectedPage,
  talkPickWriter,
  parentId,
}: ReplyItemProps) => {
  const { member } = useMemberQuery();

  const isMyReply = useMemo(() => {
    return reply?.nickname === member?.nickname;
  }, [reply?.nickname, member?.nickname]);

  const isTalkPickWriter = useMemo(() => {
    return reply?.nickname === talkPickWriter;
  }, [reply?.nickname, talkPickWriter]);

  const replyRef = useRef<HTMLDivElement>(null);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [editReplyClicked, setEditReplyClicked] = useState<boolean>(false);
  const [editReplyText, setEditReplyText] = useState<string>(reply.content);

  const [activeModal, setActiveModal] = useState<
    'reportReply' | 'reportText' | 'deleteText' | 'none'
  >('none');

  const onCloseModal = () => {
    setActiveModal('none');
  };

  const { handleEditSubmit, handleDelete, handleLikeToggle, handleReport } =
    useCommentActions(
      reply,
      editReplyText,
      selectedPage,
      setEditReplyClicked,
      showToastModal,
      parentId,
    );

  useEffect(() => {
    setEditReplyText(reply.content);
  }, [reply.content]);

  useOutsideClick(replyRef, () => setEditReplyClicked(false));

  const handleDeleteReplyButton = () => {
    onCloseModal();
    handleDelete();
  };

  const myReply: MenuItem[] = [
    {
      label: '수정',
      onClick: () => {
        setEditReplyClicked(true);
      },
    },
    {
      label: '삭제',
      onClick: () => {
        setActiveModal('deleteText');
      },
    },
  ];

  const reportReply: MenuItem[] = [
    {
      label: '신고',
      onClick: () => {
        setActiveModal('reportText');
      },
    },
  ];

  const handleReportReplyButton = (reason: string) => {
    handleReport(reason);
    onCloseModal();
  };

  return (
    <div css={S.MainContainer}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <TextModal
          text="작성한 답글을 삭제하시겠습니까?"
          isOpen={activeModal === 'deleteText'}
          onConfirm={() => {
            handleDeleteReplyButton();
          }}
          onClose={onCloseModal}
        />
        <TextModal
          text="해당 답글을 신고하시겠습니까?"
          isOpen={activeModal === 'reportText'}
          onConfirm={() => {
            setActiveModal('reportReply');
          }}
          onClose={onCloseModal}
        />
        <ReportModal
          isOpen={activeModal === 'reportReply'}
          onConfirm={(reason) => handleReportReplyButton(reason)}
          onClose={onCloseModal}
        />
      </div>
      <div ref={replyRef} css={[S.ReplyContainer, isMyReply && S.myReplyColor]}>
        <div css={S.ReplyWrapper}>
          <div css={S.ReplyTopWrapper}>
            <div css={S.nicknameWrapper}>
              {isTalkPickWriter && (
                <CategoryBarChip size="small">작성자</CategoryBarChip>
              )}
              <span css={S.nickname}>{reply?.nickname}</span>
              <span css={S.createdTime}>
                {formatDateFromISOWithTime(reply?.createdAt ?? '')}
              </span>
              {reply.edited && <span css={S.editedText}>수정됨</span>}
            </div>
            {!editReplyClicked && (
              <MenuTap menuData={isMyReply ? myReply : reportReply} />
            )}
          </div>
          {editReplyClicked ? (
            <TextArea
              size="medium"
              value={editReplyText}
              label="답글 수정"
              isEdited={reply.content !== editReplyText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setEditReplyText(e.target.value);
              }}
              onSubmit={handleEditSubmit}
            />
          ) : (
            <>
              <div css={S.ReplyTextWrapper}>{reply?.content}</div>
              <div css={S.ReplyBottomWrapper}>
                <LikeButton
                  likeCount={reply?.likesCount}
                  likeState={reply?.myLike}
                  onClick={handleLikeToggle}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
