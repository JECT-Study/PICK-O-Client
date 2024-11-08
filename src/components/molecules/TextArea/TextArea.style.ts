import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const textAreaContainer = css`
  display: flex;
  flex-direction: column;
  background-color: ${color.WT};
  border: 1px solid #f4f4f4;
  border-radius: 10px;
  padding: 15px 30px 20px 35px;
`;

export const getContainerSizeStyling = (size: 'large' | 'medium') => {
  const style = {
    large: css`
      width: 1175px;
      height: 160px;
    `,
    medium: css`
      width: 1056px;
      height: 130px;
    `,
  };
  return style[size];
};

export const replyTextArea = css`
  width: 100%;
  border: none;
  ${typo.Main.Medium}
  color: #505050;
  resize: none;
  flex: 1;
`;

export const getTextareaSizeStyling = (size: 'large' | 'medium') => {
  const style = {
    large: css`
      &::placeholder {
        ${typo.Comment.Regular}
        color: #b9b9b9;
      }
    `,
    medium: css`
      &::placeholder {
        ${typo.Comment.Regular}
        color: #b9b9b9;
      }
    `,
  };
  return style[size];
};

export const replyFooter = css`
  display: flex;
  gap: 27px;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  margin-top: 10px;
`;

export const replyCount = css`
  ${typo.Comment.SemiBold}
  color: #929292;
`;

export const getButtonStyle = (isEdited: boolean) => {
  if (isEdited) {
    return css({
      minWidth: '80px',
    });
  }

  return css({
    backgroundColor: color.GY[2],
    minWidth: '80px',
    cursor: 'not-allowed',
  });
};
