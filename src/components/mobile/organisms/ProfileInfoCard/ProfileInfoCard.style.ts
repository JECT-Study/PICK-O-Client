import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '335px',
  margin: '0 auto',
  height: '112px',
  flexShrink: '0',
  border: `0.6px solid ${color.GY[5]}`,
  borderRadius: '16px',
  backgroundColor: color.WT,
});

export const profileImageWrapper = css({
  marginLeft: '11px',
  marginRight: '5px',
});

export const userInfoWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingTop: '6px',
  paddingBottom: '2px',
});

export const userInfoBox = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  paddingLeft: '11px',
});

export const userBadgeStyle = css({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  backgroundColor: color.MAIN,
});

export const usernameStyle = css(typo.Main.SemiBold_16, {
  color: color.BK,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const countBoxWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  marginTop: '17px',
});

export const menuTapWrapper = css({
  position: 'absolute',
  padding: '4px 10px',
  alignItems: 'center',
  top: '11px',
  right: '6px',
});
