import React from 'react';
import { TalkPickSummary } from '@/types/talk-pick';
import { SadEmoji, Spinner, StatusFail, StatusNotRequired } from '@/assets';
import SummaryItem from '@/components/atoms/SummaryItem/SummaryItem';
import * as S from './SummaryBox.style';

export interface SummaryBoxProps {
  summary?: TalkPickSummary;
  summaryStatus?: 'PENDING' | 'SUCCESS' | 'FAIL' | 'NOT_REQUIRED';
}

const SummaryBox = ({ summary, summaryStatus }: SummaryBoxProps) => {
  const contentMap: Record<
    'PENDING' | 'SUCCESS' | 'FAIL' | 'NOT_REQUIRED',
    React.ReactNode
  > = {
    PENDING: (
      <div css={S.summarySpinnerWrapper}>
        <div css={S.summarySpinnerStyling}>
          <Spinner />
        </div>
        <p css={S.summarySpinnerText}>AI가 세 줄 요약을 하고 있어요!</p>
      </div>
    ),
    SUCCESS: (
      <div css={S.summaryWrapper}>
        <SummaryItem itemNumber="1">{summary?.summaryFirstLine}</SummaryItem>
        <SummaryItem itemNumber="2">{summary?.summarySecondLine}</SummaryItem>
        <SummaryItem itemNumber="3">{summary?.summaryThirdLine}</SummaryItem>
      </div>
    ),
    FAIL: (
      <div css={S.summaryStatusWrapper}>
        <StatusFail />
        <div css={S.summaryTextWrapper}>
          <p>알 수 없는 오류가 발생했어요.</p>
          <p>새로고침을 눌러주세요!</p>
        </div>
      </div>
    ),
    NOT_REQUIRED: (
      <div css={S.summaryStatusWrapper}>
        <StatusNotRequired />
        <div css={S.summaryTextWrapper}>
          <span css={S.summaryText}>
            본문이 너무 짧아 요약할 수 없어요. <SadEmoji />
          </span>
          <p>전체 글을 확인해 주세요!</p>
        </div>
      </div>
    ),
  };

  const renderContent = contentMap[summaryStatus ?? 'PENDING'];

  return (
    <div css={S.summaryBoxStyling}>
      <div css={S.summaryTextStyling}>세 줄 요약</div>
      {renderContent}
    </div>
  );
};
export default SummaryBox;
