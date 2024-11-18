import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { SampleFirst, SampleSecond } from '@/assets';
import { MemoryRouter } from 'react-router-dom';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof MyBalanceGameList> = {
  title: 'organisms/MyBalanceGameList',
  component: MyBalanceGameList,
  argTypes: {
    items: {
      control: { type: 'object' },
    },
  },
  args: {
    items: [
      {
        gameId: 1,
        editedAt: '2024.08.06',
        title: '유진 사복 패션 VS 민지 사복 패션',
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        mainTagName: '인기',
        subTag: '화제의 중심',
        showBookmark: true,
        bookmarked: false,
      },
      {
        gameId: 2,
        editedAt: '2024.08.06',
        title: '유진 사복 패션 VS 민지 사복 패션',
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        mainTagName: '인기',
        subTag: '화제의 중심',
        showBookmark: true,
        bookmarked: true,
      },
      {
        gameId: 3,
        editedAt: '2024.08.05',
        title: '유진 사복 패션 VS 민지 사복 패션',
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        mainTagName: '인기',
        subTag: '화제의 중심',
        showBookmark: false,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <MyBalanceGameList {...args} />
    </MemoryRouter>
  ),
};

export const All: Story = {
  render: (args) => (
    <MemoryRouter>
      <div css={storyContainer}>
        <div css={storyInnerContainer}>
          <h3>2024.08.06</h3>
          <MyBalanceGameList
            {...args}
            items={[
              {
                gameId: 1,
                editedAt: '2024.08.06',
                title: '유진 사복 패션 VS 민지 사복 패션',
                optionAImg: SampleFirst,
                optionBImg: SampleSecond,
                mainTagName: '인기',
                subTag: '화제의 중심',
                showBookmark: true,
                bookmarked: false,
              },
              {
                gameId: 2,
                editedAt: '2024.08.06',
                title: '유진 사복 패션 VS 민지 사복 패션',
                optionAImg: SampleFirst,
                optionBImg: SampleSecond,
                mainTagName: '인기',
                subTag: '화제의 중심',
                showBookmark: true,
                bookmarked: true,
              },
            ]}
          />
        </div>
        <div css={storyInnerContainer}>
          <h3>2024.08.05</h3>
          <MyBalanceGameList
            {...args}
            items={[
              {
                gameId: 3,
                editedAt: '2024.08.05',
                title: '유진 사복 패션 VS 민지 사복 패션',
                optionAImg: SampleFirst,
                optionBImg: SampleSecond,
                mainTagName: '인기',
                subTag: '화제의 중심',
                showBookmark: false,
              },
              {
                gameId: 4,
                editedAt: '2024.08.05',
                title: '유진 사복 패션 VS 민지 사복 패션',
                optionAImg: SampleFirst,
                optionBImg: SampleSecond,
                mainTagName: '인기',
                subTag: '화제의 중심',
                showBookmark: true,
                bookmarked: true,
              },
            ]}
          />
        </div>
      </div>
    </MemoryRouter>
  ),
};
