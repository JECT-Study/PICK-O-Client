/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Comment } from '@/types/comment';
import { MobileComment } from '@/assets';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { formatDateFromISOWithTime } from '@/utils/formatData';
import { useCommentActions } from '@/hooks/comment/useCommentActions';
import { useCreateReplyMutation } from '@/hooks/api/comment/useCreateReplyMutation';
import { useRepliesQuery } from '@/hooks/api/comment/useRepliesQuery';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CategoryBarChip from '@/components/atoms/CategoryBarChip/CategoryBarChip';
import LikeButton from '@/components/atoms/LikeButton/LikeButton';
import TextArea from '@/components/molecules/TextArea/TextArea';
import CommentProfile from '@/components/atoms/CommentProfile/CommentProfile';
import useToastModal from '@/hooks/modal/useToastModal';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import * as S from './MobileCommentItem.style';

export interface CommentItemProps {
  comment: Comment;
  selectedPage: number;
  talkPickWriter: string;
}

const MobileCommentItem = ({
  comment,
  selectedPage,
  talkPickWriter,
}: CommentItemProps) => {
  const { member } = useMemberQuery();

  const isMyComment = useMemo(() => {
    return comment?.nickname === member?.nickname;
  }, [comment?.nickname, member?.nickname]);

  const isTalkPickWriter = useMemo(() => {
    return comment?.nickname === talkPickWriter;
  }, [comment?.nickname, talkPickWriter]);

  const commentRef = useRef<HTMLDivElement>(null);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [editCommentClicked, setEditCommentClicked] = useState<boolean>(false);
  const [editCommentText, setEditCommentText] = useState<string>(
    comment.content,
  );

  const [activeModal, setActiveModal] = useState<
    'reportComment' | 'reportText' | 'deleteText' | 'none'
  >('none');

  const onCloseModal = () => {
    setActiveModal('none');
  };

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

  useOutsideClick(commentRef, () => setEditCommentClicked(false));

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

  //   const handleDeleteCommentButton = () => {
  //     onCloseModal();
  //     handleDelete();
  //   };

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
        setActiveModal('deleteText');
      },
    },
  ];

  const reportComment: MenuItem[] = [
    {
      label: '신고',
      onClick: () => {
        setActiveModal('reportText');
      },
    },
  ];

  //   const handleReportCommentButton = (reason: string) => {
  //     handleReport(reason);
  //     onCloseModal();
  //   };

  //   const handleMoreButton = () => {
  //     setVisibleReply((reply) => reply + 10);
  //   };

  return (
    <div css={S.MainContainer}>
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
              <span css={S.nickname}>{comment?.nickname}</span>
              <span css={S.createdTime}>
                {formatDateFromISOWithTime(comment?.createdAt ?? '')}
              </span>
              {isTalkPickWriter && (
                <CategoryBarChip size="extraSmall">작성자</CategoryBarChip>
              )}
              {/* {comment.edited && <span css={S.editedText}>수정됨</span>} */}
            </div>
            {!editCommentClicked && (
              <MenuTap menuData={isMyComment ? myComment : reportComment} />
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
                  <MobileComment />
                  <span>
                    {comment.replyCount === 0 ? '답글쓰기' : comment.replyCount}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MobileCommentItem;
