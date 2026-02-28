import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4e8c4;
  color: #3b2f20;
  font-family: 'Crimson Text', 'Times New Roman', serif;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #3b2f20;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const ErrorButton = styled.button`
  background-color: #3b2f20;
  color: #f4e8c4;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ErrorDetails = styled.details`
  margin-top: 2rem;
  max-width: 800px;
  text-align: left;
  
  summary {
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  pre {
    background-color: rgba(59, 47, 32, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    font-size: 0.875rem;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
          <ErrorMessage>
            We're sorry for the inconvenience. The page you were trying to view has encountered an error.
            Our team has been notified and we're working on a fix.
          </ErrorMessage>
          <ErrorButton onClick={this.handleReset}>
            Return to Homepage
          </ErrorButton>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <summary>Error Details (Development Only)</summary>
              <pre>
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

