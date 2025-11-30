import React from 'react';
import * as S from './styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose} type="button">
            ✕
          </S.CloseButton>
        </S.Header>
        <S.Content>{children}</S.Content>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default Modal;
