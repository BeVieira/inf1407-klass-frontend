import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1f2937;
`;

export const Main = styled.main`
  flex: 1;
`;

export const Hero = styled.section`
  background: linear-gradient(to right, #eff6ff, #ffffff);
  padding: 5rem 2rem;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 40rem;
  margin: 0 auto 2.5rem;
`;

export const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const PrimaryButton = styled.a`
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const SecondaryButton = styled(Link)`
  background-color: white;
  color: #2563eb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #2563eb;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eff6ff;
  }
`;

export const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const RolesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 60rem;
  margin: 0 auto;
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const StepNumber = styled.div`
  background-color: #dbeafe;
  color: #2563eb;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const StepTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const StepDescription = styled.p`
  color: #6b7280;
`;
