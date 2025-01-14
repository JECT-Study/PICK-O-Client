import React, { useState, useEffect } from 'react';
import { TriangleDown, TriangleUp } from '@/assets';
import {
  ToggleGroupItem,
  ToggleGroupProps,
  ToggleGroupValue,
} from '@/types/toggle';
import * as S from './MobileToggleGroup.style';

const defaultItems: ToggleGroupItem[] = [
  {
    label: '인기순',
    value: { field: 'views', order: 'desc' },
  },
  {
    label: '최신순',
    value: { field: 'createdAt', order: 'desc' },
  },
];

const MobileToggleGroup = ({
  items = defaultItems,
  selectedValue,
  onClick,
}: ToggleGroupProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  const handleToggleClick = (value: ToggleGroupValue) => {
    onClick?.(value);
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const isSelectedViews = selectedValue?.field === 'views';

  return (
    <div css={S.toggleGroupStyle}>
      <button
        css={S.clickedToggleStyle(isOpen)}
        type="button"
        onClick={handleMenuClick}
      >
        {isSelectedViews ? '인기순' : '최신순'}{' '}
        {isOpen ? <TriangleUp /> : <TriangleDown />}
      </button>
      {isOpen && (
        <button
          css={S.unClickedToggleStyle}
          type="button"
          onClick={() =>
            handleToggleClick(isSelectedViews ? items[1].value : items[0].value)
          }
        >
          {isSelectedViews ? '최신순' : '인기순'}
        </button>
      )}
    </div>
  );
};

export default MobileToggleGroup;
