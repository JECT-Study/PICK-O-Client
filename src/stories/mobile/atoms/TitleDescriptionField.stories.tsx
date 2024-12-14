/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import TitleDescriptionField from '@/components/mobile/atoms/TitleDescriptionField/TitleDescriptionField';

const meta = {
  title: 'mobile/atoms/TitleDescriptionField',
  component: TitleDescriptionField,
  parameters: { layout: 'centered' },
  args: {
    title: '100억 부자 유병재 VS 무일푼 차은우',
    description: '',
    onTitleChange: (e) => {
      console.log('Title:', e.target.value);
    },
    onDescriptionChange: (e) => {
      console.log('Description:', e.target.value);
    },
  },
} satisfies Meta<typeof TitleDescriptionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
