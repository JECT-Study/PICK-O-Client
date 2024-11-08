/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';
import NotificationItem, {
  NotificationItemProps,
} from '@/components/atoms/NotificationItem/NotificationItem';
import { NotificationBell, NotificationBellWithDot } from '@/assets';
import {
  iconContainerStyle,
  buttonStyle,
  notificationStyle,
  titleStyle,
  notificationContentStyle,
  notificationItemStyle,
} from './Notification.style';

export interface NotificationListProps {
  isNew?: boolean;
  notifications: NotificationItemProps[];
  // onClickNotification?: (notificationId: number) => void;
}

const Notification = ({
  isNew = false,
  notifications,
  // onClickNotification,
}: NotificationListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div css={iconContainerStyle}>
      {isNew ? (
        <NotificationBellWithDot
          css={buttonStyle}
          onClick={handleNotification}
        />
      ) : (
        <NotificationBell css={buttonStyle} onClick={handleNotification} />
      )}
      {isOpen ? (
        <div css={notificationStyle}>
          <div css={titleStyle}>알림</div>
          <div css={notificationContentStyle}>
            {notifications.map((notification) => (
              <button
                type="button"
                aria-label="알림 아이템"
                css={notificationItemStyle}
                key={notification.id}
                // onClick={() => onClickNotification(notification.id as number)}
              >
                <NotificationItem
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
      ) : null}
    </div>
  );
};

export default Notification;
