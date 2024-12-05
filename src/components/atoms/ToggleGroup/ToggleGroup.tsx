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
    fileId: string;
    order: 'asc' | 'desc';
  };
};

export interface ToggleGroupProps {
  items?: ToggleGroupItem[];
  selectedValue?: { fileId: string; order: 'asc' | 'desc' };
  onClick?: (value: { fileId: string; order: 'asc' | 'desc' }) => void;
}

const defaultItems: ToggleGroupItem[] = [
  { label: '인기순', value: { fileId: 'views', order: 'desc' } },
  { label: '최신순', value: { fileId: 'createdAt', order: 'desc' } },
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
          key={`${value.fileId},${value.order}`}
          css={[
            toggleButtonItemStyling,
            idx === 0 ? firstItemRadius : secondItemRadius,
            selectedValue &&
              value.fileId === selectedValue.fileId &&
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
