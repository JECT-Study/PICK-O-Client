import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import SelectGroup from '@/components/mobile/atoms/SelectGroup/SelectGroup';

const meta = {
  title: 'mobile/atoms/SelectGroup',
  component: SelectGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    ],
    selectedValue: 'talkpick',
  },
};

export const All: Story = {
  args: {
    items: [
      { label: '톡픽', value: 'talkpick' },
      { label: '밸런스 게임', value: 'balance' },
    ],
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
