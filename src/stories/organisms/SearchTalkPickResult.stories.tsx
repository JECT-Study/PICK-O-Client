import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchTalkPickResult from '@/components/organisms/SearchTalkPickResult/SearchTalkPickResult';
import { SampleWhole } from '@/assets';
import { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';

const SearchTalkPickItems: SearchTalkPickItemProps[] = Array.from(
  { length: 4 },
  (_, index) => ({
    title: `톡픽 ${index + 1} - 월클 정국 VS 존잘 차은우`,
    date: '2024.08.26',
    content: '우하하우하하 내용입니다.',
    imgUrl: SampleWhole,
  }),
);

const meta = {
  title: 'organisms/SearchTalkPickResult',
  component: SearchTalkPickResult,
  tags: ['autodocs'],
  args: {
    searchTalkPickList: SearchTalkPickItems,
  },
} satisfies Meta<typeof SearchTalkPickResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SearchTalkPickResult {...args} />,
};
