import React from 'react';
import { TalkPickSummary } from '@/types/talk-pick';
import { SadEmoji, Spinner, StatusFail, StatusNotRequired } from '@/assets';
import SummaryItem from '@/components/atoms/SummaryItem/SummaryItem';
import { SUMMARY } from '@/constants/message';
import * as S from './SummaryBox.style';

export interface SummaryBoxProps {
  summary?: TalkPickSummary;
  summaryStatus?: 'PENDING' | 'SUCCESS' | 'FAIL' | 'NOT_REQUIRED';
}

const SummaryBox = ({
  summary,
  summaryStatus = 'PENDING',
}: SummaryBoxProps) => {
  const contentMap: Record<
    'PENDING' | 'SUCCESS' | 'FAIL' | 'NOT_REQUIRED',
    React.ReactNode
  > = {
    PENDING: (
      <div css={S.summarySpinnerWrapper}>
        <div css={S.summarySpinnerStyling}>
          <Spinner />
        </div>
        <p css={S.summarySpinnerText}>{SUMMARY.PENDING}</p>
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
          <p>{SUMMARY.FAIL.UNKNOWN}</p>
          <p>{SUMMARY.FAIL.REFRESH}</p>
        </div>
      </div>
    ),
    NOT_REQUIRED: (
      <div css={S.summaryStatusWrapper}>
        <StatusNotRequired />
        <div css={S.summaryTextWrapper}>
          <span css={S.summaryText}>
            {SUMMARY.NOT_REQUIRED.TEXT_VALIDATION} <SadEmoji />
          </span>
          <p>{SUMMARY.NOT_REQUIRED.TEXT_CHECK}</p>
        </div>
      </div>
    ),
  };

  const renderContent = contentMap[summaryStatus];

  return (
    <div css={S.summaryBoxStyling}>
      <div css={S.summaryTextStyling}>{SUMMARY.TITLE}</div>
      {renderContent}
    </div>
  );
};
export default SummaryBox;
