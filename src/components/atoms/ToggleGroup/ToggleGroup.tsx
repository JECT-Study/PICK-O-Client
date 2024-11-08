import React from 'react';
import {
  selectedStyling,
  firstItemRadius,
  secondItemRadius,
  toggleButtonStyling,
  toggleButtonItemStyling,
} from './ToggleGroup.style';

export type ToggleGroupItem = {
  label: string;
  value: string;
};

export interface ToggleGroupProps {
  items?: ToggleGroupItem[];
  selectedValue?: string;
  onClick?: (value: string) => void;
}

const defaultItems: ToggleGroupItem[] = [
  { label: '인기순', value: 'views' },
  { label: '최신순', value: 'createdAt' },
];

const ToggleGroup = ({
  items = defaultItems,
  selectedValue,
  onClick,
}: ToggleGroupProps) => (
  <div css={toggleButtonStyling}>
    {Array.isArray(items) &&
      items.length === 2 &&
      items.map((item, idx) => (
        <button
          type="button"
          key={item.value}
          css={[
            toggleButtonItemStyling,
            idx === 0 ? firstItemRadius : secondItemRadius,
            item.value === selectedValue && selectedStyling,
          ]}
          onClick={() => onClick?.(item.value)}
        >
          {item.label}
        </button>
      ))}
  </div>
);

export default ToggleGroup;
