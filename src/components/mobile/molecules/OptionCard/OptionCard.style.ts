import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

const getBorderColor = (type: 'A' | 'B', isContentEmpty: boolean) =>
  isContentEmpty
    ? color.GY[1]
    : {
        A: color.RED,
        B: color.BLUE,
      }[type];

export const container = (
  type: 'A' | 'B',
  isContentEmpty: boolean,
  isExpanded: boolean,
) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '335px',
    padding: '4px 14px 4px 4px',
    borderRadius: '10px',
    border: `1px solid ${getBorderColor(type, isContentEmpty)}`,
    backgroundColor: color.WT,
    transition: 'all 0.3s ease',
    height: isExpanded ? '120px' : '60px',
  });

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const photoLabel = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const fileInput = css({
  display: 'none',
});

export const textContainer = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginLeft: '12px',
});

export const titleInput = css(typo.Mobile.Main.Medium_16, {
  color: color.BK,
  width: '220px',
  outline: 'none',
});

export const additionalContainer = css({
  marginTop: '6px',
  height: '56px',
  borderTop: `1px solid ${color.GY[2]}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const subTitleInput = css(typo.Mobile.Main.Medium_16, {
  fontWeight: 600,
  color: color.BK,
  padding: '4px 8px',
  outline: 'none',
});

export const expandButton = css({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  color: color.GY[1],
});
