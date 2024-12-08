import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const categoryButtonBaseStyle = (imageType: 'talkpick' | 'game') =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '13px',
    padding: '5px 5px 5px 21px',
    borderRadius: '500px',
    backgroundColor: color.WT,
    boxShadow: '1px 2px 15px 0 rgba(119, 130, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in',
    width: imageType === 'talkpick' ? '102px' : '139px',
    marginLeft: imageType === 'talkpick' ? '37px' : 0,
  });

export const imgWrap = css({
  flexShrink: 0,
});

export const labelStyle = css(typo.Mobile.Text.SemiBold_14, {
  color: color.MAIN,
});
