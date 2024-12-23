import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';
import {
  GameBannerFirst,
  GameBannerSecond,
  MobileGameBannerFirst,
  MobileGameBannerSecond,
} from '@/assets';
import {
  commonBannerStyling,
  commonButtonStyling,
  commonChipStyling,
} from '@/components/molecules/TopBanner/banner.style';

export const balanceGameStyling = (index: number) =>
  css([
    commonBannerStyling,
    {
      backgroundImage:
        index === 0 ? `url(${GameBannerFirst})` : `url(${GameBannerSecond})`,
      '@media (max-width: 430px)': {
        backgroundImage:
          index === 0
            ? `url(${MobileGameBannerFirst})`
            : `url(${MobileGameBannerSecond})`,
      },
    },
  ]);

export const bannerChipStyling = css([
  commonChipStyling,
  {
    ...typo.Main.SemiBold,
    width: '174px',
    height: '38px',
    backgroundColor: color.WT,
    color: color.BK,
    '@media (max-width: 430px)': {
      ...typo.Mobile.Text.SemiBold_7,
      width: '70px',
      height: '15px',
    },
  },
]);

export const bannerBtnStyling = (index: number) =>
  css([
    commonButtonStyling,
    {
      ...typo.Main.Medium,
      width: '320px',
      height: '64px',
      backgroundColor: index === 0 ? color.ORANGE : color.BK,
      color: index === 0 ? color.BK : color.WT,
      '@media (max-width: 430px)': {
        ...typo.Mobile.Text.SemiBold_7,
        width: '128px',
        height: '25px',
      },
    },
  ]);
