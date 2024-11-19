/* eslint-disable no-alert */
import type { Meta, StoryObj } from '@storybook/react';
import SearchTalkPickItem from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';
import { SampleWhole } from '@/assets';

const meta = {
  title: 'atoms/SearchTalkPickItem',
  component: SearchTalkPickItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: '월클 정국 VS 존잘 차은우',
    createdAt: '2024.08.26',
    content:
      '우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하',
    firstImgUrl: SampleWhole,
  },
} satisfies Meta<typeof SearchTalkPickItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
