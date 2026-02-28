import React from 'react';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, BUNDLE } from '../../config/products';

export default function HoneyTrio() {
  const { addToCart } = useCart();

  const handleAddBundle = () => {
    BUNDLE.products.forEach(slug => {
      const product = PRODUCTS[slug];
      const variant = product.variants['8oz'];
      addToCart({
        id: `${product.id}-trio`,
        name: `${product.name} (Trio)`,
        variant: variant.id,
        size: variant.size,
        price: +(product.basePrice * (1 - BUNDLE.discount)).toFixed(2),
        image: product.images[0],
        stripePriceId: variant.stripePriceId,
      });
    });
  };

  return (
    <PageWrapper announcement="Save 15% with The Honey Trio">
      <SEO
        title="The Honey Trio | All Three Harvests"
        description="One jar of each: Spring, Summer, and Fall honey. The complete Irek's Apiary experience. Save 15% on the bundle."
        path="/bundle/trio"
      />
      <Hero>
        <HeroContent>
          <Label>Save 15%</Label>
          <Title>The Honey Trio</Title>
          <Description>{BUNDLE.description}</Description>
          <Pricing>
            <OldPrice>${BUNDLE.fullPrice}</OldPrice>
            <NewPrice>${BUNDLE.price}</NewPrice>
          </Pricing>
          <AddBtn onClick={handleAddBundle}>Add Trio to Cart</AddBtn>
        </HeroContent>
        <HeroImages>
          <JarImg src="/assets/products/honey1.png" alt="Spring" $rotate={-8} />
          <JarImg src="/assets/products/honey5.png" alt="Summer" $rotate={0} $z={2} />
          <JarImg src="/assets/products/honey9.png" alt="Fall" $rotate={8} />
        </HeroImages>
      </Hero>

      <Section>
        <SectionTitle>What's Inside</SectionTitle>
        <ProductList>
          {BUNDLE.products.map(slug => {
            const p = PRODUCTS[slug];
            return (
              <ProductItem key={slug}>
                <ProductImg src={p.images[0]} alt={p.name} />
                <ProductInfo>
                  <ProductTag>{p.tagline}</ProductTag>
                  <ProductName>{p.name}</ProductName>
                  <ProductDesc>{p.description}</ProductDesc>
                  <ProductPrice>
                    <s>${p.basePrice}</s>
                    <span>${(p.basePrice * (1 - BUNDLE.discount)).toFixed(2)}</span>
                  </ProductPrice>
                </ProductInfo>
              </ProductItem>
            );
          })}
        </ProductList>
      </Section>

      <TestimonialSection>
        <TestQuote>
          "Got the trio as a gift and now I'm subscribed. The spring is my
          morning toast honey, summer goes in tea, and the fall honey is
          incredible on cheese."
        </TestQuote>
        <TestAuthor>Jamie K., Ithaca</TestAuthor>
      </TestimonialSection>

      <CTASection>
        <CTATitle>Try all three for ${BUNDLE.price}</CTATitle>
        <AddBtn onClick={handleAddBundle}>Add Trio to Cart</AddBtn>
      </CTASection>
    </PageWrapper>
  );
}

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl};
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 480px;
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

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.space.lg};
  max-width: 460px;
`;

const Pricing = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const OldPrice = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-decoration: line-through;
  opacity: 0.4;
`;

const NewPrice = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gold};
`;

const AddBtn = styled.button`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
`;

const HeroImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0;
  padding: ${({ theme }) => theme.space.xl};
`;

const JarImg = styled.img`
  height: 240px;
  width: auto;
  transform: rotate(${({ $rotate }) => $rotate || 0}deg);
  margin: 0 -20px;
  z-index: ${({ $z }) => $z || 1};
  filter: drop-shadow(0 8px 16px rgba(60, 42, 33, 0.12));

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 160px;
    margin: 0 -12px;
  }
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

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: ${({ theme }) => theme.space.xl};
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 80px 1fr;
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const ProductInfo = styled.div``;

const ProductTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: ${({ theme }) => theme.space.xs} 0 ${({ theme }) => theme.space.sm};
`;

const ProductDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const ProductPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  s { opacity: 0.4; margin-right: ${({ theme }) => theme.space.sm}; }
  span { color: ${({ theme }) => theme.colors.gold}; font-weight: 600; }
`;

const TestimonialSection = styled.section`
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl};
`;

const TestQuote = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 2.5vw, ${({ theme }) => theme.fontSizes['2xl']});
  font-style: italic;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const TestAuthor = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.5;
`;

const CTASection = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space['3xl']};
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;
