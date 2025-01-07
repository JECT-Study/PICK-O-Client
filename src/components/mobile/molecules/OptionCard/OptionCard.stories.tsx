import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import OptionCard from '@/components/mobile/molecules/OptionCard/OptionCard';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

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
      description: '선택지 유형 (A 또는 B)',
    },
    title: {
      control: 'text',
      description: '선택지 제목',
    },
    subTitle: {
      control: 'text',
      description: '선택지 부가 설명',
    },
    imgUrl: {
      control: 'text',
      description: '선택지 이미지 URL',
    },
    onFileSelect: { action: 'onFileSelect', description: '이미지 선택 이벤트' },
    onTitleChange: { action: 'onTitleChange', description: '제목 변경 이벤트' },
    onSubTitleChange: {
      action: 'onSubTitleChange',
      description: '부가 설명 변경 이벤트',
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
  },
};

export const All: Story = {
  render: () => {
    const [titleA, setTitleA] = useState('');
    const [subTitleA, setSubTitleA] = useState('');
    const [titleB, setTitleB] = useState('');
    const [subTitleB, setSubTitleB] = useState('');

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>A타입</h3>
          <OptionCard
            type="A"
            title={titleA}
            subTitle={subTitleA}
            imgUrl=""
            onFileSelect={(file) => console.log('A 이미지 선택:', file)}
            onTitleChange={(newTitle) => setTitleA(newTitle)}
            onSubTitleChange={(newSubTitle) => setSubTitleA(newSubTitle)}
          />
          <h3>B타입</h3>
          <OptionCard
            type="B"
            title={titleB}
            subTitle={subTitleB}
            imgUrl=""
            onFileSelect={(file) => console.log('B 이미지 선택:', file)}
            onTitleChange={(newTitle) => setTitleB(newTitle)}
            onSubTitleChange={(newSubTitle) => setSubTitleB(newSubTitle)}
          />
        </li>
      </ul>
    );
  },
};
