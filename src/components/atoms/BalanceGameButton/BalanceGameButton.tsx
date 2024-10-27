/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import * as S from './BalanceGameButton.style';

export interface BalanceGameButtonProps {
  id?: number;
  name: string;
  imgUrl: string | null;
  description: string;
  optionType: 'A' | 'B';
  selectedButton: 'A' | 'B' | null;
  randomImage: string;
  onClick: (optionType: 'A' | 'B') => void;
}

const BalanceGameButton = ({
  name,
  imgUrl,
  description,
  optionType,
  selectedButton,
  randomImage,
  onClick,
}: BalanceGameButtonProps) => {
  const isSelected = selectedButton === optionType;

  const handleClick = () => {
    onClick(optionType);
  };

  return (
    <button
      type="button"
      css={S.buttonWrapStyle(optionType)}
      onClick={handleClick}
    >
      {imgUrl ? (
        <img src={imgUrl} alt={name} css={S.imageStyle} />
      ) : (
        <div css={S.textImageStyle(randomImage)}>{name}</div>
      )}
      <div
        css={[
          S.contentBoxStyle,
          S.getButtonStyle(optionType, isSelected ? optionType : null),
        ]}
      >
        <div css={S.contentWrapper}>
          <div css={S.descriptionStyle}>{description}</div>
          <div css={S.nameStyle}>{name}</div>
        </div>
      </div>
    </button>
  );
};

export default BalanceGameButton;
