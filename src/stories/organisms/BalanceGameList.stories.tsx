import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { SampleFirst, SampleSecond } from '@/assets';
import { MemoryRouter } from 'react-router-dom';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import MyBalanceGameList from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';

const meta: Meta<typeof BalanceGameList> = {
  title: 'organisms/BalanceGameList',
  component: BalanceGameList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    contents: {
      control: 'object',
    },
    selectedValue: {
      control: 'select',
      options: ['views', 'createdAt'],
    },
    activeTab: {
      control: 'select',
      options: ['인기', '커플', '취향', '월드컵'],
    },
  },
  args: {
    contents: [
      {
        images: [SampleFirst, SampleSecond],
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: true,
      },
      {
        images: [SampleFirst, SampleSecond],
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<'views' | 'createdAt'>(
      'views',
    );
    const [activeTab, setActiveTab] = useState<
      '인기' | '커플' | '취향' | '월드컵'
    >('인기');

    return (
      <MemoryRouter>
        <BalanceGameList
          {...args}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </MemoryRouter>
    );
  },
};
export const All: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<'views' | 'createdAt'>(
      'views',
    );
    const [activeTab, setActiveTab] = useState<
      '인기' | '커플' | '취향' | '월드컵'
    >('인기');

    return (
      <MemoryRouter>
        <ul css={storyContainer}>
          <li css={storyInnerContainer}>
            <h3>하나의 항목</h3>
            <BalanceGameList
              contents={[
                {
                  images: [SampleFirst, SampleSecond],
                  id: 1,
                  title:
                    '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
                  mainTag: '인기',
                  subTag: '화제의 중심',
                  bookmarkState: true,
                },
              ]}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </li>
          <li css={storyInnerContainer}>
            <h3>다수의 항목</h3>
            <BalanceGameList
              contents={[
                {
                  images: [SampleFirst, SampleSecond],
                  id: 1,
                  title:
                    '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
                  mainTag: '인기',
                  subTag: '화제의 중심',
                  bookmarkState: true,
                },
                {
                  images: [SampleFirst, SampleSecond],
                  id: 2,
                  title: '좌석 널널한 버스 2시간 등교 VS 자전거 30분 등교',
                  mainTag: '커플',
                  subTag: '선택의 고민',
                  bookmarkState: false,
                },
                {
                  images: [SampleFirst, SampleSecond],
                  id: 3,
                  title: '10년 후 퇴사 VS 당장 퇴사',
                  mainTag: '취향',
                  subTag: '고민의 순간',
                  bookmarkState: true,
                },
              ]}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </li>
          <li css={storyInnerContainer}>
            <h3>내용 없음</h3>
            <BalanceGameList
              contents={[]}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </li>
        </ul>
      </MemoryRouter>
    );
  },
};
