import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GameNavigationSection from '@/components/molecules/GameNavigationSection/GameNavigationSection';
import { storyContainer } from '@/stories/story.styles';

const meta: Meta<typeof GameNavigationSection> = {
  title: 'molecules/GameNavigationSection',
  component: GameNavigationSection,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentStage: {
      control: { type: 'number', min: 0, max: 9 },
      defaultValue: 0,
    },
    totalStage: {
      control: { type: 'number', min: 1, max: 10 },
      defaultValue: 10,
    },
    handleNextClick: { action: 'next stage' },
    handlePrevClick: { action: 'previous stage' },
    handleCompleteClick: { action: 'complete stage' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStage: 0,
    totalStage: 10,
    handleNextClick: () => {},
    handlePrevClick: () => {},
    handleCompleteClick: () => {},
  },
};

export const all: Story = {
  render: (args) => {
    const [currentStage, setCurrentStage] = useState(0);
    const totalStage = args.totalStage ?? 10;

    const handleNextClick = () => {
      if (currentStage < totalStage - 1) {
        setCurrentStage((prev) => prev + 1);
      }
    };

    const handlePrevClick = () => {
      if (currentStage > 0) {
        setCurrentStage((prev) => prev - 1);
      }
    };

    const handleCompleteClick = () => {
      console.log('제작 완료!');
    };

    return (
      <div css={storyContainer}>
        <GameNavigationSection
          currentStage={currentStage}
          totalStage={totalStage}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          handleCompleteClick={handleCompleteClick}
        />
      </div>
    );
  },
};
