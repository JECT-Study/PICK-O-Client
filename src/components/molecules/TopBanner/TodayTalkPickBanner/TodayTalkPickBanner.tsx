import React from 'react';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import { TodayTalkPick } from '@/types/talk-pick';
import { Check, CheckSmall } from '@/assets';
import useIsMobile from '@/hooks/common/useIsMobile';
import * as S from './TodayTalkPickBanner.style';

interface TodayTalkPickBannerProps {
  index?: number;
  talkPick?: TodayTalkPick;
}

const TodayTalkPickBanner = ({ index, talkPick }: TodayTalkPickBannerProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const onClickBanner = () => {
    navigate(`/${PATH.TODAY_TALKPICK}`, {
      state: { talkPickId: talkPick?.id, isTodayTalkPick: true },
    });
  };

  return (
    <button
      type="button"
      key={talkPick?.id}
      css={S.talkPickStyling(index as number)}
      onClick={onClickBanner}
    >
      <div css={S.bannerChipStyling}>
        {isMobile ? <CheckSmall /> : <Check />}
        오늘의 톡픽
      </div>
      <div css={S.talkPickTextStyling(index as number)}>
        {talkPick?.title} <br />
        {talkPick?.optionA} VS {talkPick?.optionB}
      </div>
      <div css={S.bannerBtnStyling(index as number)}>투표결과 보러 가기</div>
    </button>
  );
};

export default TodayTalkPickBanner;
