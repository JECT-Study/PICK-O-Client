/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MobileCommentsSection from '@/components/mobile/organisms/MobileCommentsSection/MobileCommentsSection';
// import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useTalkPickDetailQuery } from '@/hooks/api/talk-pick/useTalkPickDetailQuery';
// import { ToggleGroupItem } from '@/types/toggle';
import { useCommentsQuery } from '@/hooks/api/comment/useCommentsQuery';
import CommentInput from '@/components/mobile/atoms/CommentInput/CommentInput';
import { useCreateCommentMutation } from '@/hooks/api/comment/useCreateCommentMutation';
import * as S from './TalkPickMobilePage.style';

interface State {
  talkPickId: number;
  isTodayTalkPick: boolean;
}

const TalkPickMobilePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  // const { member } = useMemberQuery();

  const { talkPickId } = useParams();
  const location = useLocation();
  const state = location.state as State;

  const id = state?.talkPickId ?? Number(talkPickId);
  // const isTodayTalkPick = state?.isTodayTalkPick;

  const { talkPick } = useTalkPickDetailQuery(id);

  const { mutate: createComment } = useCreateCommentMutation(id, currentPage);

  const handleCommentPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const handleCommentSubmit = () => {
    setComment('');
    createComment({ content: comment });
  };

  const { comments } = useCommentsQuery(
    id,
    {
      page: currentPage - 1,
      size: 7,
    },
    'comments',
  );

  return (
    <div css={S.contentWrapStyle}>
      <div css={S.commentsWrapStyle}>
        <MobileCommentsSection
          talkPickId={id}
          talkPickWriter={talkPick?.writer ?? ''}
          commentList={comments}
          selectedPage={currentPage}
          voted={talkPick?.votedOption !== null}
        />
      </div>
      <CommentInput
        comment={comment}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
};
export default TalkPickMobilePage;
