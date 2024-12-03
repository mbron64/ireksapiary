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
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  overflow: hidden;
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
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #3b2f20;
  background: transparent;
  color: #3b2f20;
  border-radius: 3px;
  font-family: 'Crimson Text', serif;

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
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 0.875rem;
  background-color: #3b2f20;
  color: #f4e8c4;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: 'Crimson Text', serif;

  &:hover {
    opacity: 0.9;
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
    gap: 4rem;
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
      margin: '0 2rem'
    }}>
      <GiHoneyJar style={{ fontSize: '1.3rem' }} />
    </span>
  </Title>
);

const StatusMessage = styled(Subtitle)`
  margin-top: 1rem;
  font-size: 0.875rem;
  transition: opacity 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  color: ${props => props.error ? '#cc0000' : '#3b2f20'};
`;

function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setStatus('');
    setError('');
    
    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error);
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
            />
            <Button type="submit">Sign Up</Button>
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
          </Form>
        </div>
      </Section>
    </Main>
  );
}

export default ComingSoon; 