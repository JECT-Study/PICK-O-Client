import SelectGroup, {
  SelectGroupItem,
} from '@/components/atoms/SelectGroup/SelectGroup';
import OptionSelector from '@/components/molecules/OptionSelector/OptionSelector';
import { optionSets, OptionKeys } from '@/constants/optionSets';
import * as S from './OptionBar.style';

export interface OptionBarProps {
  selectGroupItems: SelectGroupItem[];
  selectedGroup: OptionKeys;
  selectedOption: string;
  onGroupSelect: (value: OptionKeys) => void;
  onOptionSelect: (option: string) => void;
}
const OptionBar = ({
  selectGroupItems,
  selectedGroup,
  selectedOption,
  onGroupSelect,
  onOptionSelect,
}: OptionBarProps) => {
  const options = optionSets[selectedGroup];

  return (
    <div css={S.container}>
      <SelectGroup
        items={selectGroupItems}
        selectedValue={selectedGroup}
        onSelect={(value) => onGroupSelect(value as OptionKeys)}
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
