/* eslint-disable no-console */
import React, { useState } from 'react';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import CheckBoxButton from '@/components/atoms/CheckBoxButton/CheckBoxButton';
import {
  checkBoxWrapperStyling,
  closeBtnStyling,
  confirmBtnStyling,
  reportBtnWrapperStyling,
  reportModalStyling,
  reportTextAreaStyling,
  reportTextStyling,
} from './ReportModal.style';

export interface ReportModalProps {
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const ReportModal = ({ isOpen, onConfirm, onClose }: ReportModalProps) => {
  const reportOptions = [
    { value: 'profanity', label: '욕설' },
    { value: 'spam', label: '도배 및 스팸' },
    { value: 'illegality', label: '불건전 및 불법 정보' },
    { value: 'discrimination', label: '차별적 발언' },
    { value: 'promotion', label: '홍보 목적' },
    { value: 'privacy', label: '개인정보노출 및 침해' },
    { value: 'other', label: '기타' },
  ];

  const [reportReason, setReportReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');

  const handleReportReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportReason(e.target.value);
  };

  const handleOtherReportReason = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setOtherReason(e.target.value);
  };

  console.log(reportReason === 'other' ? otherReason : reportReason);

  return (
    <Modal action="report" isOpen={isOpen} onClose={onClose}>
      <div css={reportModalStyling}>
        <div css={reportTextStyling}>[신고사유 선택]</div>
        <div css={checkBoxWrapperStyling}>
          {reportOptions.map((option) => (
            <CheckBoxButton
              key={option.value}
              name="report"
              value={option.value}
              onChange={handleReportReason}
            >
              {option.label}
            </CheckBoxButton>
          ))}
          {reportReason === 'other' && (
            <textarea
              css={reportTextAreaStyling}
              placeholder="신고사유를 작성해주세요."
              onChange={handleOtherReportReason}
            />
          )}
        </div>
        <div css={reportBtnWrapperStyling}>
          <Button
            size="large"
            variant="primary"
            css={closeBtnStyling}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            size="large"
            variant="primary"
            css={confirmBtnStyling}
            onClick={onConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
