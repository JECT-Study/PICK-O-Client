/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CircleClose, CirclePencil } from '@/assets';
import FloatingButton from '@/components/mobile/atoms/FloatingButton/FloatingButton';
import { PATH } from '@/constants/path';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import * as S from './FloatingMenuButton.style';

const FloatingMenuButton = () => {
  const navigate = useNavigate();
  const accessToken = useNewSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState(false);

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
      {isOpen && (
        <div css={S.overlay} onClick={handleOutsideClick} aria-hidden="true" />
      )}
      {isOpen && (
        <div css={S.ButtonWrapper}>
          <FloatingButton
            imageType="talkpick"
            label="톡픽"
            onClick={handleCreatePostButton}
          />
          <FloatingButton
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
export default FloatingMenuButton;
