import styled from 'styled-components';

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const IconContainer = styled.div`
  background-color: #eff6ff; /* Blue-50 */
  color: #2563eb; /* Blue-600 */
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937; /* Gray-800 */
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: #6b7280; /* Gray-500 */
  font-size: 0.875rem;
  line-height: 1.5;
`;
