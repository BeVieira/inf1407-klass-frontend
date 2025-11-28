import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 0;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#2563eb' : 'transparent')};
  color: ${({ $active }) => ($active ? '#2563eb' : '#6b7280')};
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
  }
`;
