import { css } from '@emotion/react';

export const profileWrapper = css({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  cursor: 'pointer',
});

export const getProfileSize = (size: 'extraSmall' | 'small' | 'large') => {
  const style = {
    large: css({
      width: '142px',
      height: '142px',
    }),
    small: css({
      width: '40px',
      height: '40px',
    }),
    extraSmall: css({
      width: '30px',
      height: '30px',
    }),
  };

  return style[size];
};

export const profileImage = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
