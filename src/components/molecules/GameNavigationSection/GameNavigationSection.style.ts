import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const navigationContainer = css({
  display: 'flex',
  flexDirection: 'row',
  width: '1174px',
  gap: '180px',
  alignItems: 'center',
});

export const buttonStyling = css(typo.Main.SemiBold, {
  display: 'flex',
  width: '193px',
  height: '60px',
  padding: '8px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  border: `1px solid ${color.MAIN}`,
  borderRadius: '4px',
  color: color.MAIN,
  backgroundColor: color.WT,
  cursor: 'pointer',
  flexShrink: 0,

  svg: {
    fill: color.MAIN,
  },
});

export const activeButtonStyling = (isActive: boolean) => {
  if (isActive) {
    return css({
      ':hover': {
        backgroundColor: color.MAIN,
        color: color.WT,

        svg: {
          fill: color.WT,
        },
      },
    });
  }
  return css({});
};

export const completeButtonStyling = css({
  backgroundColor: color.MAIN,
  color: color.WT,
});

export const getButtonVisibility = (currentStage: number) =>
  css({
    visibility: currentStage >= 0 ? 'visible' : 'hidden',
  });

export const hiddenButtonStyling = css({
  visibility: 'hidden',
});
