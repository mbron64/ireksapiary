import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, BUNDLE } from '../../config/products';

export default function Shop() {
  const { addToCart } = useCart();

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
    <PageWrapper announcement="Free shipping on honey orders over $50" announcementLink="/shop">
      <Header>
        <Label>The Collection</Label>
        <Title>Shop All Honey</Title>
        <Subtitle>
          Small batch, raw & unfiltered. Harvested in Vestal, NY since 2012.
        </Subtitle>
      </Header>

      <Grid>
        {Object.values(PRODUCTS).map(product => (
          <Card key={product.id}>
            <ImageWrap>
              <Link to={`/products/${product.slug}`}>
                <Img src={product.images[0]} alt={product.name} />
              </Link>
            </ImageWrap>
            <Info>
              <Tag>{product.tagline}</Tag>
              <Name to={`/products/${product.slug}`}>{product.name}</Name>
              <Desc>{product.description}</Desc>
              <PriceRow>
                <Price>${product.basePrice}</Price>
                <Size>{product.variants['8oz'].size}</Size>
              </PriceRow>
              <AddBtn onClick={() => handleQuickAdd(product)}>Add to Cart</AddBtn>
            </Info>
          </Card>
        ))}
      </Grid>

      {/* Bundle section */}
      <BundleBanner>
        <BundleInner>
          <BundleLabel>Save 15%</BundleLabel>
          <BundleTitle>Get all three · {BUNDLE.name}</BundleTitle>
          <BundleDesc>{BUNDLE.description}</BundleDesc>
          <BundlePricing>
            <BundleOld>${BUNDLE.fullPrice}</BundleOld>
            <BundleNew>${BUNDLE.price}</BundleNew>
          </BundlePricing>
          <BundleCTA to="/bundle/trio">Shop the Trio</BundleCTA>
        </BundleInner>
      </BundleBanner>
    </PageWrapper>
  );
}

const Header = styled.div`
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

const Grid = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['3xl']};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  transition: box-shadow ${({ theme }) => theme.transitions.base};
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const ImageWrap = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.xl};
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  height: 260px;
  width: auto;
  object-fit: contain;
  transition: transform ${({ theme }) => theme.transitions.base};
  ${Card}:hover & { transform: scale(1.02); }
`;

const Info = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`;

const Name = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: ${({ theme }) => theme.space.xs} 0 ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.brown};
`;

const Desc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 500;
`;

const Size = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
`;


const AddBtn = styled.button`
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

const BundleBanner = styled.section`
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
`;

const BundleInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  text-align: center;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl};
`;

const BundleLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const BundleTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, ${({ theme }) => theme.fontSizes['3xl']});
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.cream};
`;

const BundleDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.7;
  max-width: 500px;
  margin: 0 auto ${({ theme }) => theme.space.lg};
  line-height: 1.5;
`;

const BundlePricing = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const BundleOld = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-decoration: line-through;
  opacity: 0.4;
`;

const BundleNew = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gold};
`;

const BundleCTA = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.9; }
`;
