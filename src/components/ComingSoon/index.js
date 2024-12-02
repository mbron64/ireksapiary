import { EmailSignup } from './EmailSignup';
import { Main, Section, Logo, TitleWrapper, Title, Subtitle } from './styles';
import { GiHoneyJar } from 'react-icons/gi';
import Marquee from 'react-fast-marquee';

export const ComingSoon = () => {
  return (
    <Main>
      <Section>
        <Logo>irek's apiary</Logo>
        <TitleWrapper>
          <Marquee
            speed={20}
            gradient={false}
            loop={0}
            delay={1}
            pauseOnHover={false}
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
          </Marquee>
        </TitleWrapper>
        <Subtitle>Coming soon. Sign up to learn more.</Subtitle>
        <EmailSignup />
      </Section>
    </Main>
  );
}; 