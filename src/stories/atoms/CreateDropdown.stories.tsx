/* eslint-disable no-console */
import CreateDropdown from '@/components/atoms/CreateDropdown/CreateDropdown';
import { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import type { Meta, StoryObj } from '@storybook/react';

const optionData: MenuItem[] = [
  {
    label: '톡픽 만들기',
    onClick: () => {
      console.log('클릭됨!!');
    },
  },
  {
    label: '밸런스게임 만들기',
    onClick: () => {
      console.log('클릭됨!!');
    },
  },
];

const meta = {
  title: 'atoms/CreateDropdown',
  component: CreateDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    optionData,
  },
} satisfies Meta<typeof CreateDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
