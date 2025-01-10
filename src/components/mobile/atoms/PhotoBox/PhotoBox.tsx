import React from 'react';
import { Camera } from '@/assets';
import * as S from './PhotoBox.style';

export interface PhotoBoxProps {
  imgUrl?: string;
  alt: string;
}

const PhotoBox = ({ imgUrl, alt }: PhotoBoxProps) => {
  return (
    <div css={S.container(!!imgUrl)}>
      {imgUrl ? (
        <img src={imgUrl} alt={alt} css={S.image} />
      ) : (
        <div css={S.placeholder}>
          <Camera css={S.icon} />
        </div>
      )}
    </div>
  );
};

export default PhotoBox;
