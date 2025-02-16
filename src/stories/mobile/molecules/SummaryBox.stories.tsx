import React from 'react';
import SummaryBox from '@/components/mobile/molecules/SummaryBox/SummaryBox';
import { TalkPickSummary } from '@/types/talk-pick';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const defaultSummary: TalkPickSummary = {
  summaryFirstLine: 'first summary line',
  summarySecondLine: 'second summary line',
  summaryThirdLine: 'third summary line',
};

const exampleSummary: TalkPickSummary = {
  summaryFirstLine: '남친이 어쩌고 저쩌고 잘못했네 안했네 대충 더미글',
  summarySecondLine: '남친이 친구 새우 껍질을 어쩌고 저쩌고 뭐라뭐라',
  summaryThirdLine: '나 너무 속상한데 이걸 찬성해 말어',
};

const meta = {
  title: 'mobile/molecules/SummaryBox',
  component: SummaryBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    summary: defaultSummary,
    summaryStatus: 'SUCCESS',
  },
} satisfies Meta<typeof SummaryBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>SUCCESS</h3>
        <SummaryBox summary={exampleSummary} summaryStatus="SUCCESS" />
      </li>
      <li css={storyInnerContainer}>
        <h3>PENDING</h3>
        <SummaryBox summaryStatus="PENDING" />
      </li>
      <li css={storyInnerContainer}>
        <h3>NOT_REQUIRED</h3>
        <SummaryBox summaryStatus="NOT_REQUIRED" />
      </li>
      <li css={storyInnerContainer}>
        <h3>FAIL</h3>
        <SummaryBox summaryStatus="FAIL" />
      </li>
    </ul>
  ),
};
