import styled from 'styled-components';

export const Card = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Code = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #ea580c;
  background-color: #ffedd5;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  text-transform: uppercase;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0.5rem 0 0.25rem;
  line-height: 1.4;
`;

export const Professor = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
`;

export const StatValue = styled.span`
  font-size: 0.875rem;
  color: #111827;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

export const DetailsButton = styled.button`
  background-color: white;
  color: #ea580c;
  border: 1px solid #ea580c;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ffedd5;
  }
`;
