import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateGroupedCard, {
  DateGroupedCardProps,
} from '@/components/mobile/organisms/DateGroupedCard/DateGroupedCard';
import { MobileCardSampleFirst, MobileCardSampleSecond } from '@/assets';
import { storyContainer } from '@/stories/story.styles';

const sampleItems: DateGroupedCardProps['items'] = [
  {
    id: '1',
    title: '첫 번째 콘텐츠',
    mainTag: 'Tag1',
    subTag: 'Sub1',
    images: [MobileCardSampleFirst, MobileCardSampleSecond],
    onClick: () => {},
  },
  {
    id: '2',
    title: '두 번째 콘텐츠',
    mainTag: 'Tag2',
    subTag: 'Sub2',
    images: [MobileCardSampleFirst, MobileCardSampleSecond],
    onClick: () => {},
  },
  {
    id: '3',
    title: '세 번째 콘텐츠',
    mainTag: 'Tag3',
    subTag: 'Sub3',
    images: [MobileCardSampleFirst, MobileCardSampleSecond],
    onClick: () => {},
  },
];

const meta: Meta<typeof DateGroupedCard> = {
  title: 'mobile/organisms/DateGroupedCard',
  component: DateGroupedCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    date: {
      control: 'text',
      description: '날짜를 나타냅니다.',
    },
    items: {
      control: 'object',
      description: 'ContentsButton 배열을 포함하는 리스트 항목들입니다.',
    },
  },
  args: {
    date: '2025-02-25',
    items: sampleItems,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '2025-02-25',
    items: sampleItems,
  },
};

export const All: Story = {
  render: () => (
    <div css={storyContainer}>
      <DateGroupedCard
        date="2025-02-25"
        items={[
          {
            id: '1',
            title: '콘텐츠 1',
            mainTag: 'Tag1',
            subTag: 'Sub1',
            images: [MobileCardSampleFirst, MobileCardSampleSecond],
            onClick: () => console.log('콘텐츠 1 클릭'),
          },
          {
            id: '2',
            title: '콘텐츠 2',
            mainTag: 'Tag2',
            subTag: 'Sub2',
            images: [MobileCardSampleFirst, MobileCardSampleSecond],
            onClick: () => console.log('콘텐츠 2 클릭'),
          },
        ]}
      />
      <DateGroupedCard
        date="2025-02-26"
        items={[
          {
            id: '3',
            title: '콘텐츠 3',
            mainTag: 'Tag3',
            subTag: 'Sub3',
            images: [MobileCardSampleFirst, MobileCardSampleSecond],
            onClick: () => console.log('콘텐츠 3 클릭'),
          },
          {
            id: '4',
            title: '콘텐츠 4',
            mainTag: 'Tag4',
            subTag: 'Sub4',
            images: [MobileCardSampleFirst, MobileCardSampleSecond],
            onClick: () => console.log('콘텐츠 4 클릭'),
          },
        ]}
      />
    </div>
  ),
};
