import React, { useState, ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ImageBoxButton from '@/components/atoms/ImageBoxButton/ImageBoxButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/ImageBoxButton',
  component: ImageBoxButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    imgUrl: { control: 'text', defaultValue: '' },
    onFileSelect: { action: 'file selected' },
    onDelete: { action: 'image deleted' },
  },
} satisfies Meta<typeof ImageBoxButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgUrl: '',
    onFileSelect: () => {},
    onDelete: () => {},
  },
};

export const All: Story = {
  render: () => {
    const [imgUrl, setImgUrl] = useState<string>('');

    const handleImageUpload = (file: File) => {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    };

    const handleImageDelete = () => {
      setImgUrl('');
    };

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>기본 상태 - 핸들러 제외</h3>
          <ImageBoxButton
            imgUrl=""
            onFileSelect={() => {}}
            onDelete={() => {}}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>이미지 업로드 및 삭제 테스트</h3>
          <ImageBoxButton
            imgUrl={imgUrl}
            onFileSelect={handleImageUpload}
            onDelete={handleImageDelete}
          />
        </li>
      </ul>
    );
  },
  args: {
    imgUrl: '',
    onFileSelect: () => {},
  },
};
