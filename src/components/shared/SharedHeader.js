import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(59, 47, 32, 0.1);
  background-color: #f4e8c4;
  position: sticky;
  top: ${props => props.$hasAnnouncement ? '3rem' : '0'};
  z-index: 99;
`;

const Logo = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  font-weight: 590;
  letter-spacing: -0.03em;
  color: #3b2f20;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #3b2f20;
  text-decoration: none;
  font-size: 1rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const CartButton = styled.button`
  background: #3b2f20;
  color: #f4e8c4;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

/**
 * Shared Header Component
 * 
 * @param {string} logoLink - Where the logo should link to (default: "/home")
 * @param {boolean} hasAnnouncement - Whether page has announcement bar (affects sticky position)
 */
function SharedHeader({ logoLink = "/home", hasAnnouncement = true }) {
  const { toggleCart, getCartTotals } = useCart();
  const { itemCount } = getCartTotals();

  return (
    <Header $hasAnnouncement={hasAnnouncement}>
      <Logo>
        <Link to={logoLink} style={{ textDecoration: 'none', color: '#3b2f20' }}>
          irek<span style={{ 
            display: 'inline-block', 
            transform: 'translateY(-0.66em)',
            marginLeft: '0.05em',
            marginRight: '-0.05em',
            fontSize: '0.9em'
          }}>
            ,
          </span>s apiary
        </Link>
      </Logo>
      
      <Nav>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/subscribe">Subscribe</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <CartButton onClick={toggleCart}>Cart [{itemCount}]</CartButton>
      </Nav>
    </Header>
  );
}

export default SharedHeader;
