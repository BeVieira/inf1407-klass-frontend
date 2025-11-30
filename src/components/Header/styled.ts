import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb; /* Blue-600 */
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #4b5563; /* Gray-600 */
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

export const NavAnchor = styled.a`
  text-decoration: none;
  color: #4b5563; /* Gray-600 */
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

export const LoginButton = styled(Link)`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8; /* Blue-700 */
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #111827;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    gap: 1rem;
    border-top: 1px solid #e5e7eb;
  }
`;

export const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 0.375rem;

  &:hover {
    background-color: #f3f4f6;
    color: #2563eb;
  }
`;

export const MobileNavAnchor = styled.a`
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 0.375rem;

  &:hover {
    background-color: #f3f4f6;
    color: #2563eb;
  }
`;
