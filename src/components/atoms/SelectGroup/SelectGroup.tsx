import React from 'react';
import * as S from './SelectGroup.style';

export type SelectGroupItem = {
  label: string;
  value: string;
};

export interface SelectGroupProps {
  items: [SelectGroupItem, SelectGroupItem];
  selectedValue?: string;
  onSelect?: (value: string) => void;
}
const SelectGroup = ({ items, selectedValue, onSelect }: SelectGroupProps) => (
  <div css={S.selectGroupStyling} role="group" aria-label="옵션 선택">
    {items.map(({ label, value }) => (
      <button
        key={value}
        type="button"
        css={[
          S.selectGroupItemStyling,
          S.itemRadius,
          value === selectedValue && S.selectedStyling,
        ]}
        onClick={() => onSelect?.(value)}
        aria-pressed={value === selectedValue}
        aria-label={`${label} 선택`}
      >
        {label}
      </button>
    ))}
    <div css={S.bottomBarStyling} />
  </div>
);

export default SelectGroup;
