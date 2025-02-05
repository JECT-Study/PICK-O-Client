import { css } from '@emotion/react';
import React, { ComponentPropsWithoutRef } from 'react';
import { Theme } from '../../../styles/theme';

interface ProfileInfoProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

const ProfileInfo = ({ title, children }: ProfileInfoProps) => {
  return (
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
      })}
    >
      {children}
      <p
        css={css({
          marginTop: '10px',
          color: Theme.color.gray400,
          fontSize: Theme.text.xSmall.fontSize,
          whiteSpace: 'nowrap',
        })}
      >
        {title}
      </p>
    </div>
  );
};

export default ProfileInfo;
