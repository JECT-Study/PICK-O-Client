/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CircleClose, CirclePencil } from '@/assets';
import MobileCreateButton from '@/components/mobile/atoms/MobileCreateButton/MobileCreateButton';
import { PATH } from '@/constants/path';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import * as S from './MobileCreateDropdown.style';

const MobileCreateDropdown = () => {
  const navigate = useNavigate();
  const accessToken = useNewSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCreatePostButton = () => {
    if (accessToken) {
      navigate(PATH.CREATE.TALK_PICK);
    } else {
      navigate(PATH.LOGIN);
    }
  };

  const handleCreateGameButton = () => {
    if (accessToken) {
      navigate(PATH.CREATE.GAME);
    } else {
      navigate(PATH.LOGIN);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <div css={S.dropdownStyling}>
      {isOpen && <div css={S.overlay} onClick={handleOutsideClick} />}
      {isOpen && (
        <div css={S.ButtonWrapper}>
          <MobileCreateButton
            imageType="talkpick"
            label="톡픽"
            onClick={handleCreatePostButton}
          />
          <MobileCreateButton
            imageType="game"
            label="밸런스 게임"
            onClick={handleCreateGameButton}
          />
        </div>
      )}
      <button
        css={S.dropdownButtonStyling}
        type="button"
        onClick={handleMenuClick}
      >
        {isOpen ? <CircleClose /> : <CirclePencil />}
      </button>
    </div>
  );
};
export default MobileCreateDropdown;
