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
  argTypes: {
    imgUrl: {
      control: 'text',
      description: '이미지 Url',
    },
    alt: {
      control: 'text',
      description: '이미지 Url 이 없을 시 대체 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgUrl: '',
    alt: '대체 텍스트',
  },
};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <PhotoBox alt="No image (default)" />
        <PhotoBox imgUrl={SampleFirst} alt="샘플 이미지" />
      </li>
    </ul>
  ),
};
