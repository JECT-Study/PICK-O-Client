import React, { useState } from 'react';
import SearchResultBar from '@/components/molecules/SearchResultBar/SearchResultBar';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'molecules/SearchResultBar',
  component: SearchResultBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedValue: {
      options: ['all', 'talkpick', 'game'],
      control: { type: 'radio' },
    },
  },
  args: {
    selectedValue: 'all',
  },
} satisfies Meta<typeof SearchResultBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedValue: 'all',
    onSearch: (query) => console.log(`검색어: ${query}`),
    onClick: (value) => console.log(`선택된 태그: ${value}`),
  },
};

export const All: Story = {
  args: {
    selectedValue: 'all',
    onSearch: (query) => console.log(`검색어: ${query}`),
    onClick: (value) => console.log(`선택된 태그: ${value}`),
  },

  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<
      'all' | 'talkpick' | 'game'
    >('all');
    const [searchQuery, setSearchQuery] = useState('예시 키워드');

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>검색어와 선택된 태그가 바뀜</h3>
          <SearchResultBar
            {...args}
            selectedValue={selectedValue}
            onClick={(value) => {
              setSelectedValue(value);
              console.log(`선택된 태그: ${value}`);
            }}
            onSearch={(query) => {
              setSearchQuery(query);
              console.log(`검색어: ${query}`);
            }}
          />
          <p>현재 검색어: {searchQuery}</p>
          <p>선택된 태그: {selectedValue}</p>
        </li>
      </ul>
    );
  },
};
