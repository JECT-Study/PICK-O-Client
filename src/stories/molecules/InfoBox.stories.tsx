import React from 'react';
import InfoBox from '@/components/molecules/InfoBox/InfoBox';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof InfoBox> = {
  title: 'molecules/InfoBox',
  component: InfoBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: { type: 'text' } },
    prefix: { control: { type: 'text' } },
    commentContent: { control: { type: 'text' } },
    commentCount: { control: { type: 'number' } },
    bookmarks: { control: { type: 'number' } },
    onClick: { action: '클릭 이벤트 발생' },
  },
  args: {
    title: '맨날 야근 월급 500 대기업 VS 주4일 월급 250 칼퇴근 중소',
    prefix: '내 선택',
    commentContent: '맨날 야근 월급 500 대기업',
    commentCount: 172,
    bookmarks: 172,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '맨날 야근 월급 500 대기업 VS 주4일 월급 250 칼퇴근 중소',
    prefix: '내 선택',
    commentContent: '맨날 야근 월급 500 대기업',
    commentCount: 172,
    bookmarks: 172,
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <InfoBox
          {...args}
          title="맨날 야근 월급 500 대기업 VS 주4일 월급 250 칼퇴근 중소"
          prefix="내 선택"
          commentContent="맨날 야근 월급 500 대기업"
          commentCount={172}
          bookmarks={172}
        />
      </li>
      <li css={storyInnerContainer}>
        <InfoBox
          {...args}
          title="유진 사복 패션 VS 민지 사복 패션"
          prefix="내 선택"
          commentContent="유진 사복 패션"
          commentCount={250}
          bookmarks={100}
        />
      </li>
    </ul>
  ),
};
