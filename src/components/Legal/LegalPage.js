import React from 'react';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';

export default function LegalPage({ title, path, children }) {
  return (
    <PageWrapper>
      <SEO title={title} path={path} description={`${title} for Irek's Apiary.`} />
      <Wrap>
        <Title>{title}</Title>
        <Updated>Last updated: March 2026</Updated>
        <Content>{children}</Content>
      </Wrap>
    </PageWrapper>
  );
}

const Wrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space['4xl']};
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Updated = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.brown};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin: ${({ theme }) => theme.space['2xl']} 0 ${({ theme }) => theme.space.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.space.lg};
  }

  ul {
    margin-bottom: ${({ theme }) => theme.space.lg};
    padding-left: ${({ theme }) => theme.space.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.space.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.gold};
    text-decoration: underline;
  }
`;
