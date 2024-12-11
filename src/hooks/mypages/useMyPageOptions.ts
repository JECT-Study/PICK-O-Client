import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OptionKeys, optionSets } from '@/constants/optionSets';
import { validateUrlParam } from '@/utils/validateUrlParam';

const isValidOptionKey = (value: string): boolean => {
  return Object.values(OptionKeys).includes(value as OptionKeys);
};

export const useMyPageOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialGroup = validateUrlParam(
    searchParams.get('group'),
    OptionKeys.TALK_PICK,
    isValidOptionKey,
  );
  const initialOption =
    searchParams.get('option') ?? optionSets[initialGroup][0].value;

  const [selectedGroup, setSelectedGroup] = useState<OptionKeys>(initialGroup);
  const [selectedOption, setSelectedOption] = useState<string>(initialOption);

  useEffect(() => {
    const group = validateUrlParam(
      searchParams.get('group'),
      OptionKeys.TALK_PICK,
      isValidOptionKey,
    );
    const option = searchParams.get('option') ?? optionSets[group][0].value;
    setSelectedGroup(group);
    setSelectedOption(option);
  }, [searchParams]);

  const handleGroupSelect = useCallback(
    (group: OptionKeys) => {
      const firstOption = optionSets[group][0].value;
      setSelectedGroup(group);
      setSelectedOption(firstOption);
      setSearchParams({ group });
    },
    [setSearchParams],
  );

  const handleOptionSelect = useCallback(
    (option: string) => {
      setSelectedOption(option);
      setSearchParams({ group: selectedGroup, option });
    },
    [selectedGroup, setSearchParams],
  );

  const options = optionSets[selectedGroup];

  return {
    selectedGroup,
    selectedOption,
    options,
    handleGroupSelect,
    handleOptionSelect,
  };
};
