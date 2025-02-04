/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '@/hooks/api/member/useLogoutMutation';
import { useNewSelector } from '@/store';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { selectAccessToken } from '@/store/auth';
import { Logo, DefaultProfile, ListIcon, LogoSmall } from '@/assets';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
import { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CreateDropdown from '@/components/atoms/CreateDropdown/CreateDropdown';
import { PATH } from '@/constants/path';
import MobileSideMenu from '@/components/mobile/atoms/MobileSideMenu/MobileSideMenu';
import useIsMobile from '@/hooks/common/useIsMobile';
import Notification from '@/components/molecules/Notification/Notification';
import { useFetchSSE } from '@/api/notifications';
import * as S from './Header.style';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const accessToken = useNewSelector(selectAccessToken) ?? '';

  const logout = useLogoutMutation();
  const { member } = useMemberQuery();

  const { messages, handleMarkAsRead } = useFetchSSE();

  const hasNewNotifications = messages.some(
    (notification) => notification.isNew,
  );

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLoginButton = useCallback(() => {
    setIsMenuOpen(false);
    if (accessToken) {
      logout.mutate();
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  }, [accessToken, logout, navigate]);

  const handleProfileIcon = useCallback(() => {
    if (accessToken) {
      navigate(`/${PATH.MYPAGE}`);
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  }, [accessToken, navigate]);

  const handleCreatePostButton = useCallback(() => {
    if (accessToken) {
      navigate(`/${PATH.CREATE.TALK_PICK}`);
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  }, [accessToken, navigate]);

  const handleCreateGameButton = useCallback(() => {
    if (accessToken) {
      navigate(`/${PATH.CREATE.GAME}`);
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  }, [accessToken, navigate]);

  const optionData: MenuItem[] = [
    {
      label: '톡픽 만들기',
      onClick: handleCreatePostButton,
    },
    {
      label: '밸런스게임 만들기',
      onClick: handleCreateGameButton,
    },
  ];

  const onClickNotification = useCallback(
    async (notificationId: number) => {
      await handleMarkAsRead(notificationId);
    },
    [handleMarkAsRead],
  );

  return (
    <div css={S.containerStyle}>
      <div css={S.logoStyle}>
        <Link to="/">{isMobile ? <LogoSmall /> : <Logo />}</Link>
      </div>
      <div css={S.rightContainerStyle}>
        {isMobile ? (
          <>
            <button
              type="button"
              aria-label="메뉴 열기"
              onClick={handleMenuToggle}
              css={S.listButtonStyle}
            >
              <ListIcon />
            </button>
            {isMenuOpen && (
              <MobileSideMenu
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                accessToken={accessToken}
                handleLoginButton={handleLoginButton}
              />
            )}
          </>
        ) : (
          <>
            <CreateDropdown optionData={optionData} />

            <div css={S.rightContainerStyle}>
              <button
                type="button"
                onClick={handleLoginButton}
                css={S.LoginButtonStyle}
              >
                {accessToken ? '로그아웃' : '로그인'}
              </button>

              <Notification
                isNew={hasNewNotifications}
                notifications={messages}
                onClickNotification={onClickNotification}
              />

              <div css={S.notificationStyle}>
                {accessToken ? (
                  <ProfileIcon
                    interaction="custom"
                    imgUrl={member?.profileImgUrl ?? DefaultProfile}
                    onClick={handleProfileIcon}
                  />
                ) : (
                  <ProfileIcon
                    interaction="default"
                    onClick={handleProfileIcon}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
