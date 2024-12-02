import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Marquee from 'react-fast-marquee';
import { GiHoneyJar } from 'react-icons/gi';
import { validateEmail } from '../../utils/validation';
import { submitEmail } from './EmailSignup/emailService';

// Semantic styled components
const Main = styled.main`
  background-color: #f4e8c4;
  /* Color History:
   * #3b2f20 - olive-brown
   * #2b2420 - dark brown
   * #f4e4d4 - cream
   */
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
`;

const Logo = styled.h1`
  font-family: 'Crimson Text', serif;
  font-size: 3.75rem;
  font-weight: 510;
  margin-bottom: 3rem;
  letter-spacing: -0.03em;
  white-space: nowrap;
  color: #3b2f20;
  transform: scaleX(1);
  transform-origin: center;
  text-transform: none;
`;

const TitleWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  padding: 0;
  position: relative;
  
  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  font-family: 'Crimson Text', serif;
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  color: #3b2f20;
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
    border-color: #3b2f20;
    border-width: 2px;
  }

  &::selection {
    background-color: rgba(59, 47, 32, 0.2);
  }

  &::-moz-selection {
    background-color: rgba(59, 47, 32, 0.2);
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
  color: #f4e4d4;
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
    justify-content: flex-start !important;
  }
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
        <Logo>irek's apiary</Logo>
        <TitleWrapper>
          <StyledMarquee
            speed={20}
            gradient={false}
            loop={0}
            delay={0}
            pauseOnHover={false}
            direction="left"
          >
            <Title>
              Don't Just Smell the Flowers, Taste Them &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '1.5rem', position: 'relative', top: '-2px', color: '#3b2f20' }}>
                ✿
              </span>&nbsp;&nbsp;&nbsp;
            </Title>
            <Title>
              Don't Just Smell the Flowers, Taste Them &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '1.5rem', position: 'relative', top: '-2px', color: '#3b2f20' }}>
                <GiHoneyJar style={{ fontSize: '1.3rem' }} />
              </span>&nbsp;&nbsp;&nbsp;
            </Title>
          </StyledMarquee>
        </TitleWrapper>
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
          {status && <Subtitle style={{ color: '#3b2f20' }}>Thanks for signing up ;)</Subtitle>}
          {error && <Subtitle style={{ color: '#cc0000' }}>{error}</Subtitle>}
        </Form>
      </Section>
    </Main>
  );
}

export default ComingSoon; 