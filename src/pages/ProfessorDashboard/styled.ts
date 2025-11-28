import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
`;

export const Main = styled.main`
  flex: 1;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
`;
