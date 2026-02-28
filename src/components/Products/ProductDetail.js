import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import JarCarousel from './JarCarousel';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, calculatePrice, SUBSCRIPTION_DISCOUNT } from '../../config/products';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS[slug];

  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('8oz');
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);

  const pricing = useMemo(
    () => product ? calculatePrice(product, selectedVariant, quantity, isSubscription) : null,
    [product, selectedVariant, quantity, isSubscription]
  );

  if (!product) return <Navigate to="/shop" replace />;

  const variantKeys = Object.keys(product.variants);
  const variant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      variant: variant.id,
      size: variant.size,
      price: pricing.total / quantity,
      image: product.images[0],
      stripePriceId: variant.stripePriceId,
      isSubscription,
    }, quantity);
  };

  return (
    <PageWrapper announcement="Free shipping on honey orders over $50" announcementLink="/shop">
      <HeroGrid>
        <ImageCol>
          <JarCarousel images={product.images} alt={product.name} />
        </ImageCol>

        <PurchaseCol>
          <Tag>{product.tagline}</Tag>
          <ProductName>{product.name}</ProductName>
          <Origin>{product.origin} &middot; {product.harvest}</Origin>
          <Description>{product.description}</Description>

          <OptionLabel>Size</OptionLabel>
          <VariantRow>
            {variantKeys.map(key => {
              const v = product.variants[key];
              return (
                <VariantBtn
                  key={key}
                  $active={selectedVariant === key}
                  onClick={() => setSelectedVariant(key)}
                >
                  <span>{v.size}</span>
                  <small>${v.price}</small>
                </VariantBtn>
              );
            })}
          </VariantRow>

          <OptionLabel>Quantity</OptionLabel>
          <QuantityRow>
            {product.quantities.map(q => (
              <QuantityBtn
                key={q.qty}
                $active={quantity === q.qty}
                onClick={() => setQuantity(q.qty)}
              >
                <span>{q.label}</span>
                {q.discount > 0 && <Discount>Save {Math.round(q.discount * 100)}%</Discount>}
                {q.freeShipping && <FreeShip>Free shipping</FreeShip>}
              </QuantityBtn>
            ))}
          </QuantityRow>

          <SubToggle>
            <SubCheck
              type="checkbox"
              id="subscription"
              checked={isSubscription}
              onChange={e => setIsSubscription(e.target.checked)}
            />
            <SubLabel htmlFor="subscription">
              <SubTitle>Subscribe & Save {Math.round(SUBSCRIPTION_DISCOUNT * 100)}%</SubTitle>
              <SubDesc>Delivered monthly. Cancel anytime.</SubDesc>
            </SubLabel>
          </SubToggle>

          <PriceSummary>
            <PriceMain>${pricing.total.toFixed(2)}</PriceMain>
            {pricing.savings > 0 && (
              <PriceSavings>
                <s>${pricing.subtotal.toFixed(2)}</s> You save ${pricing.savings.toFixed(2)}
              </PriceSavings>
            )}
            {pricing.freeShipping && <ShipBadge>Free Shipping</ShipBadge>}
          </PriceSummary>

          <AddToCartBtn onClick={handleAddToCart}>
            Add to Cart · ${pricing.total.toFixed(2)}
          </AddToCartBtn>
        </PurchaseCol>
      </HeroGrid>

      <Section>
        <SectionTitle>Flavor Profile</SectionTitle>
        <FlavorGrid>
          {Object.entries(product.flavor).map(([key, value]) => (
            <FlavorItem key={key}>
              <FlavorName>{key}</FlavorName>
              <FlavorBar>
                <FlavorFill style={{ width: `${(value / 5) * 100}%` }} />
              </FlavorBar>
              <FlavorVal>{value}/5</FlavorVal>
            </FlavorItem>
          ))}
        </FlavorGrid>
      </Section>

      <DarkSection>
        <SectionTitle style={{ color: 'inherit' }}>Why Raw Matters</SectionTitle>
        <FeatureGrid>
          <Feature>
            <FeatureTitle>Never Heated</FeatureTitle>
            <FeatureText>
              Our honey never exceeds hive temperature, preserving all the natural
              enzymes, antioxidants, and pollen that make raw honey special.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Single Source</FeatureTitle>
            <FeatureText>
              Every jar is traceable to our apiaries in Vestal, NY.
              No blending, no imports. Just pure local honey.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Hand Harvested</FeatureTitle>
            <FeatureText>
              Small batch production means every jar gets personal attention.
              We harvest by hand and bottle the same day.
            </FeatureText>
          </Feature>
        </FeatureGrid>
      </DarkSection>

      <Section>
        <Testimonial>
          <TestQuote>
            "I've been buying Irek's honey for two years. You can taste the
            seasons change. Nothing in the store even comes close."
          </TestQuote>
          <TestAuthor>Mike R., Endicott</TestAuthor>
        </Testimonial>
      </Section>
    </PageWrapper>
  );
}

const HeroGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  min-height: 80vh;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ImageCol = styled.div`
  background: ${({ theme }) => theme.colors.creamDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space['2xl']};
  min-height: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 360px;
    padding: ${({ theme }) => theme.space.xl};
  }
`;

const PurchaseCol = styled.div`
  padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
  }
`;

const Tag = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const ProductName = styled.h1`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Origin = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.space.xl};
  max-width: 480px;
`;

const OptionLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const VariantRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const VariantBtn = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.brown : theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brown : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.cream : theme.colors.brown};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  span {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  small {
    display: block;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-top: ${({ theme }) => theme.space.xs};
    opacity: 0.7;
  }
`;

const QuantityRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const QuantityBtn = styled.button`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.sm};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.brown : theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brown : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.cream : theme.colors.brown};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  span {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const Discount = styled.small`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gold};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const FreeShip = styled(Discount)`
  color: ${({ theme }) => theme.colors.gold};
`;

const SubToggle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const SubCheck = styled.input`
  margin-top: 3px;
  accent-color: ${({ theme }) => theme.colors.gold};
  width: 18px;
  height: 18px;
`;

const SubLabel = styled.label`
  cursor: pointer;
`;

const SubTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
`;

const SubDesc = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const PriceSummary = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const PriceMain = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 500;
`;

const PriceSavings = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gold};
  margin-top: ${({ theme }) => theme.space.xs};

  s { opacity: 0.5; }
`;

const ShipBadge = styled.span`
  display: inline-block;
  margin-top: ${({ theme }) => theme.space.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  background: rgba(179, 135, 40, 0.1);
  color: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const AddToCartBtn = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
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

const FlavorGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  max-width: 500px;
  margin: 0 auto;
`;

const FlavorItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 40px;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

const FlavorName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-transform: capitalize;
`;

const FlavorBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.colors.creamDark};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`;

const FlavorFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: width 0.6s ease;
`;

const FlavorVal = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-align: right;
  opacity: 0.5;
`;

const DarkSection = styled.section`
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.div`
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.cream};
`;

const FeatureText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  opacity: 0.7;
`;

const Testimonial = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
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
  letter-spacing: 0.05em;
  opacity: 0.5;
`;
