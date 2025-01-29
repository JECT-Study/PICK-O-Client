import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OptionKeys, optionSets } from '@/constants/optionSets';

export const useMyPageOptions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedGroup, setSelectedGroup] = useState<OptionKeys>(
    OptionKeys.TALK_PICK,
  );
  const [selectedOption, setSelectedOption] = useState<string>(
    optionSets[OptionKeys.TALK_PICK][0].value,
  );

  useEffect(() => {
    const pathArr = pathname.split('/');

    const newGroup: OptionKeys =
      pathArr[2] === 'balancegame'
        ? OptionKeys.BALANCE_GAME
        : OptionKeys.TALK_PICK;

    const defaultOpt = optionSets[newGroup][0].value;
    const newOption = pathArr[3] || defaultOpt;

    setSelectedGroup(newGroup);
    setSelectedOption(newOption);
  }, [pathname]);

  const handleGroupSelect = useCallback(
    (group: OptionKeys) => {
      const defaultOpt = optionSets[group][0].value;
      const groupPath =
        group === OptionKeys.BALANCE_GAME ? 'balancegame' : 'talkpick';

      navigate(`/mypage/${groupPath}/${defaultOpt}`);
    },
    [navigate],
  );

  const handleOptionSelect = useCallback(
    (option: string) => {
      const groupPath =
        selectedGroup === OptionKeys.BALANCE_GAME ? 'balancegame' : 'talkpick';
      navigate(`/mypage/${groupPath}/${option}`);
    },
    [navigate, selectedGroup],
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
