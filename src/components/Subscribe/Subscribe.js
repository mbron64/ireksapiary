import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../shared/AnnouncementBar';
import SharedHeader from '../shared/SharedHeader';
import NewsletterFooter from '../shared/NewsletterFooter';
import Footer from '../shared/Footer';

const PageContainer = styled.div`
  background-color: #f4e8c4;
  min-height: 100vh;
  color: #3b2f20;
  font-family: 'Crimson Text', 'Times New Roman', serif;
`;

const Hero = styled.div`
  background: #3b2f20;
  color: #f4e8c4;
  padding: 5rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: #f4e8c4;
  color: #3b2f20;
  padding: 1.25rem 3rem;
  border-radius: 3rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Benefit = styled.div`
  text-align: center;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  transition: transform 0.3s;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #3b2f20;
  }
`;

const BenefitIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const ComparisonSection = styled.div`
  background: rgba(179, 135, 40, 0.08);
  padding: 4rem 2rem;
  margin: 3rem 0;
  border-radius: 1rem;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 800px;
  margin: 2rem auto 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonColumn = styled.div`
  background: ${props => props.$highlight ? '#3b2f20' : 'rgba(255, 255, 255, 0.5)'};
  color: ${props => props.$highlight ? '#f4e8c4' : '#3b2f20'};
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid ${props => props.$highlight ? '#b38728' : 'transparent'};
  
  h4 {
    font-family: 'EB Garamond', serif;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  ul {
    list-style: none;
    padding: 0;
    text-align: left;
  }
  
  li {
    padding: 0.75rem 0;
    border-bottom: 1px dashed ${props => props.$highlight ? 'rgba(244, 232, 196, 0.3)' : '#d0c8b5'};
    
    &:last-child {
      border-bottom: none;
    }
    
    &:before {
      content: '${props => props.$highlight ? '✓' : '○'}';
      margin-right: 0.75rem;
      font-weight: bold;
      color: ${props => props.$highlight ? '#b38728' : '#6e6655'};
    }
  }
`;

const FAQ = styled.div`
  margin-top: 3rem;
`;

const FAQItem = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #b38728;
`;

const Question = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const Answer = styled.p`
  line-height: 1.7;
  color: #584a38;
  font-size: 1.05rem;
`;

const Testimonial = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 2.5rem;
  border-radius: 1rem;
  font-style: italic;
  font-size: 1.2rem;
  text-align: center;
  max-width: 700px;
  margin: 3rem auto;
  border-top: 3px solid #b38728;
  
  &:before {
    content: '"';
    font-size: 3rem;
    color: #b38728;
    line-height: 0;
  }
  
  cite {
    display: block;
    margin-top: 1rem;
    font-style: normal;
    font-size: 1rem;
    color: #584a38;
    font-weight: 500;
  }
`;

function Subscribe() {
  return (
    <PageContainer>
      <AnnouncementBar 
        message="💰 SUBSCRIBERS SAVE AN EXTRA 5% ON EVERY ORDER"
        bgColor="#b38728"
        textColor="#fff"
      />
      <SharedHeader />

      <Hero>
        <HeroTitle>Subscribe & Save</HeroTitle>
        <HeroSubtitle>Never run out. Always save. Skip or cancel anytime.</HeroSubtitle>
        <HeroButton to="/products/wildflower">Start a Subscription</HeroButton>
      </Hero>

      <Content>
        <SectionTitle>Why Subscribe?</SectionTitle>

        <BenefitsGrid>
          <Benefit>
            <BenefitIcon>💰</BenefitIcon>
            <BenefitTitle>Save Big</BenefitTitle>
            <p>Extra 5% off every order, stacks with quantity discounts up to 22% total savings</p>
          </Benefit>

          <Benefit>
            <BenefitIcon>📦</BenefitIcon>
            <BenefitTitle>Never Run Out</BenefitTitle>
            <p>Set your frequency (1, 2, or 3 months) and we'll deliver fresh honey to your door</p>
          </Benefit>

          <Benefit>
            <BenefitIcon>🔄</BenefitIcon>
            <BenefitTitle>Total Flexibility</BenefitTitle>
            <p>Skip, pause, swap flavors, or cancel anytime. No commitments, no penalties</p>
          </Benefit>
        </BenefitsGrid>

        <ComparisonSection>
          <h3 style={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            marginBottom: '1rem',
            fontFamily: 'EB Garamond, serif'
          }}>
            Subscribe vs. One-Time
          </h3>
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem', color: '#584a38' }}>
            Why subscribers love us
          </p>
          <ComparisonGrid>
            <ComparisonColumn>
              <h4>One-Time Purchase</h4>
              <ul>
                <li>Standard pricing</li>
                <li>Pay shipping on small orders</li>
                <li>Remember to reorder</li>
                <li>Risk running out</li>
              </ul>
            </ComparisonColumn>
            
            <ComparisonColumn $highlight>
              <h4>Subscribe & Save</h4>
              <ul>
                <li>Extra 5% off every order</li>
                <li>Free shipping on 6+ jars</li>
                <li>Automatic delivery</li>
                <li>Never run out</li>
                <li>Skip or cancel anytime</li>
                <li>Swap flavors anytime</li>
              </ul>
            </ComparisonColumn>
          </ComparisonGrid>
        </ComparisonSection>

        <Testimonial>
          I've been subscribed for 6 months and it's the best decision ever. I get my Wildflower honey every 2 months, and I've never had to think about running out. Plus the savings really add up!
          <cite>— Michael R., San Francisco</cite>
        </Testimonial>

        <FAQ>
          <SectionTitle>Common Questions</SectionTitle>

          <FAQItem>
            <Question>How does a subscription work?</Question>
            <Answer>
              Choose your honey, select "Subscribe & Save," and pick your delivery frequency (every 1, 2, or 3 months). 
              We'll automatically deliver fresh honey on your schedule. No commitments required.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Can I skip or cancel?</Question>
            <Answer>
              Absolutely! Skip deliveries, change frequency, swap products, or cancel anytime with zero fees or penalties. 
              Manage everything in your account dashboard.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>How much do I actually save?</Question>
            <Answer>
              Subscribers get an extra 5% off every order, which stacks with our quantity discounts (up to 17%). 
              That means up to 22% total savings! Plus free shipping on 6+ jars.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Can I change which honey I get?</Question>
            <Answer>
              Yes! Swap between Wildflower, Clover, and Forest anytime before your next shipment. 
              Try different varieties or stick with your favorite.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>When will I be charged?</Question>
            <Answer>
              You'll be charged when each order ships according to your frequency. 
              You'll get an email reminder a few days before each shipment.
            </Answer>
          </FAQItem>
        </FAQ>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <HeroButton to="/products/wildflower" style={{ background: '#3b2f20', color: '#f4e8c4' }}>
            Start Saving Today
          </HeroButton>
        </div>
      </Content>

      <NewsletterFooter />
      <Footer />
    </PageContainer>
  );
}

export default Subscribe;
