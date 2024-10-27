/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '@/hooks/api/member/useLogoutMutation';
import { useNewSelector } from '@/store';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { selectAccessToken } from '@/store/auth';
import { Logo, WriteIcon, DefaultProfile } from '@/assets';
import Button from '@/components/atoms/Button/Button';
import Notification from '@/components/molecules/Notification/Notification';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
// import { useFetchSSE } from '@/api/notifications';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { END_POINT } from '@/constants/api';
import { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import CreateDropdown from '@/components/atoms/CreateDropdown/CreateDropdown';
import * as S from './Header.style';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = useNewSelector(selectAccessToken);
  const logout = useLogoutMutation();
  const { member } = useMemberQuery(useParseJwt(accessToken)?.memberId);
  const [isNew, setIsNew] = useState(false);
  // FIXME:Notification 관련 코드
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

  const notifications = [
    {
      id: 1,
      category: 'MY 톡픽',
      createdAt: '2024.09.04',
      postTitle: '바보인 마리아 눈물은 바보다',
      message: 'MY 댓글에 답글이 달렸어요!',
      isNew: false,
    },
  ];

  const handleLoginButton = () => {
    if (accessToken) {
      logout.mutate();
    } else {
      navigate('/login');
    }
  };

  const handleProfileIcon = () => {
    if (accessToken) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  };

  const handleCreatePostButton = () => {
    if (accessToken) {
      navigate('/post/create');
    } else {
      navigate('/login');
    }
  };

  const optionData: MenuItem[] = [
    {
      label: '톡픽 만들기',
      onClick: handleCreatePostButton,
    },
    {
      label: '밸런스게임 만들기',
      onClick: () => {
        // TODO: 밸런스 게임 만들기 이동 로직
        console.log('클릭됨!!');
      },
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
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div css={S.rightContainerStyle}>
        <CreateDropdown optionData={optionData} />
        <div css={S.rightContainerStyle}>
          <button
            type="button"
            onClick={handleLoginButton}
            css={S.LoginButtonStyle}
          >
            {accessToken ? '로그아웃' : '로그인'}
          </button>
          <Notification isNew={isNew} notifications={notifications} />
          <div css={S.notificationStyle}>
            {accessToken ? (
              <ProfileIcon
                interaction="settings"
                imgUrl={member?.profileImageUrl ?? DefaultProfile}
                onClick={handleProfileIcon}
              />
            ) : (
              <ProfileIcon interaction="normal" onClick={handleProfileIcon} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
