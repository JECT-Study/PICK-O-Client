import React, { useMemo, useRef, useState } from 'react';
import { Comment } from '@/types/comment';
import { MobileComment } from '@/assets';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { formatDateFromISOWithTime } from '@/utils/formatData';
import { useCommentActions } from '@/hooks/comment/useCommentActions';
// import { useCreateReplyMutation } from '@/hooks/api/comment/useCreateReplyMutation';
// import { useRepliesQuery } from '@/hooks/api/comment/useRepliesQuery';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CategoryBarChip from '@/components/atoms/CategoryBarChip/CategoryBarChip';
import LikeButton from '@/components/atoms/LikeButton/LikeButton';
import CommentProfile from '@/components/atoms/CommentProfile/CommentProfile';
import useToastModal from '@/hooks/modal/useToastModal';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import { COMMENT } from '@/constants/message';
import { MobileReportModal } from '@/components/mobile/molecules/MobileReportModal/MobileReportModal';
import * as S from './MobileCommentItem.style';

export interface CommentItemProps {
  idx: number;
  totalElements: number;
  comment: Comment;
  selectedPage: number;
  talkPickWriter: string;
  onEditComment: (commentId: number, content: string) => void;
}

const MobileCommentItem = ({
  idx,
  totalElements,
  comment,
  selectedPage,
  talkPickWriter,
  onEditComment,
}: CommentItemProps) => {
  const { member } = useMemberQuery();
  const commentRef = useRef<HTMLDivElement>(null);
  const { showToastModal } = useToastModal();

  const { handleDelete, handleLikeToggle, handleReport } = useCommentActions(
    comment,
    comment.content,
    selectedPage,
    () => {},
    showToastModal,
  );

  const isMyComment = useMemo(() => {
    return comment?.nickname === member?.nickname;
  }, [comment?.nickname, member?.nickname]);

  const isTalkPickWriter = useMemo(() => {
    return comment?.nickname === talkPickWriter;
  }, [comment?.nickname, talkPickWriter]);

  const [showReply, setShowReply] = useState(false);

  const handleReplyToggle = () => {
    setShowReply(!showReply);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const expandComment = () => setIsExpanded((prev) => !prev);

  const isLongText = comment?.content.length > COMMENT.MAX_SHORTEN_LENGTH;
  const shortenContent = isExpanded
    ? comment?.content
    : `${comment?.content.slice(0, COMMENT.MAX_SHORTEN_LENGTH)}...`;

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  const handleReportCommentButton = (reason: string) => {
    handleReport(reason);
    closeReportModal();
  };

  const myComment: MenuItem[] = [
    {
      label: '수정',
      onClick: () => {
        onEditComment(comment.id, comment.content);
      },
    },
    {
      label: '삭제',
      onClick: () => handleDelete(),
    },
  ];

  const reportComment: MenuItem[] = [
    {
      label: '신고',
      onClick: () => openReportModal(),
    },
  ];

  return (
    <>
      <div css={[S.MainContainer, isMyComment && S.myCommentColor]}>
        <div ref={commentRef} css={S.commentContainer}>
          <div css={S.profileWrapper}>
            <CommentProfile
              option={comment?.voteOption}
              imgUrl={comment?.profileImage}
            />
          </div>
          <div css={S.commentInfoWrapper}>
            <div css={S.commentTopWrapper}>
              <div css={S.writerInfoWrapper}>
                <span css={S.nickname}>{comment?.nickname}</span>
                <span css={S.createdTime}>
                  {formatDateFromISOWithTime(comment?.createdAt ?? '')}
                </span>
                {isTalkPickWriter && (
                  <CategoryBarChip size="extraSmall">작성자</CategoryBarChip>
                )}
                {idx === 0 && totalElements === 1 && (
                  <CategoryBarChip size="extraSmall">첫댓글</CategoryBarChip>
                )}
              </div>
              <MenuTap menuData={isMyComment ? myComment : reportComment} />
            </div>
            <div css={S.commentTextWrapper}>
              {shortenContent}
              {isLongText && !isExpanded && (
                <div css={S.moreButtonWrapper}>
                  <MoreButton
                    size="small"
                    icon="arrow"
                    onClick={expandComment}
                  />
                </div>
              )}
            </div>
            <div css={S.commentBottomWrapper}>
              <LikeButton
                isMobile
                likeCount={comment?.likesCount}
                likeState={comment?.myLike}
                onClick={handleLikeToggle}
              />
              <button
                type="button"
                css={S.replyButton}
                onClick={handleReplyToggle}
              >
                {comment.replyCount === 0 ? (
                  '답글쓰기'
                ) : (
                  <>
                    <MobileComment />
                    <span>{comment.replyCount}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div css={S.centerStyling}>
        <MobileReportModal
          isOpen={isReportModalOpen}
          onConfirm={(reason) => handleReportCommentButton(reason)}
          onClose={closeReportModal}
        />
      </div>
    </>
  );
};

export default MobileCommentItem;
