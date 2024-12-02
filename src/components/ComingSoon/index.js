import { EmailSignup } from './EmailSignup';
import { Main, Section, Logo, TitleWrapper, Title, Subtitle } from './styles';
import { GiHoneyJar } from 'react-icons/gi';
import Marquee from 'react-fast-marquee';

export const ComingSoon = () => {
  const marqueeContent = (
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

  return (
    <Main>
      <Section>
        <Logo>irek's apiary</Logo>
        <TitleWrapper>
          <Marquee
            speed={20}
            gradient={false}
            loop={0}
            delay={0}
            pauseOnHover={false}
          >
            {marqueeContent}
          </Marquee>
        </TitleWrapper>
        <Subtitle>Coming soon. Sign up to learn more.</Subtitle>
        <EmailSignup />
      </Section>
    </Main>
  );
}; 