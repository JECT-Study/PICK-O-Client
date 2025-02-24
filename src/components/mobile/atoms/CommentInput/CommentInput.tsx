import React, { useRef, useEffect } from 'react';
import { MobileArrowUp } from '@/assets';
import { COMMENT } from '@/constants/message';
import * as S from './CommentInput.style';

interface CommentInputProps {
  comment: string;
  isEditing: boolean;
  onCommentChange: (value: string) => void;
  onCommentSubmit: () => void;
}

const CommentInput = ({
  comment,
  isEditing,
  onCommentChange,
  onCommentSubmit,
  ...attributes
}: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, [comment]);

  return (
    <div css={S.inputContainer}>
      <div css={S.inputBoxWrapper(comment.length)}>
        <textarea
          ref={textareaRef}
          css={S.inputStyling}
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => {
            onCommentChange(e.target.value);
            handleInput();
          }}
          maxLength={COMMENT.MAX_LENGTH}
          rows={1}
          {...attributes}
        />
        <div css={S.rightContainer(comment.length)}>
          <div css={S.rightWrapper}>
            <div css={S.charCountContainer}>
              <span css={S.charCountStyling(comment.length)}>
                {comment.length}
              </span>
              <span css={S.charDefaultStyling}>/{COMMENT.MAX_LENGTH}</span>
            </div>
            <button
              type="button"
              css={S.buttonStyling}
              onClick={onCommentSubmit}
              aria-label="댓글 입력"
            >
              <MobileArrowUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(CommentInput);
