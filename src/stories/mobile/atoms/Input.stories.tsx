import React from 'react';
import Input from '@/components/mobile/atoms/Input/Input';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/mobile/atoms/Button/Button';

const meta = {
  title: 'mobile/atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isError: { control: { type: 'boolean' } },
    errorMessage: { control: { type: 'text' } },
    isSuccess: { control: { type: 'boolean' } },
  },
  args: {
    isError: false,
    placeholder: 'placeholder',
    isSuccess: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isError: false,
    placeholder: 'placeholder',
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>btn</h3>
        <Input
          {...args}
          btn={<Button variant="outlineShadow">button</Button>}
        />
      </li>
      <li css={storyInnerContainer}>
        <h3>IsError and ErrorMessage</h3>
        <Input {...args} isError errorMessage="유효하지 않습니다." />
        <Input {...args} errorMessage="유효합니다." isSuccess />
      </li>
    </ul>
  ),
};
