import DefaultProfileModal from '@/components/molecules/DefaultProfileModal/DefaultProfileModal';
import {
  OctopusProfile,
  JellyfishProfile,
  RayProfile,
  EelProfile,
  TurtleProfile,
  RabbitProfile,
} from '@/assets';
import type { Meta, StoryObj } from '@storybook/react';

const defaultImageList: string[] = [
  OctopusProfile,
  JellyfishProfile,
  RayProfile,
  EelProfile,
  TurtleProfile,
  RabbitProfile,
];

const meta = {
  title: 'molecules/DefaultProfileModal',
  component: DefaultProfileModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
  },
  args: {
    isOpen: true,
    imgList: defaultImageList,
  },
} satisfies Meta<typeof DefaultProfileModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
