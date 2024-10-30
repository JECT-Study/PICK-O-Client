import { css } from '@emotion/react';
import color from '@/styles/color';

export const sidebarContainer = (isLoading: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: isLoading ? color.GY[3] : color.WT,
    borderRadius: '20px',
    width: '258px',
    height: '538px',
    flexShrink: 0,
    border: isLoading ? '' : `1px solid ${color.SKYBLUE}`,
    paddingTop: '30px',
    paddingBottom: '35px',
  });

export const profileWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '40px',
  width: '100%',
});

export const actionWrapper = css({
  width: '100%',
});

export const profileLabelBox = css({
  marginTop: '20px',
  marginBottom: '26px',
});

export const sideWrapper = css({
  width: '100%',
});
