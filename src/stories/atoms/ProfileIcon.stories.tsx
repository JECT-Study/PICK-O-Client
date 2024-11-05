import React from 'react';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import { ProfileInfoSample } from '@/assets';

const meta = {
  title: 'atoms/ProfileIcon',
  component: ProfileIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    interaction: {
      options: ['default', 'custom'],
      control: { type: 'radio' },
    },
    imgUrl: { control: { type: 'text' } },
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' },
    },
  },
  args: {
    interaction: 'default',
    size: 'small',
  },
} satisfies Meta<typeof ProfileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>기본 Small</h3>
        <ProfileIcon {...args} interaction="default" size="small" />
        <h3>기본 Large</h3>
        <ProfileIcon {...args} interaction="default" size="large" />

        <h3>별도 img 있을때 Small</h3>
        <ProfileIcon
          interaction="custom"
          imgUrl={ProfileInfoSample}
          size="small"
        />
        <h3>별도 img 있을때 Large</h3>
        <ProfileIcon
          interaction="custom"
          imgUrl={ProfileInfoSample}
          size="large"
        />
      </li>
    </ul>
  ),
};
