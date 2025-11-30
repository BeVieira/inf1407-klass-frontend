import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  overflow-x: auto;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(6, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
  border: 1px solid #e5e7eb;
  min-width: 800px;
`;

export const HeaderCell = styled.div`
  background-color: #f9fafb;
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  color: #4b5563;
  font-size: 0.875rem;
`;

export const TimeCell = styled.div`
  background-color: white;
  padding: 0.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #f3f4f6;
`;

export const SlotCell = styled.div<{ $isActive?: boolean }>`
  background-color: white;
  min-height: 3rem;
  position: relative;
  
  ${({ $isActive }) => $isActive && `
    background-color: #eff6ff;
  `}
`;

export const CourseBlock = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background-color: #dbeafe;
  border-left: 3px solid #2563eb;
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-size: 0.75rem;
  color: #1e40af;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
`;

export const CourseCode = styled.span`
  font-weight: 700;
  display: block;
`;

export const CourseName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
