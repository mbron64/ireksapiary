import React from 'react';
import styled from 'styled-components';
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

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const SectionTitle = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

function About() {
  return (
    <PageContainer>
      <AnnouncementBar message="🐝 LOCALLY SOURCED FROM CALIFORNIA'S CENTRAL VALLEY" />
      <SharedHeader />

      <Content>
        <Title>About Irek's Apiary</Title>

        <Section>
          <p>
            Welcome to Irek's Apiary, where we believe honey should be enjoyed the way nature intended — 
            raw, unfiltered, and full of character.
          </p>
        </Section>

        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <p>
            Founded in the heart of California's Central Valley, our journey began with a simple passion: 
            bringing exceptional, sustainably-harvested honey to people who appreciate quality. Each jar 
            tells the story of local wildflowers, dedicated bees, and careful stewardship.
          </p>
        </Section>

        <Section>
          <SectionTitle>Our Philosophy</SectionTitle>
          <p>
            We don't believe in compromising. Our honey is never heated, never ultra-filtered, and never 
            blended from multiple sources. What you get is pure, traceable honey that captures the essence 
            of seasonal blooms.
          </p>
        </Section>

        <Section>
          <SectionTitle>Sustainability</SectionTitle>
          <p>
            Bee health is everything. We practice sustainable beekeeping that prioritizes the wellbeing 
            of our colonies and the local ecosystem. From habitat preservation to ethical harvesting 
            practices, every decision we make considers its impact on these incredible pollinators.
          </p>
        </Section>

        <Section>
          <SectionTitle>Why Raw Honey?</SectionTitle>
          <p>
            Raw honey contains beneficial enzymes, antioxidants, and nutrients that are destroyed by 
            high-heat processing. It's not just about taste — though our honey certainly excels there — 
            it's about preserving all the goodness that makes honey nature's perfect sweetener.
          </p>
        </Section>
      </Content>

      <NewsletterFooter />
      <Footer />
    </PageContainer>
  );
}

export default About;
