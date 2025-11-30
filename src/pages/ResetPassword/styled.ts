import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #eff6ff, #ffffff);
  font-family: "Inter", sans-serif;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 4rem;
`;

export const Card = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  border: 1px solid #e5e7eb;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Input = styled.input`
  padding: 0.85rem 0.9rem;
  border-radius: 0.65rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-top: 0.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.65rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;
