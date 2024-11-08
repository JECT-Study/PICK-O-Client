import SearchTagBar from '@/components/molecules/SearchTagBar/SearchTagBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/SearchTagBar',
  component: SearchTagBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchTagBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (query: string) => alert(`${query} 검색어로 검색 실행됨!`),
  },
};
