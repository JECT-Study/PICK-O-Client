import React from 'react';
import { RedCheckIcon, BlueCheckIcon } from '@/assets';
import * as S from './BalanceGameButton.style';

export interface BalanceGameButtonProps {
  name: string;
  imgUrl: string | null;
  description: string;
  optionType: 'A' | 'B';
  selectedButton: 'A' | 'B' | null;
  onClick: (optionType: 'A' | 'B') => void;
}

const BalanceGameButton = ({
  name,
  imgUrl,
  description,
  optionType,
  selectedButton,
  onClick,
}: BalanceGameButtonProps) => {
  const isSelected = selectedButton === optionType;
  const hasOnlyTitle = !description && !imgUrl;

  const handleClick = () => {
    onClick(optionType);
  };

  const renderCheckedIcon = () => {
    return optionType === 'A' ? <RedCheckIcon /> : <BlueCheckIcon />;
  };

  return (
    <button
      type="button"
      css={[S.buttonWrapStyle, S.getOutlineStyle(optionType, isSelected)]}
      onClick={handleClick}
    >
      <div css={S.nameWrapper}>
        <div css={S.nameStyle}>{name}</div>
        {isSelected && renderCheckedIcon()}
      </div>
      {!hasOnlyTitle && (
        <div css={S.contentWrapper}>
          {imgUrl && (
            <div css={S.imgContainer}>
              <img src={imgUrl} alt={name} css={S.imgStyle} />
            </div>
          )}
          <div css={S.descriptionStyle}>{description}</div>
        </div>
      )}
    </button>
  );
};

export default BalanceGameButton;
