import { css } from '@emotion/react';
import color from '@/styles/color';

export const containerStyle = css`
  display: inline-flex;
  padding: 5px;
  align-items: center;
  gap: 10px;
  border-radius: 50px 50px 0 50px;
`;

export const getProfileColor = (option: 'A' | 'B' | null) => {
  const backgroundColors = {
    A: color.RED,
    B: color.BLUE,
    null: color.GY[2],
  };

  return css({
    backgroundColor: backgroundColors[option ?? 'null'],
  });
};

export const profileWrapper = css({
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  cursor: 'pointer',
});

export const profileImage = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
