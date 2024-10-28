/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { NewDot } from '@/assets';
import * as S from './NotificationItem.style';

export interface NotificationItemProps {
  id?: number;
  category: string;
  createdAt: string;
  postTitle: string;
  message: string;
  isNew?: boolean;
}

const NotificationItem = ({
  category,
  createdAt,
  postTitle,
  message,
  isNew,
}: NotificationItemProps) => {
  return (
    <div css={S.notificationItemStyle}>
      {isNew ? <NewDot css={S.NewNotificationStyle} /> : null}
      <div css={S.textContainerStyle}>
        <div css={S.headerStyle}>
          <div css={S.categoryStyle}>{category}</div>
          <div css={S.dateStyle}>{createdAt}</div>
        </div>
        <div css={S.titleStyle}>{postTitle}</div>
        <div css={S.contentStyle}>· {message}</div>
      </div>
    </div>
  );
};

export default NotificationItem;
