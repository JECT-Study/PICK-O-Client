/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { Comment } from '@/types/comment';
import { AngleReplyDown, AngleReplyUp } from '@/assets';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { formatDateFromISOWithTime } from '@/utils/formatData';
import { useCommentActions } from '@/hooks/comment/useCommentActions';
import { useCreateReplyMutation } from '@/hooks/api/comment/useCreateReplyMutation';
import { useRepliesQuery } from '@/hooks/api/comment/useRepliesQuery';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CategoryBarChip from '@/components/atoms/CategoryBarChip/CategoryBarChip';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import LikeButton from '@/components/atoms/LikeButton/LikeButton';
import TextArea from '@/components/molecules/TextArea/TextArea';
import CommentProfile from '@/components/atoms/CommentProfile/CommentProfile';
import TextModal from '@/components/molecules/TextModal/TextModal';
import ReportModal from '@/components/molecules/ReportModal/ReportModal';
import ReplyItem from '@/components/molecules/ReplyItem/ReplyItem';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './CommentItem.style';

export interface CommentItemProps {
  comment: Comment;
  selectedPage: number;
  talkPickWriter: string;
}

const CommentItem = ({
  comment,
  selectedPage,
  talkPickWriter,
}: CommentItemProps) => {
  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const isMyComment: boolean = comment?.nickname === member?.nickname;
  const isTalkPickWriter: boolean = comment?.nickname === talkPickWriter;

  const commentRef = useRef<HTMLDivElement>(null);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportTextModalOpen, setReportTextModalOpen] =
    useState<boolean>(false);
  const [deleteTextModalOpen, setDeleteTextModalOpen] =
    useState<boolean>(false);

  const [editCommentClicked, setEditCommentClicked] = useState<boolean>(false);
  const [editCommentText, setEditCommentText] = useState<string>(
    comment.content,
  );

  const [visibleReply, setVisibleReply] = useState<number>(10);

  const { handleEditSubmit, handleDelete, handleLikeToggle, handleReport } =
    useCommentActions(
      comment,
      editCommentText,
      selectedPage,
      setEditCommentClicked,
      showToastModal,
    );

  useEffect(() => {
    setEditCommentText(comment.content);
  }, [comment.content]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        commentRef.current &&
        !commentRef.current.contains(e.target as Node)
      ) {
        setEditCommentClicked(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [commentRef]);

  const [showReply, setShowReply] = useState(false);
  const [replyValue, setReplyValue] = useState('');

  const handleReplyToggle = () => {
    setShowReply(!showReply);
    setVisibleReply(10);
  };

  const { mutate: createReply } = useCreateReplyMutation(
    comment.talkPickId,
    comment.id,
    selectedPage,
  );

  const handleReplyButton = () => {
    createReply({ content: replyValue });
    setReplyValue('');
  };

  const { replies } = useRepliesQuery(comment.talkPickId, comment.id);

  const handleDeleteCommentButton = () => {
    setDeleteTextModalOpen(false);
    handleDelete();
  };

  const myComment: MenuItem[] = [
    {
      label: '수정',
      onClick: () => {
        setEditCommentClicked(true);
      },
    },
    {
      label: '삭제',
      onClick: () => {
        setDeleteTextModalOpen(true);
      },
    },
  ];

  const otherComment: MenuItem[] = [
    {
      label: '신고',
      onClick: () => {
        setReportTextModalOpen(true);
      },
    },
  ];

  const handleReportCommentButton = (reason: string) => {
    handleReport(reason);
    setReportModalOpen(false);
  };

  const handleMoreButton = () => {
    setVisibleReply((reply) => reply + 10);
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
          text="작성한 댓글을 삭제하시겠습니까?"
          isOpen={deleteTextModalOpen}
          onConfirm={() => {
            handleDeleteCommentButton();
          }}
          onClose={() => setDeleteTextModalOpen(false)}
        />
        <TextModal
          text="해당 댓글을 신고하시겠습니까?"
          isOpen={reportTextModalOpen}
          onConfirm={() => {
            setReportTextModalOpen(false);
            setReportModalOpen(true);
          }}
          onClose={() => setReportTextModalOpen(false)}
        />
        <ReportModal
          isOpen={reportModalOpen}
          onConfirm={(reason) => handleReportCommentButton(reason)}
          onClose={() => setReportModalOpen(false)}
        />
      </div>
      <div
        ref={commentRef}
        css={[S.commentContainer, isMyComment && S.myCommentColor]}
      >
        <div css={S.profileWrapper}>
          <CommentProfile
            option={comment?.voteOption}
            imgUrl={comment?.profileImage}
          />
        </div>
        <div css={S.commentInfoWrapper}>
          <div css={S.commentTopWrapper}>
            <div css={S.writerInfoWrapper}>
              {isTalkPickWriter && (
                <CategoryBarChip size="small">작성자</CategoryBarChip>
              )}
              <span css={S.nickname}>{comment?.nickname}</span>
              <span css={S.createdTime}>
                {formatDateFromISOWithTime(comment?.createdAt ?? '')}
              </span>
              {comment.edited && <span css={S.editedText}>수정됨</span>}
            </div>
            {!editCommentClicked && (
              <MenuTap menuData={isMyComment ? myComment : otherComment} />
            )}
          </div>
          {editCommentClicked ? (
            <TextArea
              size="medium"
              value={editCommentText}
              label="댓글 수정"
              isEdited={comment.content !== editCommentText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditCommentText(e.target.value)
              }
              onSubmit={handleEditSubmit}
            />
          ) : (
            <>
              <div css={S.commentTextWrapper}>{comment?.content}</div>
              <div css={S.commentBottomWrapper}>
                <button
                  type="button"
                  css={S.replyButton}
                  onClick={handleReplyToggle}
                >
                  {showReply ? <AngleReplyUp /> : <AngleReplyDown />}
                  답글 <span>{comment.replyCount}</span>개
                </button>
                <LikeButton
                  likeCount={comment?.likesCount}
                  likeState={comment?.myLike}
                  onClick={handleLikeToggle}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {showReply && (
        <div css={S.repliesWrapper}>
          <div css={S.replyContainer}>
            <span css={S.nicknameInput}>{member?.nickname}</span>
            <TextArea
              size="medium"
              value={replyValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReplyValue(e.target.value)
              }
              onSubmit={handleReplyButton}
              placeholder="댓글을 입력하세요"
              label="답글달기"
            />
          </div>
          {replies
            ?.slice(0, visibleReply)
            .map((replyData) => (
              <ReplyItem
                key={replyData.id}
                reply={replyData}
                selectedPage={selectedPage}
                talkPickWriter={talkPickWriter}
                parentId={comment.id}
              />
            ))}
          {(replies ?? []).length > visibleReply && (
            <button
              type="button"
              css={S.moreButtonStyling}
              onClick={handleMoreButton}
            >
              <MoreButton icon="arrow" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
