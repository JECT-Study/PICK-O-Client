import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const container = (
  type: 'A' | 'B',
  isTitleOrSubTitleEmpty: boolean,
  isExpanded: boolean,
) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '335px',
    padding: '10px 10px 10px 5px',
    borderRadius: '10px',
    border: `1px solid ${
      isTitleOrSubTitleEmpty
        ? color.GY[1]
        : type === 'A'
          ? color.RED
          : color.BLUE
    }`,
    backgroundColor: color.WT,
    transition: 'all 0.3s ease',
    height: isExpanded ? 'auto' : '60px',
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

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
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

export const expandButton = (isExpanded: boolean) =>
  css({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    color: color.GY[1],
    marginTop: isExpanded ? '8px' : '0', // expanded 상태일 때 하단에 위치
    alignSelf: isExpanded ? 'flex-end' : 'center',
  });

export const additionalContainer = css({
  marginTop: '8px',
  padding: '8px 0',
  borderTop: `1px solid ${color.GY[2]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const subTitleInput = css({
  fontSize: '14px',
  color: color.GY[1],
  padding: '4px 8px',
  borderRadius: '4px',
  border: `1px solid ${color.GY[2]}`,
});
