/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodayTalkPick } from '@/types/talk-pick';
import TodayBalanceGameBanner from '@/components/molecules/TopBanner/TodayBalanceGameBanner/TodayBalanceGameBanner';
import { GameContent } from '@/types/game';
import TodayTalkPickBanner from './TodayTalkPickBanner/TodayTalkPickBanner';
import * as S from './TopBanner.style';

export interface TopBannerProps {
  todayTalkPickList: TodayTalkPick[];
  todayBalanceGameList: GameContent[];
}

const TopBanner = ({
  todayTalkPickList,
  todayBalanceGameList,
}: TopBannerProps) => {
  const [currentId, setCurrentId] = useState<number>(0);
  const slides = [
    {
      id: 0,
      content: (
        <TodayTalkPickBanner talkPick={todayTalkPickList[0]} index={0} />
      ),
    },
    {
      id: 1,
      content: (
        <TodayTalkPickBanner talkPick={todayTalkPickList[1]} index={1} />
      ),
    },
    {
      id: 2,
      content: (
        <TodayBalanceGameBanner game={todayBalanceGameList[0]} index={0} />
      ),
    },
    {
      id: 3,
      content: (
        <TodayBalanceGameBanner game={todayBalanceGameList[1]} index={1} />
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentId((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  });

  const handleSlide = (id: number) => {
    setCurrentId(id);
  };

  return (
    <div css={S.bannerStyling}>
      <div css={S.getBannerMovement(currentId)}>
        {slides.map((slide) => (
          <div key={slide.id} css={S.bannerWrapperStyling}>
            {slide.content}
          </div>
        ))}
      </div>
      <div css={S.dotWrapperStyling}>
        {slides.map((slide) => (
          <button
            type="button"
            key={slide.id}
            css={[S.dotStyling, slide.id === currentId && S.activeDotStyling]}
            onClick={() => handleSlide(slide.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopBanner;
