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
  value: {
    field: string;
    order: 'asc' | 'desc';
  };
};

export interface ToggleGroupProps {
  items?: ToggleGroupItem[];
  selectedValue?: { field: string; order: 'asc' | 'desc' };
  onClick?: (value: { field: string; order: 'asc' | 'desc' }) => void;
}

const defaultItems: ToggleGroupItem[] = [
  { label: '인기순', value: { field: 'views', order: 'desc' } },
  { label: '최신순', value: { field: 'createdAt', order: 'desc' } },
];

const ToggleGroup = ({
  items = defaultItems,
  selectedValue,
  onClick,
}: ToggleGroupProps) => (
  <div css={toggleButtonStyling}>
    {Array.isArray(items) &&
      items.length === 2 &&
      items.map(({ label, value }, idx) => (
        <button
          type="button"
          key={`${value.field},${value.order}`}
          css={[
            toggleButtonItemStyling,
            idx === 0 ? firstItemRadius : secondItemRadius,
            selectedValue &&
              value.field === selectedValue.field &&
              value.order === selectedValue.order &&
              selectedStyling,
          ]}
          onClick={() => onClick?.(value)}
        >
          {label}
        </button>
      ))}
  </div>
);

export default ToggleGroup;
