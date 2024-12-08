import React, { useState } from 'react';
import ToggleGroup from '@/components/atoms/ToggleGroup/ToggleGroup';
import { ToggleGroupItem, ToggleGroupProps } from '@/types/toggle';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const toggleOneTwo: ToggleGroupItem[] = [
  {
    label: 'ONE',
    value: { field: 'one', order: 'asc' },
  },
  {
    label: 'TWO',
    value: { field: 'two', order: 'desc' },
  },
];

const toggleItem: ToggleGroupItem[] = [
  {
    label: '인기순',
    value: { field: 'views', order: 'desc' },
  },
  {
    label: '최신순',
    value: { field: 'createdAt', order: 'desc' },
  },
];

const meta = {
  title: 'atoms/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedValue: {
      options: toggleOneTwo.map((item) => item.value.field),
      control: { type: 'radio' },
    },
  },
  args: {
    items: toggleOneTwo,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: toggleOneTwo,
    selectedValue: toggleOneTwo[0].value,
  },
};

export const All: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<
      ToggleGroupProps['selectedValue']
    >({ field: 'views', order: 'desc' });

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>Toggle</h3>
          <ToggleGroup
            items={toggleItem}
            selectedValue={selectedValue}
            onClick={setSelectedValue}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>Trend</h3>
          <ToggleGroup selectedValue={{ field: 'views', order: 'desc' }} />
          <h3>Recent</h3>
          <ToggleGroup selectedValue={{ field: 'createdAt', order: 'desc' }} />
        </li>
      </ul>
    );
  },
};
