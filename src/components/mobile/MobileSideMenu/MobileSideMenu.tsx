import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MobileSideMenu.style';

interface MobileSideMenuProps {
  isOpen: boolean;
  accessToken: string | null;
  handleLoginButton: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileSideMenu = ({
  isOpen,
  accessToken,
  handleLoginButton,
  setIsOpen,
}: MobileSideMenuProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div css={S.buttonGroupStyle}>
      <div css={S.buttonContainerStyle}>
        <button
          css={S.buttonStyle}
          type="button"
          onClick={() => {
            if (accessToken) {
              handleNavigation('/mypage');
            } else {
              handleNavigation('/login');
            }
          }}
        >
          마이페이지
        </button>

        <button
          css={S.buttonStyle}
          type="button"
          onClick={() => {
            if (accessToken) {
              handleNavigation('/notifications');
            } else {
              handleNavigation('/login');
            }
          }}
        >
          알림 내역
        </button>
        <button css={S.buttonStyle} type="button" onClick={handleLoginButton}>
          {accessToken ? '로그아웃' : '로그인'}
        </button>
        {accessToken && (
          <button css={S.buttonStyle} type="button" onClick={handleLoginButton}>
            회원 탈퇴
          </button>
        )}
      </div>
      <div css={S.fillerStyle} role="presentation" />
    </div>
  );
};

export default MobileSideMenu;
