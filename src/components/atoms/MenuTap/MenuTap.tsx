import React, { useState, useEffect, ReactNode } from 'react';
import { Menu } from '@/assets';
import {
  menuIconStlying,
  menuItemStyling,
  menuStlying,
  menuTapStyling,
} from './MenuTap.style';

export type MenuItem = {
  id: number;
  label?: ReactNode;
  onClick?: () => void;
};

export interface MenuTapProps {
  menuData: MenuItem[];
}

const MenuTap = ({ menuData }: MenuTapProps) => {
  const [view, setView] = useState<boolean>(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView(!view);
  };

  const handleOutsideClick = () => {
    setView(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div css={menuTapStyling}>
      <Menu css={menuIconStlying} onClick={handleMenuClick} />
      {view && (
        <div css={menuStlying}>
          {menuData.map((item) => (
            <button
              type="button"
              key={item.id}
              css={menuItemStyling}
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

export default MenuTap;
