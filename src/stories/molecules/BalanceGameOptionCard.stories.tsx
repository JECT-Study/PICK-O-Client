import React, { useState, ChangeEvent } from 'react';
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
    imageFile: { control: { type: 'file' }, defaultValue: null },
    imgUrl: { control: { type: 'text' }, defaultValue: '' },
    onImageChange: { action: 'file selected' },
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
    imageFile: null,
    imgUrl: '',
    onImageChange: () => {},
  },
};

export const All: Story = {
  args: {
    option: 'A',
    imageFile: null,
    imgUrl: '',
    onImageChange: () => {},
  },
  render: (args) => {
    const [imageA, setImageA] = useState<File | null>(null);
    const [imageB, setImageB] = useState<File | null>(null);

    const handleImageAChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageA(file);
      }
    };

    const handleImageBChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageB(file);
      }
    };

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>옵션 A - 기본 상태</h3>
          <BalanceGameOptionCard
            {...args}
            option="A"
            imageFile={null}
            imgUrl=""
            onImageChange={handleImageAChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 A - 이미지 업로드</h3>
          <BalanceGameOptionCard
            {...args}
            option="A"
            imageFile={imageA}
            imgUrl=""
            onImageChange={handleImageAChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 A - 서버 이미지</h3>
          <BalanceGameOptionCard
            {...args}
            option="A"
            imageFile={null}
            imgUrl="https://picko-image.s3.ap-northeast-2.amazonaws.com/talk-pick/9b4856fe-b624-4e54-ad80-a94e083301d2_czz.png"
            onImageChange={handleImageAChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 B - 기본 상태</h3>
          <BalanceGameOptionCard
            {...args}
            option="B"
            imageFile={null}
            imgUrl=""
            onImageChange={handleImageBChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 B - 이미지 업로드</h3>
          <BalanceGameOptionCard
            {...args}
            option="B"
            imageFile={imageB}
            imgUrl=""
            onImageChange={handleImageBChange}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>옵션 B - 서버 이미지</h3>
          <BalanceGameOptionCard
            {...args}
            option="B"
            imageFile={null}
            imgUrl="https://picko-image.s3.ap-northeast-2.amazonaws.com/talk-pick/9b4856fe-b624-4e54-ad80-a94e083301d2_czz.png"
            onImageChange={handleImageBChange}
          />
        </li>
      </ul>
    );
  },
};
