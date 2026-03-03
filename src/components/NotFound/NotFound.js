import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';

export default function NotFound() {
  return (
    <PageWrapper>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist.">
        <meta name="robots" content="noindex, nofollow" />
      </SEO>
      <Wrap>
        <Code>404</Code>
        <Title>Page not found</Title>
        <Text>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <HomeCTA to="/">Back to Home</HomeCTA>
      </Wrap>
    </PageWrapper>
  );
}

const Wrap = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

const Code = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  line-height: 1;
  opacity: 0.15;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  opacity: 0.7;
`;

const HomeCTA = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.space.md};

  &:hover {
    opacity: 0.85;
  }
`;
