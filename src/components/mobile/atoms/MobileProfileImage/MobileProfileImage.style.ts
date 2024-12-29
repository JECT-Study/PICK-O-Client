import { css } from '@emotion/react';

const sizeStyles = {
  lg: {
    width: '90px',
    height: '90px',
    borderRadius: '12px',
  },
  sm: {
    width: '34px',
    height: '34px',
    borderRadius: '4px',
  },
};

export const profileImageStyle = (size: 'lg' | 'sm') =>
  css({
    ...sizeStyles[size],
    flexShrink: 0,
    objectFit: 'cover',
  });
