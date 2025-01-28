import React from 'react';
import { Link } from 'react-router-dom';
import { MobileBackButton } from '@/assets';
import * as S from './NotificationHeader.style';

const NotificationHeader = () => {
  return (
    <div css={S.containerStyle}>
      <div css={S.iconStyle}>
        <Link to="/">
          <MobileBackButton />
        </Link>
      </div>
      <div css={S.textStyle}>알림 내역</div>
    </div>
  );
};

export default NotificationHeader;
