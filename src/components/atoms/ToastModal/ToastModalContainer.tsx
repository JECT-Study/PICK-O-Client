import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { hideToast } from '@/store/slice/toastSlice';
import { toastContainer } from './ToastModal.style';

const ToastContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, isVisible } = useSelector((state: RootState) => state.toast);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      timerRef.current = window.setTimeout(() => {
        dispatch(hideToast());
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div css={toastContainer}>
      <ToastModal>{message}</ToastModal>
    </div>
  );
};

export default ToastContainer;
