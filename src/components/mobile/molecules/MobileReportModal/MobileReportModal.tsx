import { MobileReport } from '@/assets';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import React, { useState } from 'react';
import { reportOptions } from '@/constants/reportOption';
import * as S from './MobileReportModal.style';

interface MobileReportModalProps {
  isOpen: boolean;
  onConfirm?: (reason: string) => void;
  onClose: () => void;
}

export const MobileReportModal = ({
  isOpen,
  onConfirm,
  onClose,
}: MobileReportModalProps) => {
  const [reportReason, setReportReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');
  const finalReportReason: string =
    reportReason === '기타' ? otherReason : reportReason;

  const handleReportReason = (e: React.MouseEvent<HTMLButtonElement>) => {
    setReportReason(e.currentTarget.value);
  };

  const handleOtherReportReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherReason(e.target.value);
  };

  const handleConfirm = () => {
    if (!finalReportReason.trim()) return;
    onConfirm?.(finalReportReason);
  };

  return (
    <Modal action="report" isOpen={isOpen} onClose={onClose}>
      <div css={S.reportModalStyling}>
        <div css={S.titleContainer}>
          <MobileReport />
          <h2 css={S.titleStyle}>신고사유 선택</h2>
        </div>

        <div css={S.getButtonContainer(reportReason === '기타')}>
          {reportOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              css={S.reasonButton}
              value={option.value}
              onClick={handleReportReason}
            >
              {option.label}
            </button>
          ))}
        </div>

        {reportReason === '기타' && (
          <input
            css={S.reportInputStyling}
            placeholder="신고사유를 입력해주세요."
            onChange={handleOtherReportReason}
          />
        )}

        <button
          type="submit"
          css={S.submitButton}
          onClick={handleConfirm}
          disabled={!finalReportReason.trim()}
        >
          설정 완료
        </button>
      </div>
    </Modal>
  );
};
