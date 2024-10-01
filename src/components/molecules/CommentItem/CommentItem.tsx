/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { Comment, CommentsCategory } from '@/types/comment';
import { AngleReplyDown, AngleReplyUp } from '@/assets';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { formatDateFromISO } from '@/utils/formatData';
import { useCreateReplyMutation } from '@/hooks/api/comment/useCreateReplyMutation';
import { useRepliesQuery } from '@/hooks/api/comment/useRepliesQuery';
import { useDeleteCommentMutation } from '@/hooks/api/comment/useDeleteCommentMutation';
import { useCreateLikeCommentMutation } from '@/hooks/api/like/useCreateLikeCommentMutation';
import { useDeleteLikeCommentMutation } from '@/hooks/api/like/useDeleteLikeCommentMutation';
import { useReportCommentMutation } from '@/hooks/api/report/useReportCommentMutation';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CategoryBarChip from '@/components/atoms/CategoryBarChip/CategoryBarChip';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import LikeButton from '@/components/atoms/LikeButton/LikeButton';
import TextArea from '@/components/molecules/TextArea/TextArea';
import CommentProfile from '@/components/atoms/CommentProfile/CommentProfile';
import TextModal from '../TextModal/TextModal';
import ReportModal from '../ReportModal/ReportModal';
import * as S from './CommentItem.style';
import ReplyItem from '../ReplyItem/ReplyItem';

export interface CommentItemProps {
  comment: Comment;
  isMyTalkPick: boolean;
  myOption: 'A' | 'B' | null;
  selectedValue: string;
}

const CommentItem = ({
  comment,
  isMyTalkPick,
  myOption,
  selectedValue,
}: CommentItemProps) => {
  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);
  const isMyComment: boolean = comment?.nickname === member?.nickname;

  const commentRef = useRef<HTMLDivElement>(null);
  const commentCategory: CommentsCategory =
    selectedValue === 'trend' ? 'bestComments' : 'comments';

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportTextModalOpen, setReportTextModalOpen] =
    useState<boolean>(false);
  const [deleteTextModalOpen, setDeleteTextModalOpen] =
    useState<boolean>(false);

  const [editCommentClicked, setEditCommentClicked] = useState<boolean>(false);
  const [editCommentText, setEditCommentText] = useState<string>(
    comment.content,
  );

  const handleEditCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditCommentText(e.target.value);
  };

  const handleEditCommentSubmit = () => {
    if (comment.content === editCommentText) return;
    console.log('수정된 댓글: ', editCommentText);
  };

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
  };

  const { mutate: createReply } = useCreateReplyMutation(
    comment.talkPickId,
    comment.id,
  );

  const handleReplyButton = () => {
    createReply({
      content: replyValue,
      option: myOption,
      parentId: comment.id,
    });
    setReplyValue('');
  };

  const { replies } = useRepliesQuery(comment.talkPickId, comment.id, {
    page: 0,
  });
  console.log(replies);

  const { mutate: deleteComment } = useDeleteCommentMutation(
    comment.talkPickId,
    comment.id,
  );

  const {
    mutate: reportComment,
    reportCommentSuccess,
    setReportCommentSuccess,
  } = useReportCommentMutation(comment.talkPickId, comment.id);

  const handleDeleteCommentButton = () => {
    setDeleteTextModalOpen(false);
    deleteComment();
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

  const { mutate: createLikeComment } = useCreateLikeCommentMutation(
    comment.talkPickId,
    comment.id,
    commentCategory,
  );

  const { mutate: deleteLikeComment } = useDeleteLikeCommentMutation(
    comment.talkPickId,
    comment.id,
    commentCategory,
  );

  const handleLikeCommentButton = () => {
    if (comment.myLike) {
      deleteLikeComment();
    } else {
      createLikeComment();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportCommentButton = (reason: string) => {
    reportComment(reason);
    setReportModalOpen(false);
    scrollToTop();

    setTimeout(() => {
      setReportCommentSuccess(false);
    }, 2000);
  };

  return (
    <div css={S.MainContainer}>
      {reportCommentSuccess && (
        <div css={S.toastModalStyling}>
          <ToastModal>신고가 완료되었습니다.</ToastModal>
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
            option={comment?.option}
            imgUrl={comment?.profileImage}
          />
        </div>
        <div css={S.commentInfoWrapper}>
          <div css={S.commentTopWrapper}>
            <div css={S.writerInfoWrapper}>
              {isMyTalkPick && (
                <CategoryBarChip size="small">작성자</CategoryBarChip>
              )}
              <span css={S.nickname}>{comment?.nickname}</span>
              <span css={S.createdTime}>
                {formatDateFromISO(comment?.createdAt ?? '')}
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
              onChange={handleEditCommentChange}
              onSubmit={handleEditCommentSubmit}
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
                  onClick={handleLikeCommentButton}
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
          {replies?.content.map((replyData) => <ReplyItem reply={replyData} />)}
        </div>
      )}
    </div>
  );
};

export default CommentItem;