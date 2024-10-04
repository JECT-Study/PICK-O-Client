import { Meta, StoryObj } from '@storybook/react';
import SearchGameResult from '@/components/organisms/SearchGameResult/SearchGameResult';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof SearchGameResult> = {
  title: 'organisms/SearchGameResult',
  component: SearchGameResult,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const gameListSample = Array.from({ length: 9 }, (_, index) => ({
  optionAImg: SampleFirst,
  optionBImg: SampleSecond,
  title: `게임 ${index + 1} - 유진 VS 민지 사복 고르기`,
  mainTag: '취향',
  subTag: '얼마나 맞나 보자',
}));

export const Default: Story = {
  args: {
    gameList: gameListSample,
  },
};

export const All: Story = {
  render: (args) => (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h3>게임 목록이 9개 미만인 경우 (5개)</h3>
        <SearchGameResult
          {...args}
          gameList={Array.from({ length: 5 }, (_, index) => ({
            optionAImg: SampleFirst,
            optionBImg: SampleSecond,
            title: `게임 ${index + 1} - 유진 VS 민지 사복 고르기`,
            mainTag: '취향',
            subTag: '얼마나 맞나 보자',
          }))}
        />
      </div>
      <div>
        <h3>게임 목록이 9개인 경우</h3>
        <SearchGameResult {...args} gameList={gameListSample} />
      </div>
    </>
  ),
};
