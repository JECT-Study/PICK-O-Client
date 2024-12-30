import { css } from '@emotion/react';
import color from '@/styles/color';

export const iconButtonArea = (activeTab: 'talkPick' | 'balanceGame') =>
  css({
    display: 'flex',
    justifyContent: 'center',
    minWidth: '335px',
    alignItems: 'center',
    gap: activeTab === 'talkPick' ? '1px' : '30px',
    backgroundColor: color.WT,
  });
