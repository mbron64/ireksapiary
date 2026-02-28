import React from 'react';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';

export default function About() {
  return (
    <PageWrapper>
      <Hero>
        <Label>Our Story</Label>
        <Title>Irek's Apiary</Title>
        <Subtitle>
          Small batch, raw & unfiltered honey from Vestal, New York since 2012.
        </Subtitle>
      </Hero>

      <Content>
        <Block>
          <H2>How It Started</H2>
          <P>
            What began as a single backyard hive in 2012 has grown into a labor
            of love. Irek's Apiary was founded on a simple belief: honey should
            taste like the flowers it comes from, not like the inside of a
            factory.
          </P>
          <P>
            We started selling at local farmers' markets in the Southern Tier
            of New York, and word spread quickly. People could taste the
            difference. Real, raw, unfiltered honey. The way it's supposed to be.
          </P>
        </Block>

        <Block>
          <H2>Our Philosophy</H2>
          <P>
            Every jar of Irek's honey is raw and unfiltered. That means it's never
            heated above hive temperature, never ultra-filtered, and never blended
            with honey from other sources. The pollen, enzymes, and antioxidants
            that make raw honey special? They're all still in there.
          </P>
          <P>
            We believe in transparency. You can trace every jar back to our
            apiaries in Vestal, NY. We harvest by hand, bottle the same day, and
            put the harvest date on every label.
          </P>
        </Block>

        <Block>
          <H2>Sustainability</H2>
          <P>
            Healthy bees make great honey. We practice sustainable beekeeping: no
            chemicals, no antibiotics, and no corner-cutting. Our bees forage on
            spring blossoms, summer wildflowers, and fall goldenrod across the
            rolling hills of upstate New York.
          </P>
          <P>
            We never take more than the bees can spare, and we leave plenty of
            honey for them to get through the winter. It's slower. It produces
            less. But the result speaks for itself.
          </P>
        </Block>
      </Content>
    </PageWrapper>
  );
}

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space.xl};
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
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.7;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space['4xl']};
`;

const Block = styled.div`
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const P = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.space.md};
  opacity: 0.85;
`;
