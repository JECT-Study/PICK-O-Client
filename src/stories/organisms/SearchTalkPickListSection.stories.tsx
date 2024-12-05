import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchTalkPickListSection from '@/components/organisms/SearchTalkPickListSection/SearchTalkPickListSection';
import { SampleWhole } from '@/assets';
import { SearchTalkPickItemProps } from '@/components/atoms/SearchTalkPickItem/SearchTalkPickItem';

const meta: Meta<typeof SearchTalkPickListSection> = {
  title: 'organisms/SearchTalkPickListSection',
  component: SearchTalkPickListSection,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPageChange: { action: '페이지 변경' },
    onSortChange: { action: '정렬 변경' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const searchTalkPickSample: SearchTalkPickItemProps[] = Array.from(
  { length: 20 },
  (_, index) => ({
    title: `톡픽 ${index + 1} - 인기 순위`,
    createdAt: '2024.08.26',
    content:
      '우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하',
    firstImgUrl: SampleWhole,
    keyword: '인기',
  }),
);

export const Default: Story = {
  args: {
    searchTalkPickList: searchTalkPickSample.slice(0, 10),
    keyword: '예시 키워드',
    selectedPage: 1,
    totalPages: 2,
    sort: { field: 'views', order: 'desc' },
  },
};

export const All: Story = {
  render: (args) => {
    const [sort, setSort] = useState<{ field: string; order: 'asc' | 'desc' }>({
      field: 'views',
      order: 'desc',
    });

    const handleSortChange = (newSort: {
      field: string;
      order: 'asc' | 'desc';
    }) => {
      setSort(newSort);
      args.onSortChange?.(newSort);
    };

    return (
      <>
        <div style={{ marginBottom: '40px' }}>
          <h3>1페이지</h3>
          <SearchTalkPickListSection
            {...args}
            searchTalkPickList={searchTalkPickSample.slice(0, 10)}
            totalPages={2}
            selectedPage={1}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </div>
        <div>
          <h3>2페이지</h3>
          <SearchTalkPickListSection
            {...args}
            searchTalkPickList={searchTalkPickSample.slice(10, 20)}
            totalPages={2}
            selectedPage={2}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </div>
      </>
    );
  },
};
