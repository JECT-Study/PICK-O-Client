/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MobileCommentsSection from '@/components/mobile/organisms/MobileCommentsSection/MobileCommentsSection';
// import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useTalkPickDetailQuery } from '@/hooks/api/talk-pick/useTalkPickDetailQuery';
// import { ToggleGroupItem } from '@/types/toggle';
import { useCommentsQuery } from '@/hooks/api/comment/useCommentsQuery';
import * as S from './TalkPickMobilePage.style';

interface State {
  talkPickId: number;
  isTodayTalkPick: boolean;
}

const TalkPickMobilePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const { member } = useMemberQuery();

  const { talkPickId } = useParams();
  const location = useLocation();
  const state = location.state as State;

  const id = state?.talkPickId ?? Number(talkPickId);
  // const isTodayTalkPick = state?.isTodayTalkPick;

  const { talkPick } = useTalkPickDetailQuery(id);

  const handleCommentPageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
    </div>
  );
};
export default TalkPickMobilePage;
