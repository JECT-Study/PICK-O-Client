import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const buttonStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0',
  background: 'none',
  border: 'none',
  outline: 'none',
  width: '284px',
  '@media (max-width: 430px)': {
    width: '84px',
  },
});

export const buttonTitleStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '8px',
  transition: 'color 0.3s ease-in-out',
  '@media (max-width: 430px)': {
    marginBottom: '2px',
  },
});

export const iconStyle = css({
  marginLeft: '8px',
  '@media (max-width: 430px)': {
    marginLeft: '2px',
  },
});

export const activeStyle = css({
  ...typo.Component.Bold,
  color: color.MAIN,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.Bold_12,
  },
});

export const inactiveStyle = css({
  ...typo.Component.Medium,
  color: color.GY[1],
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.Medium_12,
  },
});

export const inactiveBadgeWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '22px',
  '@media (max-width: 430px)': {
    marginTop: '6px',
  },
});

export const badgeWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '14px',
  '@media (max-width: 430px)': {
    marginTop: '2px',
  },
});

export const inactiveLineStyle = (label: string) => {
  let baseBorderRadius = '0';
  let mobileBorderRadius = '0';

  if (label === '인기') {
    baseBorderRadius = '10px 0 0 10px';
    mobileBorderRadius = '3px 0 0 3px';
  } else if (label === '월드컵') {
    baseBorderRadius = '0 10px 10px 0';
    mobileBorderRadius = '0 3px 3px 0';
  }

  return css({
    flex: 1,
    height: '5px',
    backgroundColor: color.GY[2],
    borderRadius: baseBorderRadius,
    '@media (max-width: 430px)': {
      height: '1.5px',
      borderRadius: mobileBorderRadius,
    },
  });
};

export const leftLineStyle = css({
  flex: 1,
  height: '5px',
  borderRadius: '10px 0 0 10px',
  backgroundColor: color.MAIN,
  '@media (max-width: 430px)': {
    height: '1.5px',
    borderRadius: '3px 0 0 3px',
  },
});

export const rightLineStyle = css({
  flex: 1,
  height: '5px',
  borderRadius: '0 10px 10px 0',
  backgroundColor: color.MAIN,
  '@media (max-width: 430px)': {
    height: '1.5px',
    borderRadius: '0 3px 3px 0',
  },
});

export const badgeStyle = css({
  ...typo.Comment.SemiBold,
  padding: '4.5px 32px',
  borderRadius: '30px',
  backgroundColor: color.MAIN,
  color: color.WT,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.SemiBold_7,
    padding: '0.5px 5.5px',
  },
});
