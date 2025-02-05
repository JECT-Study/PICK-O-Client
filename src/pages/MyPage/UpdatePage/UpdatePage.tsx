import React from 'react';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { css } from '@emotion/react';
import InputNickname from '@/components/molecules/InputNickname/InputNickname';
import InputProfileImage from '@/components/common/InputsUserInfo/InputProfileImage/InputProfileImage';
import InputPw from '@/components/molecules/InputPw/InputPw';
import InputPwCheck from '@/components/molecules/InputPwCheck/InputPwCheck';
import Button from '@/components/atoms/Button/Button';
import Heading from '@/components/common/Heading/Heading';
import Input from '@/components/atoms/Input/Input';
import { useMemberUpdate } from '@/hooks/mypage/memberUpdate/useMemberUpdate';
import {
  btnContainer,
  btnSignup,
  inputContainer,
  signupContainer,
} from '../../SignUpPage/SignUpPage.style';

const UpdatePage = () => {
  const accessToken = useNewSelector(selectAccessToken);
  const token = useParseJwt(accessToken);
  const { member } = useMemberQuery(token.memberId);
  const { form, onChange, onSuccessChange, setEach, handleSubmit } =
    useMemberUpdate();
  if (!member) return null;
  return (
    <form css={signupContainer} onSubmit={handleSubmit}>
      <Heading size="small">회원정보 수정</Heading>
      <InputProfileImage
        setProfilePhoto={setEach}
        imgSrc={member.profileImageUrl}
      />
      <div css={inputContainer}>
        <Input
          placeholder={token.sub}
          disabled
          isDisabled
          size="medium"
          label="이메일"
          css={css({
            width: '420px',
          })}
        />
        <InputNickname
          value={form.nickname}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
        />
        <InputPw
          value={form.password}
          onChange={onChange}
          onSuccessChange={onSuccessChange}
        />
        <InputPwCheck
          value={form.passwordCheck}
          onChange={onChange}
          pw={form.password}
          onSuccessChange={onSuccessChange}
        />
      </div>
      <div css={btnContainer}>
        <Button type="submit" size="large" css={btnSignup}>
          회원수정
        </Button>
      </div>
    </form>
  );
};

export default UpdatePage;
