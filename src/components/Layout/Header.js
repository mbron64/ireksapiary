import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingBag, Menu, X } from 'react-feather';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { to: '/nucs', label: 'Nucs' },
  { to: '/shop', label: 'Honey' },
  { to: '/subscribe', label: 'Subscribe' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
];

export default function Header() {
  const { totals, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        <Logo to="/">irek's apiary</Logo>

        <DesktopLinks>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} $active={location.pathname === to}>
              {label}
            </NavLink>
          ))}
        </DesktopLinks>

        <Actions>
          <CartButton onClick={toggleCart} aria-label="Open cart">
            <ShoppingBag size={20} />
            {totals.itemCount > 0 && <Badge>{totals.itemCount}</Badge>}
          </CartButton>
          <MenuButton
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </MenuButton>
        </Actions>
      </NavInner>

      {mobileOpen && (
        <MobileOverlay onClick={() => setMobileOpen(false)}>
          <MobileMenu onClick={e => e.stopPropagation()}>
            {NAV_LINKS.map(({ to, label }) => (
              <MobileLink key={to} to={to} $active={location.pathname === to}>
                {label}
              </MobileLink>
            ))}
            <MobileLink to="/contact">Contact</MobileLink>
          </MobileMenu>
        </MobileOverlay>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.cream};
  border-bottom: 1px solid ${({ theme, $scrolled }) =>
    $scrolled ? theme.colors.brownLight : 'transparent'};
  transition: border-color ${({ theme }) => theme.transitions.base};
`;

const NavInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: ${({ theme }) => theme.layout.headerH};
  padding: 0 ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.space.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.brown};
  white-space: nowrap;
`;

const DesktopLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.brown};
  position: relative;
  padding: ${({ theme }) => theme.space.xs} 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 1px;
    background: ${({ theme }) => theme.colors.brown};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover::after {
    width: 100%;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  gap: ${({ theme }) => theme.space.md};
`;

const CartButton = styled.button`
  position: relative;
  color: ${({ theme }) => theme.colors.brown};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.sm};
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: -2px;
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  min-width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const MenuButton = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.brown};
  padding: ${({ theme }) => theme.space.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  top: ${({ theme }) => theme.layout.headerH};
  background: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.header - 1};
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const MobileMenu = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.space.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.brownLight};
  animation: slideDown 0.25s ease;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MobileLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.brown};
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 1; }
`;
