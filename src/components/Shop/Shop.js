import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiHoneyJar, GiHoneycomb, GiBee } from 'react-icons/gi';
import { useCart } from '../../context/CartContext';
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

const FeaturedBundle = styled.div`
  background: #3b2f20;
  color: #f4e8c4;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🍯';
    position: absolute;
    font-size: 15rem;
    opacity: 0.05;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BundleContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
`;

const BundleLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #b38728;
`;

const BundleTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const BundleSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const BundleSavings = styled.div`
  background: #b38728;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const BundleButton = styled(Link)`
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

const Hero = styled.div`
  text-align: center;
  padding: 3rem 2rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #584a38;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem 4rem;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-8px);
    border-color: #3b2f20;
    box-shadow: 0 8px 24px rgba(59, 47, 32, 0.15);
  }
`;

const ProductIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  color: #b38728;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1rem 0;
`;

const Button = styled(Link)`
  display: inline-block;
  background: #3b2f20;
  color: #f4e8c4;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const AddToCartBtn = styled.button`
  background: transparent;
  color: #3b2f20;
  border: 1px solid #3b2f20;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  font-weight: 500;
  margin-top: 1rem;
  
  &:hover {
    background: #3b2f20;
    color: #f4e8c4;
  }
`;

const FactSection = styled.section`
  background: #ede0b3;
  padding: 4rem 2rem;
  text-align: center;
`;

const FactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Fact = styled.div`
  padding: 1.5rem;
  font-size: 1.05rem;
  line-height: 1.6;
`;

const AboutSection = styled.section`
  text-align: center;
  padding: 5rem 2rem;
  background: #f4e8c4;
`;

const AboutTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const LearnMoreButton = styled(Link)`
  display: inline-block;
  background: #3b2f20;
  color: #f4e8c4;
  padding: 1rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

function Shop() {
  const { addToCart } = useCart();

  const handleAddToCart = (productId, productName, price) => {
    const productDetails = {
      id: productId,
      name: productName,
      variant: 'jar',
      size: '8oz',
      shopifyVariantId: `placeholder-${productId}`,
      quantity: 1,
      price: price
    };
    addToCart(productDetails, 1);
  };

  return (
    <PageContainer>
      <AnnouncementBar message="🍯 FREE SHIPPING ON ORDERS OVER $50" />
      <SharedHeader />

      <FeaturedBundle>
        <BundleContent>
          <BundleLabel>⭐ The Do-It-All Set</BundleLabel>
          <BundleTitle>The Honey Trio</BundleTitle>
          <BundleSubtitle>
            Three distinct honeys for all your drizzling, baking, and sweetening
          </BundleSubtitle>
          <BundleSavings>Save 15% - Only $45.90</BundleSavings>
          <br />
          <BundleButton to="/bundle/trio">Get The Trio</BundleButton>
        </BundleContent>
      </FeaturedBundle>

      <div style={{ 
        textAlign: 'center', 
        padding: '2.5rem 2rem 1rem',
        borderBottom: '1px dashed #d0c8b5'
      }}>
        <h3 style={{ 
          fontFamily: 'EB Garamond, serif',
          fontSize: '1.8rem',
          marginBottom: '0.5rem',
          fontWeight: '500'
        }}>
          Individual Honeys
        </h3>
        <p style={{ fontSize: '1rem', color: '#584a38' }}>
          Or shop by the jar
        </p>
      </div>

      <ProductGrid>
        <ProductCard>
          <ProductIcon><GiHoneyJar /></ProductIcon>
          <ProductTitle>"Wildflower" Premium</ProductTitle>
          <ProductPrice>$18</ProductPrice>
          <p>Floral & aromatic, perfect for drizzling</p>
          <Button to="/products/wildflower">View Details</Button>
          <AddToCartBtn onClick={() => handleAddToCart('wildflower-honey', '"Wildflower" Premium Honey', 18)}>
            Quick Add
          </AddToCartBtn>
        </ProductCard>

        <ProductCard>
          <ProductIcon><GiHoneycomb /></ProductIcon>
          <ProductTitle>"Clover" Everyday</ProductTitle>
          <ProductPrice>$14</ProductPrice>
          <p>Mild & sweet, perfect for everyday use</p>
          <AddToCartBtn onClick={() => handleAddToCart('clover-honey', '"Clover" Everyday Honey', 14)}>
            Add to Cart
          </AddToCartBtn>
        </ProductCard>

        <ProductCard>
          <ProductIcon><GiBee /></ProductIcon>
          <ProductTitle>"Forest" Specialty</ProductTitle>
          <ProductPrice>$22</ProductPrice>
          <p>Rich & complex, unique flavor profile</p>
          <AddToCartBtn onClick={() => handleAddToCart('forest-honey', '"Forest" Specialty Honey', 22)}>
            Add to Cart
          </AddToCartBtn>
        </ProductCard>
      </ProductGrid>

      <FactSection>
        <FactGrid>
          <Fact>
            A single bee visits about 2 million flowers to make just one pound of honey. Talk about dedication!
          </Fact>
          <Fact>
            Honey is the only food that never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs — still perfectly edible!
          </Fact>
          <Fact>
            Raw honey contains beneficial enzymes that are destroyed when heated above 95°F. We never heat ours. Fresh is best!
          </Fact>
          <Fact>
            Bees use the "waggle dance" to tell their friends where the best flowers are. Pretty cute, right??!
          </Fact>
        </FactGrid>
      </FactSection>

      <AboutSection>
        <AboutTitle>Made by people who take bees very seriously.</AboutTitle>
        <LearnMoreButton to="/about">Learn More About Us</LearnMoreButton>
      </AboutSection>

      <NewsletterFooter />
      <Footer />
    </PageContainer>
  );
}

export default Shop;
