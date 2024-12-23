import React from 'react';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import { Check, CheckSmall } from '@/assets';
import useIsMobile from '@/hooks/common/useIsMobile';
import { GameContent } from '@/types/game';
import * as S from './TodayBalanceGameBanner.style';

interface TodayBalanceGameBannerProps {
  index: number;
  game: GameContent;
}

const TodayBalanceGameBanner = ({
  index,
  game,
}: TodayBalanceGameBannerProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const onClickBanner = () => {
    navigate(`/${PATH.TODAY_BALANCEGAME}`, {
      state: { setId: game?.id, isTodayBalanceGame: true },
    });
  };

  return (
    <button
      type="button"
      key={game?.id}
      css={S.balanceGameStyling(index)}
      onClick={onClickBanner}
    >
      <div css={S.bannerChipStyling}>
        {isMobile ? <CheckSmall /> : <Check />}
        오늘의 밸런스게임
      </div>
      <div css={S.balanceGameStyling(index)}>{game?.title}</div>
      <div css={S.bannerBtnStyling(index)}>지금 바로 골라보기</div>
    </button>
  );
};

export default TodayBalanceGameBanner;
