import React, { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import * as S from './OptionSelector.style';

interface OptionSelectorProps {
  options: { label: string; value: string }[];
  selectedOption?: string;
  onSelect: (option: string) => void;
}
const OptionSelector = ({
  options,
  selectedOption,
  onSelect,
}: OptionSelectorProps) => {
  const [selected, setSelected] = useState(selectedOption || options[0].value);

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    onSelect(optionValue);
  };

  return (
    <div css={S.optionSelectorContainer}>
      {options.map(({ label, value }) => (
        <Button
          key={value}
          variant={selected === value ? 'roundPrimary2' : 'outlinePrimary'}
          size="large"
          onClick={() => handleSelect(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default OptionSelector;
