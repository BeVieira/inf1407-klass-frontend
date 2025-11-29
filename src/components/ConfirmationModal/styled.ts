import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  padding: 1rem;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const Message = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;

  ${({ $variant }) =>
    $variant === 'danger'
      ? `
    background-color: #ef4444;
    color: white;
    &:hover { background-color: #dc2626; }
  `
      : $variant === 'secondary'
      ? `
    background-color: white;
    color: #374151;
    border-color: #d1d5db;
    &:hover { background-color: #f3f4f6; }
  `
      : `
    background-color: #2563eb;
    color: white;
    &:hover { background-color: #1d4ed8; }
  `}
`;
