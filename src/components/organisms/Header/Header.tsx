/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '@/hooks/api/member/useLogoutMutation';
import { useNewSelector } from '@/store';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { selectAccessToken } from '@/store/auth';
import { Logo, DefaultProfile, ListIcon, LogoSmall } from '@/assets';
// import Button from '@/components/atoms/Button/Button';
// import Notification from '@/components/molecules/Notification/Notification';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
// import { useFetchSSE } from '@/api/notifications';
// import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
// import { END_POINT } from '@/constants/api';
import { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CreateDropdown from '@/components/atoms/CreateDropdown/CreateDropdown';
import { PATH } from '@/constants/path';
import MobileSideMenu from '@/components/mobile/atoms/MobileSideMenu/MobileSideMenu';
import useIsMobile from '@/hooks/common/useIsMobile';
import * as S from './Header.style';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accessToken = useNewSelector(selectAccessToken) ?? '';
  const logout = useLogoutMutation();
  const { member } = useMemberQuery();

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // FIXME:Notification 관련 코드
  // const [isNew, setIsNew] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const { messages, handleMarkAsRead } = useFetchSSE({
  //   accessToken: accessToken || '',
  //   onLogout: () => {
  //     logout.mutate();
  //     navigate('/login');
  //   },
  // });

  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) {
  //     const EventSource = EventSourcePolyfill || NativeEventSource;
  //     const eventSource = new EventSource(
  //       `${process.env.API_URL}${END_POINT.NOTIFICATON}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //         },
  //         // withCredentials: true,
  //         // heartbeatTimeout: 86400000,
  //       },
  //     );

  //     eventSource.onmessage = (e) => {
  //       console.log(e.data);
  //     };

  //     eventSource.onerror = (e) => {
  //       console.log(e);
  //       console.error('Error target: ', e.target);
  //       eventSource.close();
  //     };

  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, []);

  // const notifications = [
  //   {
  //     id: 1,
  //     category: 'MY 톡픽',
  //     createdAt: '2024.09.04',
  //     postTitle: '바보인 마리아 눈물은 바보다',
  //     message: 'MY 댓글에 답글이 달렸어요!',
  //     isNew: false,
  //   },
  // ];

  const handleLoginButton = () => {
    setIsMenuOpen(false);
    if (accessToken) {
      logout.mutate();
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  };

  const handleProfileIcon = () => {
    if (accessToken) {
      navigate(`/${PATH.MYPAGE}`);
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  };

  const handleCreatePostButton = () => {
    if (accessToken) {
      navigate(`/${PATH.CREATE.TALK_PICK}`);
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  };

  const handleCreateGameButton = () => {
    if (accessToken) {
      navigate(`/${PATH.CREATE.GAME}`);
    } else {
      navigate(`/${PATH.LOGIN}`);
    }
  };

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
  // FIXME:Notification 관련 코드
  // const handleNotificationClick = async (notificationId: number) => {
  //   try {
  //     await handleMarkAsRead(notificationId);
  //   } catch (error) {
  //     console.error('알림 클릭 에러:', error);
  //   }
  // };

  // const handleNotificationClick = (id: number) => {
  //   console.log('clicked');
  // };

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
              aria-label="headerList"
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
              {/* <Notification isNew={isNew} notifications={notifications} /> */}
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
