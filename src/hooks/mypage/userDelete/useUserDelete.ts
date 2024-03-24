import { AxiosErrorResponse } from '@/api/interceptor';
import { deleteMember } from '@/api/member/member';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { ERROR } from '@/constants/message';
import { useActiveSubmit } from '@/hooks/common/useActiveSubmit';
import { useFocusFalse } from '@/hooks/common/useFocusFalse';
import { useParseJwt } from '@/hooks/common/useParseJwt';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { MemberForm, MemberSuccesForm } from '@/types/member';
import { isAllTrue } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import useInputs from '../../common/useInputs';

const successState: Pick<MemberSuccesForm, 'password'> = {
  password: false,
};
export const useUserDeleteForm = () => {
  const { sub } = useParseJwt(useNewSelector(selectAccessToken));
  const initialState: Pick<MemberForm, 'email' | 'password'> = {
    email: sub,
    password: '',
  };
  const { form, onChange } =
    useInputs<Pick<MemberForm, 'email' | 'password'>>(initialState);

  const { successForm, onSuccessChange } =
    useActiveSubmit<MemberSuccesForm>(successState);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const { focus } = useFocusFalse<MemberSuccesForm>(successForm);

  const signout = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      alert('회원탈퇴가 완료되었습니다.');
    },
    onError: (err: AxiosErrorResponse) => {
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        setErrorMessage(ERROR.PW.NOT_MATCH);
      }
    },
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllTrue(successForm)) {
      form.email = sub;
      console.log(form);
      signout.mutate(form);
    } else {
      focus(e);
    }
  };

  return { form, onChange, onSuccessChange, handleSubmit, errorMessage };
};
