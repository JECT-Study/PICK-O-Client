import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ImageUploadButton from '@/components/atoms/ImageUploadButton/ImageUploadButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/ImageUploadButton',
  component: ImageUploadButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageCount: { control: { type: 'number', min: 0, max: 10 } },
  },
  args: {
    imageCount: 1,
    setImgUrls: () => {},
    fileIds: [],
    setFileIds: () => {},
    setIsUploadingImage: () => {},
    setNewFileIds: () => {},
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Story />
        </ReactQueryProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ImageUploadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>ImageCount 1</h3>
        <ImageUploadButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>ImageCount 10</h3>
        <ImageUploadButton
          imageCount={10}
          setImgUrls={() => {}}
          fileIds={[]}
          setFileIds={() => {}}
          setIsUploadingImage={() => {}}
          setNewFileIds={() => {}}
        />
      </li>
    </ul>
  ),
};
