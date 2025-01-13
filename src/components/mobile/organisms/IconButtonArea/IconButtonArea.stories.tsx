import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import IconButtonArea from '@/components/mobile/organisms/IconButtonArea/IconButtonArea';

const meta: Meta<typeof IconButtonArea> = {
  title: 'mobile/organisms/IconButtonArea',
  component: IconButtonArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    activeTab: {
      control: 'radio',
      options: ['talkPick', 'balanceGame'],
      description: '현재 활성화된 탭 상태를 선택합니다.',
    },
    onButtonClick: { action: '버튼 클릭됨' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'talkPick',
    activeButton: null,
  },
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <IconButtonArea {...args} />
      </div>
    </div>
  ),
};

export const All: Story = {
  render: () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (id: string) => {
      setActiveButton(id);
    };

    return (
      <div css={storyContainer}>
        <div css={storyInnerContainer}>
          <h3>톡픽</h3>
          <IconButtonArea
            activeTab="talkPick"
            activeButton={activeButton}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div css={storyInnerContainer}>
          <h3>밸런스게임</h3>
          <IconButtonArea
            activeTab="balanceGame"
            activeButton={activeButton}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>
    );
  },
};
