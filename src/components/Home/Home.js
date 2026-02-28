import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import JarCarousel from '../Products/JarCarousel';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, BUNDLE } from '../../config/products';
import { ACTIVE_HERO } from '../../config/heroes';

function renderHeadline(str) {
  return str.split('\n').flatMap((line, i, arr) => {
    const parts = line.split(/\*([^*]+)\*/).map((seg, j) =>
      j % 2 === 1 ? <em key={`${i}-${j}`}>{seg}</em> : seg
    );
    return i < arr.length - 1 ? [...parts, <br key={`br-${i}`} />] : parts;
  });
}

export default function Home() {
  const { addToCart } = useCart();
  const hero = ACTIVE_HERO;

  const handleQuickAdd = (product, variantKey = '8oz') => {
    const variant = product.variants[variantKey];
    addToCart({
      id: product.id,
      name: product.name,
      variant: variant.id,
      size: variant.size,
      price: variant.price,
      image: product.images[0],
      stripePriceId: variant.stripePriceId,
    });
  };

  return (
    <PageWrapper announcement="Spring 2026 Nucs · Limited Availability · Reserve Yours" announcementLink="/nucs">
      <SEO
        path="/"
        description="Raw, unfiltered honey and honeybee nucs from our apiary in Vestal, NY. Small-batch beekeeping since 2012. Free shipping on honey orders over $50."
      />
      <Hero>
        <HeroContent>
          <HeroTagline>{hero.tagline}</HeroTagline>
          <HeroTitle>{renderHeadline(hero.headline)}</HeroTitle>
          <HeroCTA to={hero.cta.to}>{hero.cta.label}</HeroCTA>
        </HeroContent>
        <HeroImage>
          {hero.image.type === 'carousel' ? (
            <JarCarousel
              images={hero.image.images}
              alt={hero.image.alt}
              autoSpin={true}
              autoSpinInterval={400}
              size="large"
            />
          ) : (
            <HeroImg src={hero.image.src} alt={hero.image.alt} />
          )}
        </HeroImage>
      </Hero>

      <Section>
        <SectionTitle>Straight from the Hive</SectionTitle>

        <ProductGrid>
          {Object.values(PRODUCTS).map(product => (
            <ProductCard key={product.id}>
              <CardImageWrap>
                <Link to={`/products/${product.slug}`}>
                  <CardImage src={product.images[0]} alt={product.name} />
                </Link>
              </CardImageWrap>
              <CardInfo>
                <CardTag>{product.tagline}</CardTag>
                <CardName to={`/products/${product.slug}`}>{product.name}</CardName>
                <CardPrice>From ${product.basePrice}</CardPrice>
                <AddButton onClick={() => handleQuickAdd(product)}>
                  Add to Cart
                </AddButton>
              </CardInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Section>

      <BundleSection>
        <BundleContent>
          <BundleTitle>The Honey Trio</BundleTitle>
          <BundleText>{BUNDLE.description}</BundleText>
          <BundlePrice>
            <OldPrice>${BUNDLE.fullPrice}</OldPrice>
            <NewPrice>${BUNDLE.price}</NewPrice>
          </BundlePrice>
          <BundleCTA to="/bundle/trio">Get the Trio</BundleCTA>
        </BundleContent>
        <BundleImages>
          <JarCarousel images={PRODUCTS.spring.images} alt="Honey trio" autoSpin />
        </BundleImages>
      </BundleSection>

      <Section>
        <SectionTitle>Raw vs. Commercial</SectionTitle>

        <ComparisonGrid>
          <CompCard>
            <CompLabel>Irek's Raw Honey</CompLabel>
            <CompList>
              <li>Never heated above hive temperature</li>
              <li>Contains natural pollen, enzymes & antioxidants</li>
              <li>Single-source, traceable origin</li>
              <li>Crystallizes naturally over time</li>
              <li>Small batch, hand-harvested</li>
            </CompList>
          </CompCard>
          <CompCard $muted>
            <CompLabel>Store-Bought Honey</CompLabel>
            <CompList>
              <li>Ultra-filtered and pasteurized</li>
              <li>Pollen and nutrients removed</li>
              <li>Often blended from multiple countries</li>
              <li>Additives to prevent crystallization</li>
              <li>Mass-produced</li>
            </CompList>
          </CompCard>
        </ComparisonGrid>
      </Section>

      <TestimonialSection>
        <TestimonialQuote>
          "The best honey I've ever tasted. Each season tastes completely different.
          Once you try real raw honey, there's no going back."
        </TestimonialQuote>
        <TestimonialAuthor>Sarah M., Binghamton</TestimonialAuthor>
      </TestimonialSection>
    </PageWrapper>
  );
}

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerH});
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl};
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
    min-height: auto;
    padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
  }
`;

const HeroContent = styled.div``;

const HeroTagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.6;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.8rem, 6vw, ${({ theme }) => theme.fontSizes['5xl']});
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.space.xl};

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const HeroCTA = styled(Link)`
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

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroImg = styled.img`
  max-width: 100%;
  max-height: 520px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 16px 32px rgba(60, 42, 33, 0.12));

  @media (max-width: 768px) {
    max-height: 360px;
  }
`;

const Section = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.space.xl};
`;

const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  transition: box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CardImageWrap = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.lg};
  display: flex;
  justify-content: center;
`;

const CardImage = styled.img`
  height: 240px;
  width: auto;
  object-fit: contain;
`;

const CardInfo = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const CardTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`;

const CardName = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: ${({ theme }) => theme.space.xs} 0;
  color: ${({ theme }) => theme.colors.brown};
`;

const CardPrice = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const AddButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.cream};
  }
`;

const BundleSection = styled.section`
  background: ${({ theme }) => theme.colors.creamDark};
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const BundleContent = styled.div`
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

const BundleTitle = styled.h2`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const BundleText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.space.lg};
  max-width: 480px;
`;

const BundlePrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};

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

const BundleCTA = styled(Link)`
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

const BundleImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.xl};
  max-height: 400px;

  img {
    max-height: 400px;
    width: auto;
    filter: drop-shadow(0 12px 24px rgba(60, 42, 33, 0.12));
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CompCard = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme, $muted }) =>
    $muted ? theme.colors.brownLight : theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.md};
  opacity: ${({ $muted }) => ($muted ? 0.6 : 1)};
`;

const CompLabel = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const CompList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};

  li {
    padding-left: ${({ theme }) => theme.space.lg};
    position: relative;
    line-height: 1.5;

    &::before {
      content: '·';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

const TestimonialSection = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};
  max-width: 720px;
  margin: 0 auto;
`;

const TestimonialQuote = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, ${({ theme }) => theme.fontSizes['2xl']});
  font-style: italic;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const TestimonialAuthor = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: 0.05em;
  opacity: 0.5;
`;
