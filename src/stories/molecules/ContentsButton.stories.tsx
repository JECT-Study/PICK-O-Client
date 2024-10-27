import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import ContentsButton from '@/components/molecules/ContentsButton/ContentsButton';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof ContentsButton> = {
  title: 'molecules/ContentsButton',
  component: ContentsButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    mainTag: { control: 'text' },
    subTag: { control: 'text' },
    bookmarked: { control: 'boolean' },
    showBookmark: { control: 'boolean' },
    size: { control: { type: 'radio' }, options: ['large', 'small'] },
  },
  args: {
    title: '유진 VS 민지 사복 고르기',
    mainTag: '취향',
    subTag: '얼마나 맞나 보자',
    bookmarked: false,
    showBookmark: true,
    size: 'large',
    images: [SampleFirst, SampleSecond],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const headerStyle = css`
  margin-bottom: 20px;
`;

export const Default: Story = {
  args: {
    title: '유진 VS 민지 사복 고르기',
    mainTag: '취향',
    subTag: '얼마나 맞나 보자',
    bookmarked: false,
    showBookmark: true,
    size: 'large',
    images: [SampleFirst, SampleSecond],
  },
};

export const All: Story = {
  render: (args) => (
    <div css={containerStyle}>
      <div css={itemStyle}>
        <h3 css={headerStyle}>기본 (Large)</h3>
        <ContentsButton
          {...args}
          size="large"
          bookmarked={false}
          showBookmark
        />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>북마크 pressed (Large)</h3>
        <ContentsButton {...args} size="large" bookmarked showBookmark />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>북마크 없음 (Large)</h3>
        <ContentsButton {...args} size="large" showBookmark={false} />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>기본 (Small)</h3>
        <ContentsButton
          {...args}
          size="small"
          bookmarked={false}
          showBookmark
        />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>북마크 pressed (Small)</h3>
        <ContentsButton {...args} size="small" bookmarked showBookmark />
      </div>
      <div css={itemStyle}>
        <h3 css={headerStyle}>북마크 없음 (Small)</h3>
        <ContentsButton {...args} size="small" showBookmark={false} />
      </div>
    </div>
  ),
};
