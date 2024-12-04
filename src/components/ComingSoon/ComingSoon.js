import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Marquee from 'react-fast-marquee';
import { GiHoneyJar } from 'react-icons/gi';
import { validateEmail } from '../../utils/validation';
import { submitEmail } from './EmailSignup/emailService';

// Semantic styled components
const Main = styled.main`
  background-color: #f4e8c4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Section = styled.section`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  text-align: center;
  position: relative;
`;

const Logo = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 3.75rem;
  font-weight: 590;
  margin-bottom: 3rem;
  letter-spacing: -0.03em;
  white-space: nowrap;
  color: #3b2f20;
  transform: scaleX(1);
  transform-origin: center;
  text-transform: none;

  @font-face {
    font-family: 'EB Garamond';
    src: local('EB Garamond');
    size-adjust: 100%;
  }

  &:not(:local('EB Garamond')) {
    letter-spacing: -0.05em;
    font-weight: normal;
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 55%;
  transform: translateX(-50%);
  width: 110vw;
  overflow: visible;
  margin: 0;
  padding: 0;
  height: 4rem;
`;

const Title = styled.h2`
  font-family: 'Crimson Text', 'Times New Roman', serif;
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  color: #3b2f20;
  letter-spacing: -0.03em;
  transform: scaleX(0.95);
  transform-origin: center;

  @font-face {
    font-family: 'Crimson Text';
    src: local('Crimson Text');
    size-adjust: 100%;
  }

  &:not(:local('Crimson Text')) {
    letter-spacing: -0.04em;
  }
`;

const Subtitle = styled.p`
  font-family: 'Courier Prime', monospace;
  font-size: 0.75rem;
  letter-spacing: -0.02em;
  margin-bottom: 1.2rem;
  color: #3b2f20;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 300px;
  margin: 0 auto;
  min-height: 160px;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #3b2f20;
  background: transparent;
  color: #3b2f20;
  border-radius: 3px;
  font-family: 'Crimson Text', serif;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:focus {
    outline: none;
    border: 2px solid #3b2f20;
  }

  &::selection {
    background-color: rgba(244, 232, 196, 0.2);
  }

  &::-moz-selection {
    background-color: rgba(244, 232, 196, 0.2);
  }

  &::placeholder {
    font-family: 'Crimson Text', serif;
    color: #3b2f20;
    opacity: ${props => props.disabled ? 0.4 : 0.7};
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 0.875rem;
  background-color: ${props => props.disabled ? 'rgba(59, 47, 32, 0.3)' : '#3b2f20'};
  color: ${props => props.disabled ? '#3b2f20' : '#f4e8c4'};
  border: none;
  border-radius: 3px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  font-family: 'Crimson Text', serif;
  opacity: ${props => props.disabled ? 0.8 : 1};

  &:hover {
    opacity: ${props => props.disabled ? 0.8 : 0.9};
  }
`;

const scrollLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const ScrollingText = styled.div`
  animation: ${scrollLeft} 20s linear infinite;
  white-space: nowrap;
`;

// Add styles for the Marquee wrapper
const StyledMarquee = styled(Marquee)`
  width: 100%;
  
  .marquee-container {
    gap: 0;
    overflow: visible;
    margin-left: -4rem;
  }

  .marquee {
    transform: translateX(-4rem);
    min-width: auto !important;
  }
`;

const MarqueeContent = () => (
  <Title>
    Don't Just Smell the Flowers, Taste Them
    <span style={{ 
      fontSize: '1.5rem', 
      position: 'relative', 
      top: '-2px', 
      color: '#3b2f20',
      margin: '0 2rem'
    }}>
      ✿
    </span>
    Don't Just Smell the Flowers, Taste Them
    <span style={{ 
      fontSize: '1.5rem', 
      position: 'relative', 
      top: '-2px',
      color: '#3b2f20',
      margin: '0 2rem',
      marginRight: '-2rem',
      [`@media (max-width: 768px)`]: {
        marginRight: '-1rem'  // Less negative margin on mobile
      }
    }}>
      <GiHoneyJar style={{ fontSize: '1.3rem' }} />
    </span>
  </Title>
);

const StatusMessage = styled(Subtitle)`
  margin-top: 1rem;
  transition: opacity 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  color: ${props => props.error ? '#cc0000' : '#3b2f20'};
  font-size: 0.75rem;
  height: 1rem;
  position: absolute;
  width: 100%;
  text-align: center;
`;

function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    // Clear previous messages
    setStatus('');
    setError('');
    setIsSubmitting(true);
    
    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error);
      setIsSubmitting(false);
      return;
    }

    // Submit email
    const result = await submitEmail(email);
    if (result.success) {
      setStatus('Thanks for signing up!');
      setEmail('');
    } else {
      setError('Oops! Something went wrong.');
    }
    setIsSubmitting(false);
  };

  return (
    <Main>
      <Section>
        <Logo>
          irek<span style={{ 
            display: 'inline-block', 
            transform: 'translateY(-0.66em)',
            marginLeft: '0.05em',
            marginRight: '-0.05em',
            fontSize: '0.9em'
          }}>
            ,
          </span>s apiary
        </Logo>
        <TitleWrapper>
          <StyledMarquee
            speed={20}
            gradient={false}
            loop={0}
            delay={0}
            pauseOnHover={false}
            initialLeftPosition={-200}
          >
            <MarqueeContent />
            <MarqueeContent />
          </StyledMarquee>
        </TitleWrapper>
        <div style={{ marginTop: '7rem' }}>
          <Subtitle>Coming soon. Sign up to learn more.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
            <div style={{ position: 'relative', height: '2rem' }}>
              {status && (
                <StatusMessage show={!!status}>
                  Thanks for signing up ;)
                </StatusMessage>
              )}
              {error && (
                <StatusMessage show={!!error} error>
                  {error}
                </StatusMessage>
              )}
            </div>
          </Form>
        </div>
      </Section>
    </Main>
  );
}

export default ComingSoon; 