import React from 'react';
import VoteToggle from '@/components/mobile/molecules/VoteToggle/VoteToggle';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { setToken } from '@/store/auth';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/molecules/VoteToggle',
  component: VoteToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    talkPickId: { control: 'number' },
    leftButtonText: { control: 'text' },
    rightButtonText: { control: 'text' },
  },
  args: {
    talkPickId: 1,
    leftButtonText: '상관없다다다다다다',
    rightButtonText: '상관 있다',
    selectedVote: null,
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
} satisfies Meta<typeof VoteToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: () => {
    store.dispatch(setToken('accessToken'));
  },
};

export const All: Story = {
  play: () => {
    store.dispatch(setToken('accessToken'));
  },
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Defult</h3>
        <VoteToggle {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>A Selected</h3>
        <VoteToggle {...args} selectedVote="A" />
      </li>
      <li css={storyInnerContainer}>
        <h3>B Selected</h3>
        <VoteToggle {...args} selectedVote="B" />
      </li>
    </ul>
  ),
};
