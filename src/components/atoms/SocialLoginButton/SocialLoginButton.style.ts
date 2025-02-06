import { css } from '@emotion/react';
import color from '@/styles/color';
import type { SocialLoginButtonProps } from './SocialLoginButton';

export const socialLoginStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

export const loginButtonStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: color.WT,
  outline: `1px solid ${color.GY[2]}`,
  cursor: 'pointer',

  ':hover': {
    boxShadow: '0px 0px 15px rgba(119, 130, 225, 1)',
  },
});

export const getSizeStyling = (
  size: Required<SocialLoginButtonProps>['size'],
) => {
  const style = {
    medium: css({
      width: '83px',
      height: '83px',
    }),
    small: css({
      width: '58px',
      height: '58px',
    }),
  };

  return style[size];
};

export const getRecentLoginStyling = (size: string) =>
  css({
    position: 'absolute',
    marginTop: size === 'medium' ? '90px' : '62px',
  });
