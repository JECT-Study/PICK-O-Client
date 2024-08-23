import React from 'react';
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
import {
  containerStyle,
  logoStyle,
  IconStyle,
  WriteButtonStyle,
  LoginButtonStyle,
  rightContainerStyle,
  notificationStyle,
} from './Header.style';

const Header = () => {
  const navigate = useNavigate();

  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);
  const logout = useLogoutMutation();

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

  return (
    <div css={containerStyle}>
      <div css={logoStyle}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div css={rightContainerStyle}>
        <Button variant="roundPrimary" size="medium" css={WriteButtonStyle}>
          <WriteIcon css={IconStyle} />
          톡픽쓰기
        </Button>
        <div css={rightContainerStyle}>
          <button
            type="button"
            onClick={handleLoginButton}
            css={LoginButtonStyle}
          >
            {accessToken ? '로그아웃' : '로그인'}
          </button>
          <Notification isNew={false} notifications={[]} />
          <div css={notificationStyle}>
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
