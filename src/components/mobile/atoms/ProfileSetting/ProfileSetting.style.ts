import color from '@/styles/color';
import { css } from '@emotion/react';

export const profileSettingContainer = css({
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
});

export const profileSettingInnerContainer = css({
  borderRadius: '50%',
  overflow: 'hidden',
  border: `3px solid ${color.WT}`,
  boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.1)',
});

export const profileImageWrapper = css({
  width: '87px',
  height: '87px',
});

export const profilePlusWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '60px',
  right: '-5px',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: color.GY[3],
  boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.1)',
});

export const profilePlusImageWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
