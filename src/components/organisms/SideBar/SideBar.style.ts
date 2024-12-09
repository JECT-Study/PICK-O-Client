import { css } from '@emotion/react';
import color from '@/styles/color';

const commonSideBarContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '20px',
  width: '258px',
  height: '538px',
  flexShrink: 0,
  paddingTop: '30px',
  paddingBottom: '35px',
});

export const sidebarContainer = (isLoading: boolean) =>
  css([
    commonSideBarContainer,
    isLoading
      ? { backgroundColor: color.GY[3] }
      : {
          backgroundColor: color.WT,
          border: `1px solid ${color.SKYBLUE}`,
        },
  ]);

export const profileWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const actionWrapper = css({
  width: '100%',
});

export const profileLabelBox = css({
  marginTop: '20px',
  marginBottom: '26px',
});

export const sideBoxWrapper = css({
  width: '100%',
  marginBottom: '40px',
});
