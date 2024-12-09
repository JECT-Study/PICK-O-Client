import React, { useState, useEffect } from 'react';
import { TriangleDown, TriangleUp } from '@/assets';
import * as S from './MobileToggleGroup.style';

interface MobileToggleGroupProps {
  selectedValue?: string;
  onClick?: (value: string) => void;
}

const MobileToggleGroup = ({
  selectedValue,
  onClick,
}: MobileToggleGroupProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    const newValue = selectedValue === 'views' ? 'createdAt' : 'views';
    onClick?.(newValue);
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div css={S.toggleGroupStyle}>
      <button
        css={S.clickedToggleStyle(isOpen)}
        type="button"
        onClick={handleMenuClick}
      >
        {selectedValue === 'views' ? '인기순' : '최신순'}{' '}
        {isOpen ? <TriangleUp /> : <TriangleDown />}
      </button>
      {isOpen && (
        <button
          css={S.unClickedToggleStyle}
          type="button"
          onClick={handleToggleClick}
        >
          {selectedValue === 'views' ? '최신순' : '인기순'}
        </button>
      )}
    </div>
  );
};

export default MobileToggleGroup;
