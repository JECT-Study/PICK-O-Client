import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import OptionCard from '@/components/mobile/molecules/OptionCard/OptionCard';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof OptionCard> = {
  title: 'mobile/molecules/OptionCard',
  component: OptionCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'A',
    nameProps: {
      value: 'option',
    },
    descriptionProps: {
      value: 'description',
    },
    handleImgChange: () => {},
    handleDeleteImg: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => {
    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>A타입</h3>
          <OptionCard {...args} />
          <h3>B타입</h3>
          <OptionCard
            type="B"
            nameProps={{
              value: 'option',
            }}
            descriptionProps={{
              value: 'description',
            }}
            handleImgChange={() => {}}
            handleDeleteImg={() => {}}
          />
        </li>
      </ul>
    );
  },
};
