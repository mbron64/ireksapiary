import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function AnnouncementBar({ message = 'Free shipping on honey orders over $50', link }) {
  if (!message) return null;

  const inner = <Text>{message}</Text>;

  return (
    <Bar>
      {link ? <BarLink to={link}>{inner}</BarLink> : inner}
    </Bar>
  );
}

const Bar = styled.div`
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  text-align: center;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarLink = styled(Link)`
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Text = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
