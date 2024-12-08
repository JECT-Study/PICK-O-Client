import React from 'react';
import * as S from './SelectGroup.style';

export type SelectGroupItem<T> = {
  label: string;
  value: T;
};

export interface SelectGroupProps<T> {
  items: [SelectGroupItem<T>, SelectGroupItem<T>];
  selectedValue?: T;
  onSelect?: (value: T) => void;
}

const SelectGroup = <T,>({
  items,
  selectedValue,
  onSelect,
}: SelectGroupProps<T>) => (
  <div css={S.selectGroupStyling} aria-label="옵션 선택">
    {items.map(({ label, value }, index) => (
      <button
        key={String(value)}
        type="button"
        css={[
          S.selectGroupItemStyling,
          value === selectedValue && S.selectedStyling,
          index === 1 && S.secondButtonShift,
        ]}
        onClick={() => onSelect?.(value)}
        aria-pressed={value === selectedValue}
        aria-label={`${label} 선택`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default SelectGroup;
