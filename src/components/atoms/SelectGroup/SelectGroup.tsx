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
  <div css={S.selectGroupStyling} role="group" aria-label="옵션 선택">
    {items.map(({ label, value }) => (
      <button
        key={String(value)}
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
