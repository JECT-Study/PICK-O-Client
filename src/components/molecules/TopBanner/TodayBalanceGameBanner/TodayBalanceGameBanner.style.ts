import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';
import {
  GameBannerFirst,
  GameBannerSecound,
  MobileGameBannerFirst,
  MobileGameBannerSecond,
} from '@/assets';

export const balanceGameStyling = (index: number) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '500px',
    paddingTop: '69px',
    paddingBottom: '110px',
    backgroundImage:
      index === 0 ? `url(${GameBannerFirst})` : `url(${GameBannerSecound})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    '@media (max-width: 430px)': {
      height: '227px',
      paddingTop: '31px',
      paddingBottom: '48px',
      backgroundImage:
        index === 0
          ? `url(${MobileGameBannerFirst})`
          : `url(${MobileGameBannerSecond})`,
    },
  });

export const bannerChipStyling = css({
  ...typo.Main.SemiBold,
  display: 'flex',
  width: '174px',
  height: '38px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '24px',
  backgroundColor: color.WT,
  color: color.BK,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.SemiBold_7,
    width: '70px',
    height: '15px',
    gap: '2px',
  },
});

export const bannerBtnStyling = (index: number) =>
  css({
    ...typo.Main.Medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '320px',
    height: '64px',
    borderRadius: '10px',
    backgroundColor: index === 0 ? color.ORANGE : color.BK,
    color: index === 0 ? color.BK : color.WT,
    '@media (max-width: 430px)': {
      ...typo.Mobile.Text.SemiBold_7,
      width: '128px',
      height: '25px',
      borderRadius: '4px',
    },
  });

export const balanceGameTextStyling = (index: number) =>
  css({
    ...typo.Title,
    textAlign: 'center',
    marginTop: '99px',
    marginBottom: '63px',
    color: index === 0 ? color.WT : color.BK,
    '@media (max-width: 430px)': {
      ...typo.Mobile.Text.Bold_16,
      marginTop: '56.5px',
      marginBottom: '35px',
    },
  });
