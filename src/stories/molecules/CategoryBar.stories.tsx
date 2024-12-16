/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CategoryBar, {
  CategoryBarProps,
} from '@/components/molecules/CategoryBar/CategoryBar';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof CategoryBar> = {
  title: 'molecules/CategoryBar',
  component: CategoryBar,
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: { type: 'radio' },
      options: ['인기', '커플', '취향', '월드컵'],
    },
  },
  args: {
    activeTab: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<CategoryBarProps['activeTab']>(
      args.activeTab,
    );

    return (
      <CategoryBar
        {...args}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  },
};

export const All: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<CategoryBarProps['activeTab']>(
      args.activeTab,
    );
    console.log(activeTab);

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>Popular Tab</h3>
          <CategoryBar {...args} activeTab="" setActiveTab={setActiveTab} />
        </li>
        <li css={storyInnerContainer}>
          <h3>Couple Tab</h3>
          <CategoryBar {...args} activeTab="커플" setActiveTab={setActiveTab} />
        </li>
        <li css={storyInnerContainer}>
          <h3>Taste Tab</h3>
          <CategoryBar {...args} activeTab="취향" setActiveTab={setActiveTab} />
        </li>
        <li css={storyInnerContainer}>
          <h3>Worldcup Tab</h3>
          <CategoryBar
            {...args}
            activeTab="월드컵"
            setActiveTab={setActiveTab}
          />
        </li>
      </ul>
    );
  },
};
