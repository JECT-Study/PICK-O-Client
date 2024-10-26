import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TodayTalkPick } from '@/types/talk-pick';
import { Check } from '@/assets';
import {
  bannerBtnStyling,
  bannerChipStyling,
  talkPickStyling,
  talkPickTextStyling,
} from './TodayTalkPickBanner.style';

interface TodayTalkPickBannerProps {
  talkPick?: TodayTalkPick;
}

const TodayTalkPickBanner = ({ talkPick }: TodayTalkPickBannerProps) => {
  const navigate = useNavigate();

  const onClickBanner = () => {
    navigate('/todaytalkpick', {
      state: { talkPickId: talkPick?.id, isTodayTalkPick: true },
    });
  };

  return (
    <button
      type="button"
      key={talkPick?.id}
      css={talkPickStyling}
      onClick={onClickBanner}
    >
      <div css={bannerChipStyling}>
        <Check />
        오늘의 톡 픽
      </div>
      <div css={talkPickTextStyling}>
        {talkPick?.title} <br />
        {talkPick?.optionA} VS {talkPick?.optionB}
      </div>
      <div css={bannerBtnStyling}>투표결과 보러 가기</div>
    </button>
  );
};

export default TodayTalkPickBanner;
