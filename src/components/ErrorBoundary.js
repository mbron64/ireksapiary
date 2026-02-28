import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

export function ErrorBoundaryFallback() {
  const error = useRouteError();

  return (
    <Wrapper>
      <Inner>
        <Title>Something went wrong</Title>
        <Text>
          We're sorry, an unexpected error occurred. Please try refreshing,
          or head back to the homepage.
        </Text>
        {process.env.NODE_ENV === 'development' && error && (
          <Details>
            <summary>Error details</summary>
            <pre>{error.message || String(error)}</pre>
          </Details>
        )}
        <HomeLink to="/">Back to Home</HomeLink>
      </Inner>
    </Wrapper>
  );
}

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <Inner>
            <Title>Something went wrong</Title>
            <Text>
              We're sorry, an unexpected error occurred. Please try refreshing.
            </Text>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Details>
                <summary>Error details</summary>
                <pre>{this.state.error.message}</pre>
              </Details>
            )}
            <ReloadBtn onClick={() => window.location.reload()}>
              Refresh Page
            </ReloadBtn>
          </Inner>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #FDF6E4;
  color: #3C2A21;
`;

const Inner = styled.div`
  text-align: center;
  max-width: 480px;
`;

const Title = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.7;
  margin-bottom: 2rem;
`;

const Details = styled.details`
  text-align: left;
  margin-bottom: 2rem;
  font-size: 0.875rem;

  summary { cursor: pointer; opacity: 0.5; margin-bottom: 0.5rem; }
  pre {
    background: rgba(60,42,33,0.05);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.8rem;
  }
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #3C2A21;
  color: #FDF6E4;
  font-family: 'EB Garamond', serif;
  font-size: 1.1rem;
  border-radius: 4px;
`;

const ReloadBtn = styled.button`
  padding: 0.75rem 2rem;
  background: #3C2A21;
  color: #FDF6E4;
  font-family: 'EB Garamond', serif;
  font-size: 1.1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
