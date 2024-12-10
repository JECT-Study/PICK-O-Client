import React from 'react';
import * as S from './DraftSaveButton.style';

interface DraftSaveButtonProps {
  onClick: () => void;
}

const DraftSaveButton = ({ onClick }: DraftSaveButtonProps) => {
  return (
    <button css={S.buttonStyle} type="button" onClick={onClick}>
      임시저장
    </button>
  );
};
export default DraftSaveButton;
