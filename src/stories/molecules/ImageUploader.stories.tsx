import React from 'react';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { OctopusProfile, JellyfishProfile, EelProfile } from '@/assets';
import ImageUploader from '@/components/molecules/ImageUploader/ImageUploader';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    imgUrls: [OctopusProfile, JellyfishProfile, EelProfile],
    setImgUrls: () => {},
    fileIds: [1, 2, 3],
    setFileIds: () => {},
    setIsUploadingImage: () => {},
    isEditing: false,
    isTempLoaded: false,
    setNewFileIds: () => {},
    setDeleteFileIds: () => {},
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
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
