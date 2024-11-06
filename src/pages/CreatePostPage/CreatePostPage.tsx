/* eslint-disable consistent-return */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { TalkPickDetail } from '@/types/talk-pick';
import PostInputForm from '@/components/organisms/PostInputForm/PostInputForm';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './CreatePostPage.style';

interface State {
  talkPick: TalkPickDetail;
}

const CreatePostPage = () => {
  const location = useLocation();
  const state = location.state as State;
  const talkPickData = state?.talkPick;

  return (
    <div css={S.pageStyle}>
      <div css={S.bestTalkPickStyling}>
        <div css={S.bestTalkPickTextWrapper}>
          <div css={S.bestTalkPickSubTitle}>
            모두가 톡커도 되고 픽커도 되는 (두둥탁)
          </div>
          <div css={S.bestTalkPickTitle}>톡&픽 플레이스</div>
        </div>
        <Divider length={1175} orientation="width" />
      </div>

      <PostInputForm existingTalkPick={talkPickData} />
    </div>
  );
};

export default CreatePostPage;
