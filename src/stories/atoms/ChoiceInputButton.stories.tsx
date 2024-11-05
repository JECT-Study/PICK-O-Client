import React, { useState } from 'react';
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
    resetInfoInput: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ChoiceInputButton {...args} />,
};

export const All: Story = {
  render: () => {
    const [resetInfoA, setResetInfoA] = useState(false);
    const [resetInfoB, setResetInfoB] = useState(false);

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>A 선택지</h3>
          <ChoiceInputButton
            option="A"
            resetInfoInput={resetInfoA}
            choiceInputProps={{
              placeholder: 'A 선택지를 입력하세요.',
              value: '',
              onChange: () => setResetInfoA(false),
            }}
            infoInputProps={{
              placeholder: '해당 선택지에 대해 추가로 설명을 입력할 수 있어요!',
              value: '',
            }}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>B 선택지</h3>
          <ChoiceInputButton
            option="B"
            resetInfoInput={resetInfoB}
            choiceInputProps={{
              placeholder: 'B 선택지를 입력하세요.',
              value: '',
              onChange: () => setResetInfoB(false),
            }}
            infoInputProps={{
              placeholder: '해당 선택지에 대해 추가로 설명을 입력할 수 있어요!',
              value: '',
            }}
          />
        </li>
      </ul>
    );
  },
};
