/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MobileCommentsSection from '@/components/mobile/organisms/MobileCommentsSection/MobileCommentsSection';
import { useTalkPickDetailQuery } from '@/hooks/api/talk-pick/useTalkPickDetailQuery';
import { useCommentsQuery } from '@/hooks/api/comment/useCommentsQuery';
import CommentInput from '@/components/mobile/atoms/CommentInput/CommentInput';
import { useCreateCommentMutation } from '@/hooks/api/comment/useCreateCommentMutation';
import { useCommentActions } from '@/hooks/comment/useCommentActions';
import useToastModal from '@/hooks/modal/useToastModal';
import { Comment } from '@/types/comment';
import { TalkPickDetail } from '@/types/talk-pick';
import * as S from './TalkPickMobilePage.style';

interface State {
  talkPickId: number;
  isTodayTalkPick: boolean;
}

const TalkPickMobilePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comment, setComment] = useState<string>('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>('');
  const { talkPickId } = useParams();
  const location = useLocation();
  const state = location.state as State;

  const id = state?.talkPickId ?? Number(talkPickId);
  const { talkPick } = useTalkPickDetailQuery(id);

  const { mutate: createComment } = useCreateCommentMutation(id, currentPage);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const { comments } = useCommentsQuery(
    id,
    { page: currentPage - 1, size: 7 },
    'comments',
  );

  const selectedComment =
    comments?.content.find((c) => c.id === editCommentId) || null;

  const commentActions = useCommentActions(
    selectedComment,
    editCommentText,
    currentPage,
    () => setEditCommentId(null),
    showToastModal,
  );

  const handleCommentPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCommentChange = (value: string) => {
    if (editCommentId) {
      setEditCommentText(value);
    } else {
      setComment(value);
    }
  };

  const handleEditComment = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditCommentText(content);
  };

  const handleEditSubmit = commentActions?.handleEditSubmit ?? (() => {});

  const handleCommentSubmit = () => {
    if (editCommentId && selectedComment) {
      handleEditSubmit();
      setEditCommentId(null);
      setEditCommentText('');
    } else {
      createComment({ content: comment });
      setComment('');
    }
  };

  return (
    <div css={S.contentWrapStyle}>
      <div css={S.commentsWrapStyle}>
        <MobileCommentsSection
          talkPickId={id}
          talkPickWriter={talkPick?.writer ?? ''}
          commentList={comments}
          selectedPage={currentPage}
          voted={talkPick?.votedOption !== null}
          onEditComment={handleEditComment}
        />
      </div>
      <CommentInput
        comment={editCommentId ? editCommentText : comment}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
        isEditing={!!editCommentId}
      />
    </div>
  );
};

export default TalkPickMobilePage;
