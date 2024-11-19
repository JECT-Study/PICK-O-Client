import React from 'react';
import { Envelope } from '@/assets';
import Input from '@/components/atoms/Input/Input';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['medium', 'small', 'large'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['default'],
      control: { type: 'radio' },
    },
    label: { control: { type: 'text' } },
    isError: { control: { type: 'boolean' } },
    errorMessage: { control: { type: 'text' } },
  },
  args: {
    variant: 'default',
    size: 'medium',
    isError: false,
    placeholder: 'placeholder',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    isError: false,
    placeholder: 'placeholder',
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Size</h3>
        <Input {...args} placeholder="medium" />
        <Input {...args} size="small" placeholder="small" />
        <Input {...args} size="large" placeholder="large" />
      </li>
      <li css={storyInnerContainer}>
        <h3>Variant</h3>
        <Input {...args} placeholder="default" />
      </li>
      <li css={storyInnerContainer}>
        <h3>Icon</h3>
        <Input {...args} icon={<Envelope />} />
      </li>
      <li css={storyInnerContainer}>
        <h3>Label</h3>
        <Input {...args} label="이메일" />
      </li>
      <li css={storyInnerContainer}>
        <h3>Btn</h3>
        <Input {...args} btn={<Envelope />} />
      </li>
      <li css={storyInnerContainer}>
        <h3>IsError and ErrorMessage</h3>
        <Input {...args} isError errorMessage="유효하지 않습니다." />
        <Input {...args} errorMessage="유효합니다." />
      </li>
    </ul>
  ),
};
