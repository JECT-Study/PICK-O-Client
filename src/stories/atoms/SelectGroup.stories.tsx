import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SelectGroup, {
  SelectGroupItem,
} from '@/components/atoms/SelectGroup/SelectGroup';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/SelectGroup',
  component: SelectGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedValue: { control: 'text' },
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof SelectGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: '톡픽', value: 'talkpick' },
      { label: '밸런스 게임', value: 'balance' },
    ] as [SelectGroupItem, SelectGroupItem],
    selectedValue: 'talkpick',
  },
};

export const All: Story = {
  args: {
    items: [
      { label: '톡픽', value: 'talkpick' },
      { label: '밸런스 게임', value: 'balance' },
    ] as [SelectGroupItem, SelectGroupItem],
    selectedValue: 'talkpick',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.selectedValue);

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>토글 테스트</h3>
          <SelectGroup
            {...args}
            selectedValue={selectedValue}
            onSelect={setSelectedValue}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>톡픽 선택됨</h3>
          <SelectGroup {...args} selectedValue="talkpick" />
          <h3> 밸런스 게임 선택됨</h3>
          <SelectGroup {...args} selectedValue="balance" />
        </li>
      </ul>
    );
  },
};
