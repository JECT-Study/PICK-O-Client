import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchTalkPickResult from '@/components/organisms/SearchTalkPickResult/SearchTalkPickResult';
import { BrowserRouter } from 'react-router-dom';
import { SampleWhole } from '@/assets';
import type { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';

const SearchTalkPickItems: SearchTalkPickItemProps[] = Array.from(
  { length: 4 },
  (_, index) => ({
    title: `톡픽 ${index + 1} - 월클 정국 VS 존잘 차은우`,
    createdAt: '2024.08.26',
    content: '우하하우하하 내용입니다.',
    firstImgUrl: SampleWhole,
    keyword: '정국',
  }),
);

const meta: Meta<typeof SearchTalkPickResult> = {
  title: 'organisms/SearchTalkPickResult',
  component: SearchTalkPickResult,
  tags: ['autodocs'],
  args: {
    searchTalkPickList: SearchTalkPickItems,
    keyword: '정국',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SearchTalkPickResult {...args} />,
};
