import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import OptionBar from '@/components/organisms/OptionBar/OptionBar';
import { OptionKeys, optionSets } from '@/constants/optionSets';

const meta: Meta<typeof OptionBar> = {
  title: 'organisms/OptionBar',
  component: OptionBar,
  argTypes: {
    selectedGroup: {
      control: { type: 'radio' },
      options: [OptionKeys.TALK_PICK, OptionKeys.BALANCE_GAME],
    },
    selectedOption: {
      control: { type: 'text' },
    },
    onGroupSelect: { action: '그룹 변경' },
    onOptionSelect: { action: '옵션 변경' },
  },
  args: {
    selectedGroup: OptionKeys.TALK_PICK,
    selectedOption: optionSets[OptionKeys.TALK_PICK][0].value,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedGroup, setSelectedGroup] = useState<OptionKeys>(
      args.selectedGroup,
    );
    const [selectedOption, setSelectedOption] = useState<string>(
      args.selectedOption,
    );

    return (
      <OptionBar
        selectedGroup={selectedGroup}
        selectedOption={selectedOption}
        options={optionSets[selectedGroup]}
        onGroupSelect={(group) => {
          setSelectedGroup(group);
          setSelectedOption(optionSets[group][0].value);
          args.onGroupSelect(group);
        }}
        onOptionSelect={(option) => {
          setSelectedOption(option);
          args.onOptionSelect(option);
        }}
      />
    );
  },
};

export const All: Story = {
  render: (args) => (
    <div>
      <h3>톡픽 선택 시</h3>
      <OptionBar
        {...args}
        selectedGroup={OptionKeys.TALK_PICK}
        selectedOption={optionSets[OptionKeys.TALK_PICK][0].value}
        options={optionSets[OptionKeys.TALK_PICK]}
      />
      <h3>밸런스 게임 선택 시</h3>
      <OptionBar
        {...args}
        selectedGroup={OptionKeys.BALANCE_GAME}
        selectedOption={optionSets[OptionKeys.BALANCE_GAME][0].value}
        options={optionSets[OptionKeys.BALANCE_GAME]}
      />
    </div>
  ),
};
