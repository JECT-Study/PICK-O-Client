import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';
import {
  TalkPickBannerFirst,
  TalkPickBannerSecond,
  MobileTalkPickBannerFirst,
  MobileTalkPickBannerSecond,
} from '@/assets';
import {
  commonBannerStyling,
  commonButtonStyling,
  commonChipStyling,
} from '@/components/molecules/TopBanner/banner.style';

export const talkPickStyling = (index: number) =>
  css([
    commonBannerStyling,
    {
      backgroundImage:
        index === 0
          ? `url(${TalkPickBannerFirst})`
          : `url(${TalkPickBannerSecond})`,
      '@media (max-width: 430px)': {
        backgroundImage:
          index === 0
            ? `url(${MobileTalkPickBannerFirst})`
            : `url(${MobileTalkPickBannerSecond})`,
      },
    },
  ]);

export const bannerChipStyling = css([
  commonChipStyling,
  {
    ...typo.Main.SemiBold,
    width: '142px',
    height: '38px',
    backgroundColor: color.WT,
    color: color.BK,
    '@media (max-width: 430px)': {
      ...typo.Mobile.Text.SemiBold_7,
      width: '53px',
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
      backgroundColor: index === 0 ? color.MAIN : color.HOTPINK,
      color: index === 0 ? color.WT : color.BK,
      '@media (max-width: 430px)': {
        ...typo.Mobile.Text.SemiBold_7,
        width: '128px',
        height: '25px',
      },
    },
  ]);
