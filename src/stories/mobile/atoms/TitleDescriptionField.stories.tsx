/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import TitleDescriptionField from '@/components/mobile/atoms/TitleDescriptionField/TitleDescriptionField';

const meta = {
  title: 'mobile/atoms/TitleDescriptionField',
  component: TitleDescriptionField,
  parameters: { layout: 'centered' },
  args: {
    titleProps: {
      name: 'title',
    },
    subTitleProps: {
      name: 'description',
    },
  },
} satisfies Meta<typeof TitleDescriptionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
