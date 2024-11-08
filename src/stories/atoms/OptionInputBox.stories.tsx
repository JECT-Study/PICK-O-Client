import React, { useState } from 'react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import type { Meta, StoryObj } from '@storybook/react';
import OptionInputBox from '@/components/atoms/OptionInputBox/OptionInputBox';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/OptionInputBox',
  component: OptionInputBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    option: { control: { type: 'radio' }, options: ['A', 'B'] },
  },
  args: {
    option: 'A',
    value: '',
    onChange: () => {},
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Router>
            <Story />
          </Router>
        </ReactQueryProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof OptionInputBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => {
    const [optionA, setOptionA] = useState<string>('');
    const [optionB, setOptionB] = useState<string>('');

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>Option A</h3>
          <OptionInputBox
            option="A"
            value={optionA}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOptionA(e.target.value)
            }
          />
          <h3>Option B</h3>
          <OptionInputBox
            option="B"
            value={optionB}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOptionB(e.target.value)
            }
          />
        </li>
      </ul>
    );
  },
};
