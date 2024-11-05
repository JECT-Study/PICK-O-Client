import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const choiceInputContainer = (withText: boolean, option: 'A' | 'B') => {
  const borderColor = (() => {
    if (!withText) return color.GY[2];
    return option === 'A' ? color.RED : color.BLUE;
  })();

  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '578px',
    backgroundColor: withText ? color.WT : color.GY[3],
    borderRadius: '20px',
    border: `1px solid ${borderColor}`,
  });
};

export const choiceInputWrapper = css({
  display: 'flex',
  justifyContents: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '20px',
  gap: '17px',
});

export const choiceInputStyling = css(typo.Main.Medium, {
  width: '100%',
  height: '34px',
  paddingLeft: '10px',
  color: color.BK,
});
