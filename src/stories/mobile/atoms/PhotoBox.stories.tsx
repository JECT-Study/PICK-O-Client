import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PhotoBox from '@/components/mobile/atoms/PhotoBox/PhotoBox';
import { SampleFirst } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof PhotoBox> = {
  title: 'mobile/atoms/PhotoBox',
  component: PhotoBox,
  parameters: {
    layout: 'centered',
  },
  args: {
    alt: 'photoBox alt',
    optionId: 0,
    handleImageChange: () => {},
    handleDeleteImg: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <PhotoBox {...args} />
        <PhotoBox imgUrl={SampleFirst} {...args} />
      </li>
    </ul>
  ),
};
