/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent } from 'react';
import { css } from '@emotion/react';

import Button from '@/components/design/Button/Button';
import Input from '@/components/design/Input/Input';
import { useCreateReply } from '@/hooks/comment/useCreateReply';

interface InputNewReplyProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  postId: number;
  commentId: number;
  memberId: number;
}

const InputNewReply = ({
  value,
  onChange,
  reset,
  commentId,
  memberId,
  postId,
}: InputNewReplyProps) => {
  const { inputRef, handleSubmit } = useCreateReply({
    value,
    postId,
    commentId,
    memberId,
    reset,
  });

  return (
    <Input
      name="content"
      placeholder="답글을 입력해주세요"
      size="medium"
      value={value}
      ref={inputRef}
      onChange={onChange}
      btn={<Button onClick={handleSubmit}>등록</Button>}
      css={css({ width: '250px' })}
    />
  );
};

export default InputNewReply;
