import React from 'react';
import SelectGroup, {
  SelectGroupItem,
} from '@/components/atoms/SelectGroup/SelectGroup';
import OptionSelector from '@/components/molecules/OptionSelector/OptionSelector';
import { OptionKeys } from '@/constants/optionSets';
import * as S from './OptionBar.style';

export interface OptionBarProps {
  selectedGroup: OptionKeys;
  selectedOption: string;
  onGroupSelect: (value: OptionKeys) => void;
  onOptionSelect: (option: string) => void;
  options: { label: string; value: string }[];
}

const OptionBar = ({
  selectedGroup,
  selectedOption,
  onGroupSelect,
  onOptionSelect,
  options,
}: OptionBarProps) => {
  const selectGroupItems: [
    SelectGroupItem<OptionKeys>,
    SelectGroupItem<OptionKeys>,
  ] = [
    { label: '톡픽', value: OptionKeys.TALK_PICK },
    { label: '밸런스 게임', value: OptionKeys.BALANCE_GAME },
  ];

  return (
    <div css={S.container}>
      <SelectGroup
        items={selectGroupItems}
        selectedValue={selectedGroup}
        onSelect={onGroupSelect}
      />
      <OptionSelector
        options={options}
        selectedOption={selectedOption}
        onSelect={onOptionSelect}
      />
    </div>
  );
};

export default OptionBar;
