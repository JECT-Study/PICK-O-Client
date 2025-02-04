/* eslint-disable @typescript-eslint/no-misused-promises */
import NotificationItem from '@/components/atoms/NotificationItem/NotificationItem';
import NotificationHeader from '@/components/mobile/molecules/NotificationHeader/NotificationHeader';
import React, { useCallback } from 'react';
import { useFetchSSE } from '@/api/notifications';
import * as S from './NotificationPage.style';

const NotificationPage = () => {
  const { messages, handleMarkAsRead } = useFetchSSE();

  const onClickNotification = useCallback(
    async (notificationId: number) => {
      await handleMarkAsRead(notificationId);
    },
    [handleMarkAsRead],
  );

  return (
    <div css={S.containerStyle}>
      <NotificationHeader />

      <div css={S.notificationContentStyle}>
        {messages.map((notification) => (
          <button
            type="button"
            aria-label="알림 아이템"
            key={notification.id}
            css={S.buttonStyle}
            onClick={() => onClickNotification(notification.id)}
          >
            <NotificationItem
              id={notification.id}
              category={notification.category}
              createdAt={notification.createdAt}
              postTitle={notification.postTitle}
              message={notification.message}
              isNew={notification.isNew}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
