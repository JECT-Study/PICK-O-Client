import React from 'react';
import SummaryItem from '@/components/mobile/atoms/SummaryItem/SummaryItem';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/SummaryItem',
  component: SummaryItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    itemNumber: {
      options: ['1', '2', '3'],
      control: { type: 'radio' },
    },
    children: { control: { type: 'text' } },
  },
  args: {
    itemNumber: '1',
    children: 'Summary Item',
  },
} satisfies Meta<typeof SummaryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Summary Item</h3>
        <SummaryItem itemNumber="1">
          남친이 어쩌고 저쩌고 잘못했네 안했네 대충 더미글
        </SummaryItem>
        <SummaryItem itemNumber="2">
          남친이 친구 새우 껍질을 어쩌고 저쩌고 뭐라뭐라
        </SummaryItem>
        <SummaryItem itemNumber="3">
          나 너무 속상한데 이걸 찬성해 말어
        </SummaryItem>
      </li>
    </ul>
  ),
};
