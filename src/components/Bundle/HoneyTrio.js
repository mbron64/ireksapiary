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

const Hero = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #584a38;
`;

const BundleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  border: 2px solid #3b2f20;
`;

const ProductIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #b38728;
`;

const ProductName = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ProductType = styled.div`
  font-size: 1rem;
  color: #584a38;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.85rem;
`;

const ProductDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: #6e6655;
  font-size: 1.1rem;
`;

const BundlePrice = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #3b2f20;
  margin: 1rem 0;
`;

const Savings = styled.div`
  background: #3b2f20;
  color: #f4e8c4;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const BundleInfo = styled.div`
  background: rgba(59, 47, 32, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
`;

const BundleFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  max-width: 600px;
  margin: 2rem auto;
  
  li {
    padding: 0.75rem 0;
    border-bottom: 1px dashed #d0c8b5;
    font-size: 1.05rem;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:before {
      content: '🍯 ';
      margin-right: 0.5rem;
    }
  }
`;

const AddToCartButton = styled.button`
  background: #3b2f20;
  color: #f4e8c4;
  border: none;
  padding: 1.25rem 3rem;
  font-size: 1.2rem;
  border-radius: 3rem;
  cursor: pointer;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  margin: 2rem 0;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 47, 32, 0.3);
  }
`;

const Testimonial = styled.div`
  font-style: italic;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  
  &:before {
    content: '"';
    font-size: 3rem;
    color: #b38728;
    line-height: 0;
  }
  
  &:after {
    content: '"';
    font-size: 3rem;
    color: #b38728;
    line-height: 0;
  }
`;

function HoneyTrio() {
  const { addToCart, toggleCart, getCartTotals } = useCart();
  const { itemCount } = getCartTotals();

  const handleAddBundle = () => {
    console.log('🎁 Adding Honey Trio Bundle to cart');
    
    // Add all three products as a bundle
    const bundleItems = [
      {
        id: 'wildflower-honey',
        name: '"Wildflower" Premium Honey',
        variant: 'jar',
        size: '8oz',
        shopifyVariantId: 'placeholder-wildflower',
        quantity: 1,
        price: 15.30 // Bundle discount price
      },
      {
        id: 'clover-honey',
        name: '"Clover" Everyday Honey',
        variant: 'jar',
        size: '8oz',
        shopifyVariantId: 'placeholder-clover',
        quantity: 1,
        price: 11.90 // Bundle discount price
      },
      {
        id: 'forest-honey',
        name: '"Forest" Specialty Honey',
        variant: 'jar',
        size: '8oz',
        shopifyVariantId: 'placeholder-forest',
        quantity: 1,
        price: 18.70 // Bundle discount price
      }
    ];

    bundleItems.forEach(item => addToCart(item, 1));
  };

  const originalPrice = 18 + 14 + 22; // $54
  const bundlePrice = 45.90; // 15% off
  const savings = originalPrice - bundlePrice;

  return (
    <PageContainer>
      <AnnouncementBar 
        message="💰 SAVE 15% - THE COMPLETE HONEY COLLECTION"
        bgColor="#b38728"
        textColor="#fff"
      />
      <SharedHeader />

      <Hero>
        <Title>The Honey Trio</Title>
        <Subtitle>Three honeys for all your drizzling, baking, and sweetening</Subtitle>
        <Savings>Save ${savings.toFixed(2)} with this bundle</Savings>
      </Hero>

      <BundleGrid>
        <ProductCard>
          <ProductIcon><GiHoneyJar /></ProductIcon>
          <ProductName>"Wildflower"</ProductName>
          <ProductType>Finishing Honey</ProductType>
          <ProductDescription>
            Punchy & floral. Made for drizzling, never cooking. Perfect over yogurt, cheese, and desserts.
          </ProductDescription>
        </ProductCard>

        <ProductCard>
          <ProductIcon><GiHoneycomb /></ProductIcon>
          <ProductName>"Clover"</ProductName>
          <ProductType>Everyday Honey</ProductType>
          <ProductDescription>
            Mellow & sweet. Use it every day, in every way. Perfect for tea, coffee, and baking.
          </ProductDescription>
        </ProductCard>

        <ProductCard>
          <ProductIcon><GiBee /></ProductIcon>
          <ProductName>"Forest"</ProductName>
          <ProductType>Culinary Honey</ProductType>
          <ProductDescription>
            Rich & complex. Your new cooking hero. Ideal for marinades, glazes, and specialty recipes.
          </ProductDescription>
        </ProductCard>
      </BundleGrid>

      <BundleInfo>
        <OriginalPrice>Normally ${originalPrice}</OriginalPrice>
        <BundlePrice>${bundlePrice.toFixed(2)}</BundlePrice>
        
        <BundleFeatures>
          <li>One 8oz jar of each honey variety</li>
          <li>Save 15% compared to buying individually</li>
          <li>Perfect for discovering your favorite</li>
          <li>Makes an excellent gift</li>
          <li>Free shipping on this bundle</li>
        </BundleFeatures>

        <AddToCartButton onClick={handleAddBundle}>
          Add Trio to Cart - ${bundlePrice.toFixed(2)}
        </AddToCartButton>
      </BundleInfo>

      <Testimonial>
        I can't decide which honey I love more, so I just get all three every month. The Wildflower on my morning toast is life-changing, and the Forest honey makes the best marinades!
        <div style={{ marginTop: '1rem', fontSize: '1rem', fontStyle: 'normal', color: '#584a38' }}>
          — Rachel K., Sacramento
        </div>
      </Testimonial>

      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'EB Garamond, serif' }}>
          Want to learn more about each honey?
        </h3>
        <Link to="/shop" style={{ 
          color: '#3b2f20', 
          fontSize: '1.1rem', 
          textDecoration: 'underline',
          fontWeight: '500'
        }}>
          View Individual Products →
        </Link>
      </div>

      <NewsletterFooter />
      <Footer />
    </PageContainer>
  );
}

export default HoneyTrio;
