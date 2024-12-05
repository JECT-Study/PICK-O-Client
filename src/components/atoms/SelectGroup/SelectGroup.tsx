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
    {items.map((item) => (
      <button
        key={item.value}
        type="button"
        css={[
          S.selectGroupItemStyling,
          S.itemRadius,
          item.value === selectedValue && S.selectedStyling,
        ]}
        onClick={() => onSelect?.(item.value)}
        aria-pressed={item.value === selectedValue}
        aria-label={`${item.label} 선택`}
      >
        {item.label}
      </button>
    ))}
    <div css={S.bottomBarStyling} />
  </div>
);

export default SelectGroup;
