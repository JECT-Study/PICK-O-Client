import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginButton from '@/components/atoms/SocialLoginButton/SocialLoginButton';
import { storyContainer, storyInnerRowContainer } from '@/stories/story.styles';

const meta: Meta<typeof SocialLoginButton> = {
  title: 'atoms/SocialLoginButton',
  component: SocialLoginButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['kakao', 'google', 'naver'],
      control: { type: 'radio' },
    },
    size: {
      options: ['medium', 'small'],
      control: { type: 'radio' },
    },
    recent: { control: { type: 'boolean' } },
  },
  args: {
    variant: 'kakao',
    recent: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <h3>Medium</h3>
      <li css={storyInnerRowContainer}>
        <SocialLoginButton {...args} />
        <SocialLoginButton variant="google" />
        <SocialLoginButton variant="naver" />
      </li>
      <h3>Small</h3>
      <li css={storyInnerRowContainer}>
        <SocialLoginButton {...args} size="small" />
        <SocialLoginButton variant="google" size="small" />
        <SocialLoginButton variant="naver" size="small" />
      </li>
    </ul>
  ),
};
