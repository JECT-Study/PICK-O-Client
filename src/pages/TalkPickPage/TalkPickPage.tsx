import React, { useState } from 'react';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useLocation, useParams } from 'react-router-dom';
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

const TalkPickPage = () => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<{
    fileId: string;
    order: 'asc' | 'desc';
  }>({ fileId: 'views', order: 'desc' });

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);

  const { talkPickId } = useParams();
  const location = useLocation();
  const state = location.state as State;

  const id = state?.talkPickId ?? Number(talkPickId);
  const isTodayTalkPick = state?.isTodayTalkPick;

  const { talkPick } = useTalkPickDetailQuery(id);

  const toggleItem: ToggleGroupItem[] = [
    {
      label: '인기순',
      value: { fileId: 'views', order: 'desc' },
    },
    {
      label: '최신순',
      value: { fileId: 'createdAt', order: 'desc' },
    },
  ];

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

  const { bestComments } = useBestCommentsQuery(
    id,
    {
      page: currentPage - 1,
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
          talkPickId={id}
          talkPickWriter={talkPick?.writer ?? ''}
          commentList={
            selectedValue.fileId === 'views' ? bestComments : comments
          }
          toggleItem={toggleItem}
          selectedValue={selectedValue}
          setToggleValue={setSelectedValue}
          selectedPage={currentPage}
          handlePageChange={handleCommentPageChange}
          voted={talkPick?.votedOption !== null}
        />
      </div>
    </div>
  );
};

export default TalkPickPage;
