import React from 'react';
import * as S from './CommentProfile.style';

export interface CommentProfileProps {
  option: 'A' | 'B' | null;
  imgUrl?: string;
}

const CommentProfile = ({ option = null, imgUrl }: CommentProfileProps) => (
  <div css={[S.containerStyle, S.getProfileColor(option)]}>
    <div css={S.profileWrapper}>
      <img css={S.profileImage} src={imgUrl} alt="profile" />
    </div>
  </div>
);

export default CommentProfile;
