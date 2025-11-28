import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Toast = styled.div<{ $type: 'success' | 'error' | 'info'; $isClosing: boolean }>`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-left: 4px solid
    ${({ $type }) =>
      $type === 'success' ? '#10b981' : $type === 'error' ? '#ef4444' : '#3b82f6'};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 300px;
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`
          ${slideOut} 0.3s ease-in forwards
        `
      : css`
          ${slideIn} 0.3s ease-out forwards
        `};
`;

export const IconWrapper = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  color: ${({ $type }) =>
    $type === 'success' ? '#10b981' : $type === 'error' ? '#ef4444' : '#3b82f6'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.p`
  margin: 0;
  color: #1f2937;
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #4b5563;
  }
`;
