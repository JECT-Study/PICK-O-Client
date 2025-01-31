import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TopBanner from '@/components/molecules/TopBanner/TopBanner';
import type { Meta, StoryObj } from '@storybook/react';
import {
  todayBalanceGameDummyData,
  todayTalkPickDummyData,
} from '@/mocks/data/banner';

const meta = {
  title: 'molecules/TopBanner',
  component: TopBanner,
  args: {
    todayTalkPickList: todayTalkPickDummyData,
    todayBalanceGameList: todayBalanceGameDummyData,
  },
  decorators: [
    (Story) => (
      <Router>
        <div style={{ width: '1500px' }}>
          <Story />
        </div>
      </Router>
    ),
  ],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
