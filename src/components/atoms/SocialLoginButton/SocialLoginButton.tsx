import React, { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import {
  KakaoLogin,
  GoogleLogin,
  NaverLogin,
  MobileKakaoLogin,
  MobileGoogleLogin,
  MobileNaverLogin,
  RecentLogin,
  MobileRecentLogin,
} from '@/assets';
import * as S from './SocialLoginButton.style';

export interface SocialLoginButtonProps
  extends ComponentPropsWithRef<'button'> {
  variant: 'kakao' | 'google' | 'naver';
  size?: 'medium' | 'small';
  recent?: boolean;
}

const SocialLoginButton = (
  {
    variant,
    size = 'medium',
    recent = false,
    ...props
  }: SocialLoginButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  let ImageComponent;
  switch (variant) {
    case 'kakao':
      ImageComponent = size === 'medium' ? KakaoLogin : MobileKakaoLogin;
      break;
    case 'google':
      ImageComponent = size === 'medium' ? GoogleLogin : MobileGoogleLogin;
      break;
    case 'naver':
      ImageComponent = size === 'medium' ? NaverLogin : MobileNaverLogin;
      break;
    default:
      return null;
  }

  return (
    <div css={S.socialLoginStyling}>
      <button
        type="button"
        ref={ref}
        css={[S.loginButtonStyling, S.getSizeStyling(size)]}
        {...props}
      >
        <ImageComponent />
      </button>
      {recent &&
        (size === 'medium' ? (
          <RecentLogin css={S.getRecentLoginStyling(size)} />
        ) : (
          <MobileRecentLogin css={S.getRecentLoginStyling(size)} />
        ))}
    </div>
  );
};

export default forwardRef(SocialLoginButton);
