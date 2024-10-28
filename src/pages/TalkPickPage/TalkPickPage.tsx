import React, { useState } from 'react';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useLocation } from 'react-router-dom';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useCommentsQuery } from '@/hooks/api/comment/useCommentsQuery';
import { useBestCommentsQuery } from '@/hooks/api/comment/useBestCommentsQuery';
import { ToggleGroupItem } from '@/components/atoms/ToggleGroup/ToggleGroup';
import TalkPickSection from '@/components/organisms/TalkPickSection/TalkPickSection';
import CommentsSection from '@/components/organisms/CommentsSection/CommentsSection';
import { useTalkPickDetailQuery } from '@/hooks/api/talk-pick/useTalkPickDetailQuery';
import * as S from './TalkPickPage.style';

interface State {
  talkPickId: number;
  isTodayTalkPick: boolean;
}

const TodayTalkPickPage = () => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<string>('trend');

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const location = useLocation();
  const state = location.state as State;
  const talkPickId = state?.talkPickId;
  const isTodayTalkPick = state?.isTodayTalkPick;

  const { talkPick } = useTalkPickDetailQuery(talkPickId);

  const toggleItem: ToggleGroupItem[] = [
    {
      label: '인기순',
      value: 'trend',
    },
    {
      label: '최신순',
      value: 'recent',
    },
  ];

  const { comments } = useCommentsQuery(
    talkPickId,
    {
      page: selectedPage - 1,
      size: 7,
    },
    'comments',
  );

  const { bestComments } = useBestCommentsQuery(
    talkPickId,
    {
      page: selectedPage - 1,
      size: 7,
    },
    'bestComments',
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
          talkPickWriter={talkPick?.writer ?? ''}
          commentList={selectedValue === 'trend' ? bestComments : comments}
          toggleItem={toggleItem}
          selectedValue={selectedValue}
          setToggleValue={setSelectedValue}
          selectedPage={selectedPage}
          handlePageChange={setSelectedPage}
          voted={talkPick?.votedOption !== null}
        />
      </div>
    </div>
  );
};

export default TodayTalkPickPage;
