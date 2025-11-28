import React from 'react';
import * as S from './styled';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'primary',
}) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onCancel}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.Actions>
          <S.Button $variant="secondary" onClick={onCancel}>
            {cancelText}
          </S.Button>
          <S.Button $variant={variant} onClick={onConfirm}>
            {confirmText}
          </S.Button>
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  );
};

export default ConfirmationModal;
