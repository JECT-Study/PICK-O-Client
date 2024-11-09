import SearchBar from '@/components/atoms/SearchBar/SearchBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearchClick: () => alert('검색 버튼이 눌러졌어요!!'),
    onInputChange: (e) => console.log('입력 값이 바뀜:', e.target.value),
  },
};
