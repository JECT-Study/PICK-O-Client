import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ChoiceInputButton from '@/components/atoms/ChoiceInputButton/ChoiceInputButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof ChoiceInputButton> = {
  title: 'atoms/ChoiceInputButton',
  component: ChoiceInputButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    option: {
      options: ['A', 'B'],
      control: { type: 'radio' },
    },
    clearInput: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>A ChoiceInputButton</h3>
        <ChoiceInputButton option="A" />
      </li>
      <li css={storyInnerContainer}>
        <h3>B ChoiceInputButton</h3>
        <ChoiceInputButton option="B" />
      </li>
    </ul>
  ),
};
