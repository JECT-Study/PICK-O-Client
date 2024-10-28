import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from '@/assets';
import { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import * as S from './CreateDropdown.style';

interface CreateDropdownProps {
  optionData: MenuItem[];
}

const CreateDropdown = ({ optionData }: CreateDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <button
        css={S.dropdownButtonStyling}
        type="button"
        onClick={handleMenuClick}
      >
        나도 만들기 {isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      {isOpen && (
        <div css={S.optionStlying}>
          {optionData.map((item) => (
            <button
              type="button"
              key={item.label}
              css={S.optionItemStyling}
              onClick={item?.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateDropdown;
