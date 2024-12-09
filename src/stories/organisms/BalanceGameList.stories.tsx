import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { SampleFirst, SampleSecond } from '@/assets';
import { MemoryRouter } from 'react-router-dom';
import { ToggleGroupValue } from '@/types/toggle';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

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
      options: [
        { field: 'views', order: 'desc' },
        { field: 'createdAt', order: 'desc' },
      ],
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
    const [selectedValue, setSelectedValue] = useState<ToggleGroupValue>({
      field: 'views',
      order: 'desc',
    });
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
    const [selectedValue, setSelectedValue] = useState<ToggleGroupValue>({
      field: 'views',
      order: 'desc',
    });
    const [activeTab, setActiveTab] = useState<
      '인기' | '커플' | '취향' | '월드컵'
    >('인기');

    const scenarios = [
      {
        title: '하나의 항목',
        contents: [
          {
            images: [SampleFirst, SampleSecond],
            id: 1,
            title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
            mainTag: '인기',
            subTag: '화제의 중심',
            bookmarkState: true,
          },
        ],
      },
      {
        title: '다수의 항목',
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
        ],
      },
      {
        title: '내용 없음',
        contents: [],
      },
    ];

    return (
      <MemoryRouter>
        <ul css={storyContainer} aria-label="밸런스 게임 시나리오 목록">
          {scenarios.map(({ title, contents }) => (
            <li css={storyInnerContainer} key={title}>
              <h2>{title}</h2>
              <BalanceGameList
                {...args}
                contents={contents}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </li>
          ))}
        </ul>
      </MemoryRouter>
    );
  },
};
