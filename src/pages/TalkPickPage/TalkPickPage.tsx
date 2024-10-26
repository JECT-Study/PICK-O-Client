import React, { useEffect, useState } from 'react';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useLocation } from 'react-router-dom';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useCommentsQuery } from '@/hooks/api/comment/useCommentsQuery';
import TalkPickSection from '@/components/organisms/TalkPickSection/TalkPickSection';
import CommentsSection from '@/components/organisms/CommentsSection/CommentsSection';
import { useTalkPickSummaryMutation } from '@/hooks/api/talk-pick/useTalkPickSummaryMutation';
import { useTalkPickDetailQuery } from '@/hooks/api/talk-pick/useTalkPickDetailQuery';
import * as S from './TalkPickPage.style';

interface State {
  talkPickId: number;
  isTodayTalkPick: boolean;
}

const TalkPickPage = () => {
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const location = useLocation();
  const state = location.state as State;
  const talkPickId = state?.talkPickId;
  const isTodayTalkPick = state?.isTodayTalkPick;

  const { mutate: getTalkPickSummary } = useTalkPickSummaryMutation(talkPickId);

  useEffect(() => {
    getTalkPickSummary();
  }, [getTalkPickSummary]);

  const { talkPick } = useTalkPickDetailQuery(talkPickId);

  const { comments } = useCommentsQuery(
    talkPickId,
    {
      page: selectedPage - 1,
      size: 7,
    },
    'comments',
  );

  return (
    <div css={S.contentWrapStyle}>
      <TalkPickSection
        isTodayTalkPick={isTodayTalkPick}
        talkPick={talkPick}
        myTalkPick={member?.nickname === talkPick?.writer}
      />
      <div css={S.commentsWrapStyle}>
        <CommentsSection
          talkPickId={talkPickId}
          myOption={talkPick?.votedOption ?? null}
          commentList={comments}
          selectedPage={selectedPage}
          handlePageChange={setSelectedPage}
          voted={talkPick?.votedOption !== null}
        />
      </div>
    </div>
  );
};

export default TalkPickPage;
