import React, { useState } from 'react';
import { MobileReport } from '@/assets';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import Button from '@/components/mobile/atoms/Button/Button';
import { reportOptions } from '@/constants/reportOption';
import * as S from './ReportModal.style';

export interface ReportModalProps {
  isOpen?: boolean;
  onConfirm?: (reason: string) => void;
  onClose?: () => void;
}

const ReportModal = ({ isOpen, onConfirm, onClose }: ReportModalProps) => {
  const [reportReason, setReportReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');
  const finalReportReason: string =
    reportReason === '기타' ? otherReason : reportReason;

  const handleOtherReportReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherReason(e.target.value);
  };

  const handleConfirm = () => {
    if (!finalReportReason.trim()) return;
    onConfirm?.(finalReportReason);
  };

  return (
    <Modal action="share" isOpen={isOpen} onClose={onClose}>
      <div css={S.reportModalStyling}>
        <div css={S.reportTextWrapper}>
          <MobileReport />
          <div css={S.reportTextStyling}>신고사유 선택</div>
        </div>
        <div css={S.buttonWrapperStyling}>
          {reportOptions.map((option) => (
            <button
              type="button"
              value={option.value}
              key={option.value}
              onClick={() => {
                setReportReason(option.value);
                setOtherReason('');
              }}
              css={[
                S.buttonStyling,
                option.value === reportReason && S.selectedButtonStyling,
              ]}
            >
              {option.label}
            </button>
          ))}
        </div>
        {reportReason === '기타' && (
          <input
            css={S.reportInputStyling}
            placeholder="신고사유를 작성해주세요."
            onChange={handleOtherReportReason}
          />
        )}
        <Button
          size="large"
          variant="primary"
          onClick={handleConfirm}
          css={S.getButtonStyling(!!finalReportReason)}
        >
          설정 완료
        </Button>
      </div>
    </Modal>
  );
};

export default ReportModal;
