import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';
import type { TalkPickListItemProps } from './TalkPickItem';

export const commonNumberStyle = css(typo.Number.Medium, {
  color: color.GY[1],
});

export const bestNumberStyle = css(typo.Number.Medium, {
  color: color.MAIN,
});

export const commonStyle = css(typo.Comment.SemiBold, {
  color: color.GY[1],
});

export const headerStyle = css(typo.Main.Medium, {
  color: color.BK,
});

export const borderBottomStyling = css({
  borderBottom: '1px solid #F4F4F4',
});

export const centerStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const talkPickListItemStyling = css({
  display: 'flex',
  alignItems: 'center',
  width: '1174px',
  height: '60px',
});

export const talkPickListId = css([
  centerStyling,
  {
    width: '112px',
    color: color.GY[1],
  },
]);

export const getTalkPickListIdStyling = (
  type: Required<TalkPickListItemProps>['type'],
) => {
  return type === 'best' ? bestNumberStyle : commonNumberStyle;
};

export const talkPickListTitle = css({
  width: '570px',
  padding: '0 10px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: color.BK,
});

export const talkPickTitleStyling = css({
  cursor: 'pointer',
  textAlign: 'left',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const getTalkPickListTitleStyling = (
  type: Required<TalkPickListItemProps>['type'],
) => {
  const style = {
    header: css(typo.Main.Medium, centerStyling),
    default: css(typo.Main.Medium, talkPickTitleStyling),
    best: css(typo.Main.SemiBold, talkPickTitleStyling, {
      fontWeight: 'bold',
    }),
  };

  return style[type];
};

export const getTalkPickListWriterStyling = (
  type: Required<TalkPickListItemProps>['type'],
) => {
  return type === 'header' ? headerStyle : commonStyle;
};

export const talkPickListWideDetail = css([
  centerStyling,
  {
    width: '148px',
  },
]);

export const talkPickListDetail = css([
  centerStyling,
  {
    width: '85px',
  },
]);

export const getTalkPickListDetailStyling = (
  type: Required<TalkPickListItemProps>['type'],
) => {
  return type === 'header' ? headerStyle : commonNumberStyle;
};
