import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import { SUBSCRIPTION_DISCOUNT } from '../../config/products';

const BENEFITS = [
  { title: 'Save Every Time', desc: `${Math.round(SUBSCRIPTION_DISCOUNT * 100)}% off every order, on top of any quantity discounts.` },
  { title: 'Never Run Out', desc: 'Fresh honey delivered monthly, right to your door.' },
  { title: 'Cancel Anytime', desc: 'No contracts, no commitments. Pause or cancel whenever you want.' },
  { title: 'Free Shipping', desc: 'Every subscription order ships free, no minimum.' },
];

const FAQ = [
  { q: 'How does the subscription work?', a: 'Pick your honey and size, check the "Subscribe & Save" box, and we\'ll deliver it monthly. You\'ll be charged each month when your order ships.' },
  { q: 'Can I change my order?', a: 'Yes, you can swap products, change quantities, or update your delivery address anytime from your account.' },
  { q: 'What if I need to skip a month?', a: 'No problem. You can pause your subscription for as long as you need and resume when you\'re ready.' },
  { q: 'Is there a minimum commitment?', a: 'None at all. You can cancel after your first delivery if it\'s not for you.' },
];

export default function Subscribe() {
  return (
    <PageWrapper>
      <Hero>
        <Label>Subscribe & Save</Label>
        <Title>Honey, On Repeat</Title>
        <Subtitle>
          Set it and forget it. Fresh raw honey delivered monthly
          with {Math.round(SUBSCRIPTION_DISCOUNT * 100)}% off every order.
        </Subtitle>
        <CTA to="/shop">Start Your Subscription</CTA>
      </Hero>

      <Section>
        <SectionTitle>Why Subscribe?</SectionTitle>
        <BenefitsGrid>
          {BENEFITS.map(b => (
            <Benefit key={b.title}>
              <BenefitTitle>{b.title}</BenefitTitle>
              <BenefitDesc>{b.desc}</BenefitDesc>
            </Benefit>
          ))}
        </BenefitsGrid>
      </Section>

      <FAQSection>
        <SectionTitle>Common Questions</SectionTitle>
        <FAQList>
          {FAQ.map(item => (
            <FAQItem key={item.q}>
              <FAQQuestion>{item.q}</FAQQuestion>
              <FAQAnswer>{item.a}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>
    </PageWrapper>
  );
}

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space['2xl']};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  opacity: 0.7;
  max-width: 520px;
  margin: 0 auto ${({ theme }) => theme.space.xl};
  line-height: 1.5;
`;

const CTA = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
`;

const Section = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl};
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, ${({ theme }) => theme.fontSizes['3xl']});
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.space.xl};
`;

const Benefit = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
`;

const BenefitTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const BenefitDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  opacity: 0.75;
`;

const FAQSection = styled.section`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['4xl']};
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FAQItem = styled.div`
  padding: ${({ theme }) => theme.space.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const FAQQuestion = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const FAQAnswer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  opacity: 0.75;
`;
