import React, { useEffect, useRef, useState } from 'react';
import { Comment } from '@/types/comment';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
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
import * as S from './ReplyItem.style';

export interface ReplyItemProps {
  reply: Comment;
  talkPickWriter: string;
}

const ReplyItem = ({ reply, talkPickWriter }: ReplyItemProps) => {
  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const isMyReply: boolean = reply?.nickname === member?.nickname;
  const isTalkPickWriter: boolean = reply?.nickname === talkPickWriter;

  const replyRef = useRef<HTMLDivElement>(null);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportTextModalOpen, setReportTextModalOpen] =
    useState<boolean>(false);
  const [deleteTextModalOpen, setDeleteTextModalOpen] =
    useState<boolean>(false);

  const [editReplyClicked, setEditReplyClicked] = useState<boolean>(false);
  const [editReplyText, setEditReplyText] = useState<string>(reply.content);

  const { handleEditSubmit, handleDelete, handleLikeToggle, handleReport } =
    useCommentActions(
      reply,
      editReplyText,
      setEditReplyClicked,
      showToastModal,
    );

  useEffect(() => {
    setEditReplyText(reply.content);
  }, [reply.content]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (replyRef.current && !replyRef.current.contains(e.target as Node)) {
        setEditReplyClicked(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [replyRef]);

  const handleDeleteReplyButton = () => {
    setDeleteTextModalOpen(false);
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
        setDeleteTextModalOpen(true);
      },
    },
  ];

  const otherReply: MenuItem[] = [
    {
      label: '신고',
      onClick: () => {
        setReportTextModalOpen(true);
      },
    },
  ];

  const handleReportReplyButton = (reason: string) => {
    handleReport(reason);
    setReportModalOpen(false);
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
          isOpen={deleteTextModalOpen}
          onConfirm={() => {
            handleDeleteReplyButton();
          }}
          onClose={() => setReportTextModalOpen(false)}
        />
        <TextModal
          text="해당 답글을 신고하시겠습니까?"
          isOpen={reportTextModalOpen}
          onConfirm={() => {
            setReportTextModalOpen(false);
            setReportModalOpen(true);
          }}
          onClose={() => setReportTextModalOpen(false)}
        />
        <ReportModal
          isOpen={reportModalOpen}
          onConfirm={(reason) => handleReportReplyButton(reason)}
          onClose={() => setReportModalOpen(false)}
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
              <MenuTap menuData={isMyReply ? myReply : otherReply} />
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
                  onClick={() => {
                    handleLikeToggle(reply.myLike);
                  }}
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
