import React from 'react';
import { ToggleGroupItem, ToggleGroupProps } from '@/types/toggle';
import {
  selectedStyling,
  firstItemRadius,
  secondItemRadius,
  toggleButtonStyling,
  toggleButtonItemStyling,
} from './ToggleGroup.style';

const defaultItems: ToggleGroupItem[] = [
  { label: '인기순', value: { field: 'views', order: 'desc' } },
  { label: '최신순', value: { field: 'createdAt', order: 'desc' } },
];

const isSelected = (
  selectedValue: { field: string; order: 'asc' | 'desc' } | undefined,
  value: { field: string; order: 'asc' | 'desc' },
): boolean => {
  if (!selectedValue) return false;
  return (
    selectedValue.field === value.field && selectedValue.order === value.order
  );
};

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
            isSelected(selectedValue, value) && selectedStyling,
          ]}
          onClick={() => onClick?.(value)}
        >
          {label}
        </button>
      ))}
  </div>
);

export default ToggleGroup;
