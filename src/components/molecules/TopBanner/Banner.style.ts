import { css } from '@emotion/react';

export const commonBannerStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '500px',
  paddingTop: '69px',
  paddingBottom: '110px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  cursor: 'pointer',
  '@media (max-width: 430px)': {
    height: '227px',
    paddingTop: '31px',
    paddingBottom: '48px',
  },
});

export const commonChipStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '24px',
  '@media (max-width: 430px)': {
    gap: '2px',
  },
});

export const commonButtonStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  '@media (max-width: 430px)': {
    padding: '6.3px 36px',
    borderRadius: '4px',
  },
});
