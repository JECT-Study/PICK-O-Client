import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameOptionCard from '@/components/molecules/BalanceGameOptionCard/BalanceGameOptionCard';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof BalanceGameOptionCard> = {
  title: 'molecules/BalanceGameOptionCard',
  component: BalanceGameOptionCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    imgUrl: { control: { type: 'text' }, defaultValue: '' },
    onImageChange: { action: 'file selected' },
    onImageDelete: { action: 'image deleted' },
    option: {
      control: { type: 'radio' },
      options: ['A', 'B'],
      defaultValue: 'A',
    },
  },
} satisfies Meta<typeof BalanceGameOptionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    option: 'A',
    imgUrl: '',
    onImageChange: () => {},
    onImageDelete: () => {},
  },
};

export const All: Story = {
  args: {
    option: 'A',
    imgUrl: '',
    onImageChange: () => {},
  },
  render: (args) => {
    const [imgUrlA, setImgUrlA] = useState<string>('');
    const [imgUrlB, setImgUrlB] = useState<string>('');

    const handleImageAChange = (file: File) => {
      const url = URL.createObjectURL(file);
      setImgUrlA(url);
    };

    const handleImageBChange = (file: File) => {
      const url = URL.createObjectURL(file);
      setImgUrlB(url);
    };

    const handleImageADelete = () => {
      setImgUrlA('');
    };

    const handleImageBDelete = () => {
      setImgUrlB('');
    };

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>옵션 A - 기본 상태</h3>
          <BalanceGameOptionCard
            {...args}
            option="A"
            imgUrl=""
            onImageChange={handleImageAChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 A - 이미지 업로드</h3>
          <BalanceGameOptionCard
            {...args}
            option="A"
            imgUrl={imgUrlA}
            onImageChange={handleImageAChange}
            onImageDelete={handleImageADelete}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 A - 서버 이미지</h3>
          <BalanceGameOptionCard
            {...args}
            option="A"
            imgUrl="https://picko-image.s3.ap-northeast-2.amazonaws.com/talk-pick/9b4856fe-b624-4e54-ad80-a94e083301d2_czz.png"
            onImageChange={handleImageAChange}
            onImageDelete={handleImageADelete}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 B - 기본 상태</h3>
          <BalanceGameOptionCard
            {...args}
            option="B"
            imgUrl=""
            onImageChange={handleImageBChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 B - 이미지 업로드</h3>
          <BalanceGameOptionCard
            {...args}
            option="B"
            imgUrl={imgUrlB}
            onImageChange={handleImageBChange}
            onImageDelete={handleImageBDelete}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 B - 서버 이미지</h3>
          <BalanceGameOptionCard
            {...args}
            option="B"
            imgUrl="https://picko-image.s3.ap-northeast-2.amazonaws.com/talk-pick/9b4856fe-b624-4e54-ad80-a94e083301d2_czz.png"
            onImageChange={handleImageBChange}
            onImageDelete={handleImageBDelete}
          />
        </li>
      </ul>
    );
  },
};
