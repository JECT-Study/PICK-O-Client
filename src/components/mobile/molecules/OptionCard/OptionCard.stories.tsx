import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import OptionCard from '@/components/mobile/molecules/OptionCard/OptionCard';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof OptionCard> = {
  title: 'mobile/molecules/OptionCard',
  component: OptionCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['A', 'B'],
      description: '선택지 유형',
    },
    title: {
      control: 'text',
      description: '제목',
    },
    subTitle: {
      control: 'text',
      description: '부가 설명',
    },
    imgUrl: {
      control: 'text',
      description: '이미지 URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'A',
    title: '',
    subTitle: '',
    imgUrl: '',
    onFileSelect: action('파일 선택'),
    onTitleChange: action('제목 변경'),
    onSubTitleChange: action('부가 설명 변경'),
  },
};

export const Filled: Story = {
  args: {
    type: 'B',
    title: '100억 부자',
    subTitle: '엄청 스윗한 사람꾼',
    imgUrl: 'https://via.placeholder.com/150',
    onFileSelect: action('파일 선택'),
    onTitleChange: action('제목 변경'),
    onSubTitleChange: action('부가 설명 변경'),
  },
};
