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
  border: `4px solid ${color.WT}`,
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
});

export const profileImageWrapper = css({
  width: '135px',
  height: '135px',
});

export const profilePlusWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '85px',
  right: '-10px',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: color.GY[3],
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
});

export const profilePlusImageWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
