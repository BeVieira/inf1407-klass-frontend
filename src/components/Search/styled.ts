import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem; /* max-w-lg */
  margin: 0 auto;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db; /* Gray-300 */
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #2563eb; /* Blue-600 */
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af; /* Gray-400 */
  pointer-events: none;
`;
