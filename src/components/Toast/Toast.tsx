import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import * as S from './styled';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose, duration = 3000 }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Wait for animation
  };

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Info;

  return (
    <S.Toast $type={type} $isClosing={isClosing}>
      <S.IconWrapper $type={type}>
        <Icon size={20} />
      </S.IconWrapper>
      <S.Message>{message}</S.Message>
      <S.CloseButton onClick={handleClose}>
        <X size={16} />
      </S.CloseButton>
    </S.Toast>
  );
};

export default Toast;
