/* eslint-disable no-alert */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameButton from '@/components/mobile/atoms/BalanceGameButton/BalanceGameButton';
import { SampleWhole } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/BalanceGameButton',
  component: BalanceGameButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#f1f1f1',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imgUrl: { control: 'text' },
    name: { control: 'text' },
    optionType: {
      control: { type: 'radio' },
      options: ['A', 'B'],
    },
    description: { control: 'text' },
    selectedButton: {
      control: 'radio',
      options: ['A', 'B', null],
    },
  },
  args: {
    imgUrl: SampleWhole,
    name: '제목은글자제한30자제목은글자제한30자제목은글자제한30자',
    optionType: 'A',
    description:
      '상황설명글자제한50상황설명글자제한50상황설명글자제한50상황설명글자제한50상황설명글자제한50',
    selectedButton: null,
    onClick: (optionType: 'A' | 'B') => alert(`Clicked ${optionType}`),
  },
} satisfies Meta<typeof BalanceGameButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Image</h3>
        <BalanceGameButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>No Image</h3>
        <BalanceGameButton {...args} imgUrl={null} />
      </li>
      <li css={storyInnerContainer}>
        <h3>Title Only</h3>
        <BalanceGameButton {...args} description="" imgUrl={null} />
      </li>
    </ul>
  ),
};
