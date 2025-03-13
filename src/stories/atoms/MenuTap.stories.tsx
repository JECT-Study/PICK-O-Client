/* eslint-disable no-alert */
import React from 'react';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerRowContainer } from '@/stories/story.styles';

const menuOne: MenuItem[] = [{ id: 0, label: 'ONE' }];
const menuOneTwo: MenuItem[] = [
  { id: 0, label: 'ONE' },
  { id: 1, label: 'TWO' },
];

const reportMenu: MenuItem[] = [
  {
    id: 0,
    label: '신고',
    onClick: () => {
      alert('게시글 신고');
    },
  },
];

const myCommentMenu: MenuItem[] = [
  {
    id: 0,
    label: '수정',
    onClick: () => {
      alert('댓글 수정');
    },
  },
  {
    id: 1,
    label: '삭제',
    onClick: () => {
      alert('댓글 삭제');
    },
  },
];

const otherCommentMenu: MenuItem[] = [
  {
    id: 0,
    label: '신고',
    onClick: () => {
      alert('댓글 신고');
    },
  },
  {
    id: 1,
    label: '차단',
    onClick: () => {
      alert('댓글 차단');
    },
  },
];

const menuOptions = {
  menuOne,
  menuOneTwo,
};

const meta = {
  title: 'atoms/MenuTap',
  component: MenuTap,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menuData: {
      options: Object.keys(menuOptions),
      mapping: menuOptions,
      control: { type: 'radio' },
    },
  },
  args: {
    menuData: menuOptions.menuOne,
  },
} satisfies Meta<typeof MenuTap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuData: menuOne,
  },
};

export const All: Story = {
  render: () => {
    return (
      <ul css={storyContainer}>
        <li css={storyInnerRowContainer}>
          <h3>신고</h3>
          <MenuTap menuData={reportMenu} />
          <h3>본인 댓글</h3>
          <MenuTap menuData={myCommentMenu} />
          <h3>타인 댓글</h3>
          <MenuTap menuData={otherCommentMenu} />
        </li>
      </ul>
    );
  },
};
