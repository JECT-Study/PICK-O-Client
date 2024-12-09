import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/mobile/atoms/Button/Button';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['large', 'medium'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'roundPrimary'],
      control: { type: 'radio' },
    },
    active: { control: 'boolean' },
    children: { control: { type: 'text' } },
  },
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h1>Primary</h1>
        <Button size="large" variant="primary">
          large
        </Button>
        <Button size="medium" variant="primary">
          medium
        </Button>
        <h1>roundPrimary</h1>
        <Button size="large" variant="roundPrimary">
          large
        </Button>
      </li>
      <li css={storyInnerContainer}>
        <h1>disabled</h1>
        <Button size="large" variant="primary" active={false}>
          primary
        </Button>
        <Button size="large" variant="roundPrimary" active={false}>
          roundPrimary
        </Button>
      </li>
    </ul>
  ),
};
