import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import BalanceGameEndingSection from '@/components/mobile/organisms/BalanceGameEndingSection/BalanceGameEndingSection';

const meta: Meta<typeof BalanceGameEndingSection> = {
  title: 'mobile/organisms/BalanceGameEndingSection',
  component: BalanceGameEndingSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: '결정사 상대방 고르기',
    gameSetId: 3,
    isMyGame: false,
    isMyEndBookmark: false,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <BalanceGameEndingSection {...args} />
      </div>
    </div>
  ),
};
