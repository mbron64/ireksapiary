import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { submitEmail } from '../ComingSoon/EmailSignup/emailService';

const LINK_GROUPS = [
  {
    title: 'Shop',
    links: [
      { to: '/shop', label: 'All Products' },
      { to: '/products/spring', label: 'Spring Honey' },
      { to: '/products/summer', label: 'Summer Honey' },
      { to: '/products/fall', label: 'Fall Honey' },
      { to: '/bundle/trio', label: 'The Honey Trio' },
      { to: '/nucs', label: 'Honeybee Nucs' },
      { to: '/subscribe', label: 'Subscribe & Save' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { to: '/about', label: 'Our Story' },
      { to: '/blog', label: 'Blog' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    try {
      await submitEmail(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Wrapper>
      <Inner>
        <NewsletterCol>
          <NewsletterTitle>Stay in the hive</NewsletterTitle>
          <NewsletterText>
            New harvests, recipes, and honey tips. Straight to your inbox.
          </NewsletterText>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email address"
              disabled={status === 'sending'}
            />
            <SubmitBtn type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? '...' : 'Join'}
            </SubmitBtn>
          </Form>
          {status === 'success' && <Msg>Welcome to the hive!</Msg>}
          {status === 'error' && <Msg $error>Something went wrong. Try again.</Msg>}
        </NewsletterCol>

        {LINK_GROUPS.map(group => (
          <LinkCol key={group.title}>
            <ColTitle>{group.title}</ColTitle>
            {group.links.map(({ to, label }) => (
              <FooterLink key={to} to={to}>{label}</FooterLink>
            ))}
          </LinkCol>
        ))}

        <LinkCol>
          <ColTitle>Follow</ColTitle>
          <ExtLink href="https://instagram.com/ireksapiary" target="_blank" rel="noopener noreferrer">
            Instagram
          </ExtLink>
          <ExtLink href="https://tiktok.com/@ireksapiary" target="_blank" rel="noopener noreferrer">
            TikTok
          </ExtLink>
        </LinkCol>
      </Inner>

      <Bottom>
        <small>&copy; {new Date().getFullYear()} Irek's Apiary &middot; Vestal, NY &middot; Est. 2012</small>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.space['3xl']} 0 ${({ theme }) => theme.space.xl};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl};
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.space['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const NewsletterCol = styled.div``;

const NewsletterTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.cream};
`;

const NewsletterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  opacity: 0.75;
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.cream};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &::placeholder { color: rgba(255,255,255,0.4); }
  &:focus { border-color: ${({ theme }) => theme.colors.gold}; outline: none; }
`;

const SubmitBtn = styled.button`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; }
`;

const Msg = styled.p`
  margin-top: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ $error, theme }) => $error ? theme.colors.errorBorder : theme.colors.gold};
`;

const LinkCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const ColTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const FooterLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.75;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 1; }
`;

const ExtLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.75;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 1; }
`;

const Bottom = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.xl} 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: ${({ theme }) => theme.space['2xl']};
  text-align: center;
  opacity: 0.4;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
