import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiHoneyJar, GiHoneycomb, GiBee } from 'react-icons/gi';
import { useCart } from '../../context/CartContext';
import AnnouncementBar from '../shared/AnnouncementBar';
import SharedHeader from '../shared/SharedHeader';
import NewsletterFooter from '../shared/NewsletterFooter';
import Footer from '../shared/Footer';

// Main styled components
const HomeContainer = styled.div`
  background-color: #f4e8c4;
  color: #3b2f20;
  font-family: 'Crimson Text', 'Times New Roman', serif;
`;

const Section = styled.section`
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Hero = styled.div`
  text-align: center;
  padding: 4rem 1rem 6rem;
`;

const HeroTitle = styled.h2`
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 500;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #3b2f20;
  color: #f4e8c4;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #584a38;
  }
`;

const FeaturedSection = styled.div`
  text-align: center;
  padding: 1rem 0 3rem;
`;

const SectionLabel = styled.span`
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const SectionTitle = styled.h3`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductCard = styled.div`
  text-align: center;
  padding: 1.5rem;
`;

const ProductImage = styled.div`
  height: 300px;
  background-color: #ede0b3;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ProductType = styled.span`
  font-size: 0.9rem;
  color: #584a38;
  display: block;
  margin-bottom: 0.75rem;
`;

const ProductPrice = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ComparisonSection = styled.div`
  padding: 3rem 0;
  overflow-x: auto;
`;

const ComparisonTable = styled.div`
  display: flex;
  min-width: 768px;
  max-width: 1000px;
  margin: 0 auto;
  gap: 1.5rem;
`;

const ComparisonColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const ComparisonHeader = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  h4 {
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
`;

const ComparisonItem = styled.div`
  padding: 1rem 0;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e5d8b0;
  font-size: 0.9rem;
`;

const FactSection = styled.div`
  background-color: #ede0b3;
  padding: 4rem 0;
  text-align: center;
`;

const FactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Fact = styled.div`
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const AboutSection = styled.div`
  text-align: center;
  padding: 5rem 0;
`;


// Add to Cart button (actual button, not link)
const AddToCartButton = styled.button`
  display: inline-block;
  background: transparent;
  color: #3b2f20;
  border: 1px solid #3b2f20;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: all 0.2s;
  cursor: pointer;
  font-family: 'Crimson Text', 'Times New Roman', serif;
  
  &:hover {
    background-color: #3b2f20;
    color: #f4e8c4;
  }
`;

const ViewDetailsLink = styled(Link)`
  display: inline-block;
  color: #3b2f20;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
  border-bottom: 1px solid #3b2f20;
  transition: opacity 0.2s;
  font-family: 'Crimson Text', 'Times New Roman', serif;
  
  &:hover {
    opacity: 0.7;
  }
`;

function Home() {
  const { addToCart, toggleCart, getCartTotals } = useCart();
  const { itemCount } = getCartTotals();
  
  // Handler for adding products to cart from home page
  const handleAddToCart = (productId, productName, price) => {
    console.log(`🛒 Adding ${productName} to cart`);
    
    const productDetails = {
      id: productId,
      name: productName,
      variant: 'jar',
      size: '8oz',
      shopifyVariantId: `placeholder-${productId}`, // Placeholder for now
      quantity: 1,
      price: price
    };
    
    addToCart(productDetails, 1);
  };
  
  return (
    <HomeContainer>
      <AnnouncementBar message="🐝 SPRING HARVEST NOW AVAILABLE - LIMITED BATCH" />
      <SharedHeader logoLink="/" />
      
      <Hero>
        <HeroTitle>Meet "Wildflower" — the essence of summer in every drop.</HeroTitle>
        <Button to="/products/wildflower">SHOP WILDFLOWER</Button>
      </Hero>
      
      <Section>
        <FeaturedSection>
          <SectionLabel>THE DO-IT-ALL SET</SectionLabel>
          <SectionTitle>The Honey Trio</SectionTitle>
          <p>Three distinct honeys for all your drizzling, baking, and sweetening needs.</p>
          <p style={{ fontSize: '0.9rem', color: '#584a38', marginTop: '0.5rem' }}>
            Save 15% when you get all three
          </p>
          <Button to="/bundle/trio">Shop The Trio</Button>
        </FeaturedSection>
      </Section>
      
      <Section>
        <FeaturedSection>
          <SectionLabel>YOU ASKED FOR IT</SectionLabel>
          <SectionTitle>
            <em>New!</em> "Wildflower"
          </SectionTitle>
          <p>Rich, aromatic, and bursting with floral notes. Our signature honey is a celebration of local wildflowers.</p>
          <p style={{ fontSize: '0.9rem', color: '#584a38', marginTop: '0.5rem', fontStyle: 'italic' }}>
            "Finally, honey that tastes like the flowers it came from!" - Sarah M.
          </p>
          <Button to="/products/wildflower">Shop Wildflower</Button>
        </FeaturedSection>
      </Section>
      
      <Section>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', padding: '2rem 0' }}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'EB Garamond, serif', fontWeight: '500' }}>
            Happy Bees, Happy Honey
          </h3>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            The best flowers make the best honey. We particularly love wildflowers with complex, floral tasting notes!
          </p>
          
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'EB Garamond, serif', fontWeight: '500', marginTop: '3rem' }}>
            Fresh Is Best
          </h3>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Our honey is harvested from local apiaries in California's Central Valley — then bottled and shipped directly to your door.
          </p>
          
          <h3 style={{ fontStyle: 'italic', fontWeight: 'normal', marginTop: '3rem', fontSize: '2rem', fontFamily: 'EB Garamond, serif' }}>
            Honey the way it should be:<br />
            Always raw, never blended, 100% pure
          </h3>
        </div>
        
        <ProductGrid>
          <ProductCard>
            <ProductImage>
              <GiHoneyJar style={{ fontSize: '6rem', color: '#b38728' }} />
            </ProductImage>
            <ProductTitle>"Wildflower"</ProductTitle>
            <ProductType>Finishing Honey</ProductType>
            <ProductPrice>$18</ProductPrice>
            <p style={{ fontWeight: '500' }}>Floral | 8oz</p>
            <p>Made for drizzling, never cooking. A celebration of local wildflowers.</p>
            <AddToCartButton onClick={() => handleAddToCart('wildflower-honey', '"Wildflower" Premium Honey', 18)}>
              Add to Cart
            </AddToCartButton>
            <ViewDetailsLink to="/products/wildflower">View Details →</ViewDetailsLink>
          </ProductCard>
          
          <ProductCard>
            <ProductImage>
              <GiHoneycomb style={{ fontSize: '6rem', color: '#b38728' }} />
            </ProductImage>
            <ProductTitle>"Clover"</ProductTitle>
            <ProductType>Everyday Honey</ProductType>
            <ProductPrice>$14</ProductPrice>
            <p style={{ fontWeight: '500' }}>Mild | 8oz</p>
            <p>Use it every day, in every way. Perfect for tea, coffee, and baking.</p>
            <AddToCartButton onClick={() => handleAddToCart('clover-honey', '"Clover" Everyday Honey', 14)}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
          
          <ProductCard>
            <ProductImage>
              <GiBee style={{ fontSize: '6rem', color: '#b38728' }} />
            </ProductImage>
            <ProductTitle>"Forest"</ProductTitle>
            <ProductType>Culinary Honey</ProductType>
            <ProductPrice>$22</ProductPrice>
            <p style={{ fontWeight: '500' }}>Complex | 8oz</p>
            <p>Your new cooking hero. Rich flavor for marinades and glazes.</p>
            <AddToCartButton onClick={() => handleAddToCart('forest-honey', '"Forest" Specialty Honey', 22)}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
        </ProductGrid>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Button to="/shop">Shop All ➛</Button>
        </div>
      </Section>
      
      <Section>
        <ComparisonSection>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Us Vs Them</h3>
          <p style={{ textAlign: 'center', marginBottom: '3rem' }}>Single-source honey that's made to be enjoyed, not stored away.</p>
          
          <ComparisonTable>
            <ComparisonColumn>
              <ComparisonItem style={{ fontWeight: 'bold' }}>Sourcing</ComparisonItem>
              <ComparisonItem>Freshness</ComparisonItem>
              <ComparisonItem>Price</ComparisonItem>
              <ComparisonItem>Health Benefits</ComparisonItem>
              <ComparisonItem>Sustainable</ComparisonItem>
            </ComparisonColumn>
            
            <ComparisonColumn>
              <ComparisonHeader>
                <div>
                  <div style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>🏪</div>
                  <h4>Store Honey</h4>
                </div>
              </ComparisonHeader>
              <ComparisonItem>Blended from multiple sources</ComparisonItem>
              <ComparisonItem>Often heated, losing enzymes</ComparisonItem>
              <ComparisonItem>$</ComparisonItem>
              <ComparisonItem>✗</ComparisonItem>
              <ComparisonItem>✗</ComparisonItem>
            </ComparisonColumn>
            
            <ComparisonColumn>
              <ComparisonHeader>
                <div>
                  <div style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>🐝</div>
                  <h4>Irek's Apiary</h4>
                </div>
              </ComparisonHeader>
              <ComparisonItem>Single-source, traceable</ComparisonItem>
              <ComparisonItem>ALWAYS raw & unfiltered</ComparisonItem>
              <ComparisonItem>$$</ComparisonItem>
              <ComparisonItem>✓</ComparisonItem>
              <ComparisonItem>100%</ComparisonItem>
            </ComparisonColumn>
            
            <ComparisonColumn>
              <ComparisonHeader>
                <div>
                  <div style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>💎</div>
                  <h4>Luxury Honey</h4>
                </div>
              </ComparisonHeader>
              <ComparisonItem>✓</ComparisonItem>
              <ComparisonItem>Sometimes...</ComparisonItem>
              <ComparisonItem>$$$$$$</ComparisonItem>
              <ComparisonItem>✓</ComparisonItem>
              <ComparisonItem>✗</ComparisonItem>
            </ComparisonColumn>
            
            <ComparisonColumn>
              <ComparisonHeader>
                <div>
                  <div style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>🧪</div>
                  <h4>Artificial Sweeteners</h4>
                </div>
              </ComparisonHeader>
              <ComparisonItem>Lab-created chemicals</ComparisonItem>
              <ComparisonItem>Shelf-stable for years</ComparisonItem>
              <ComparisonItem>$</ComparisonItem>
              <ComparisonItem>The petroleum of sweeteners</ComparisonItem>
              <ComparisonItem>✗</ComparisonItem>
            </ComparisonColumn>
          </ComparisonTable>
        </ComparisonSection>
      </Section>
      
      <FactSection>
        <FactGrid>
          <Fact>Bees visit about 2 million flowers to make just one pound of honey. Talk about dedication!</Fact>
          <Fact>A single worker bee makes only 1/12th of a teaspoon of honey in her lifetime. Every drop is precious.</Fact>
          <Fact>Honey is the only food that never spoils. 3,000-year-old honey found in Egyptian tombs was still perfectly edible!</Fact>
          <Fact>Raw honey contains enzymes and antioxidants that are destroyed when heated above 95°F. We never heat ours.</Fact>
          <Fact>Bees are actually really good dancers. They use the "waggle dance" to tell their friends where the best flowers are. Pretty cute, right??!</Fact>
        </FactGrid>
      </FactSection>
      
      <AboutSection>
        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Made by people who take bees very seriously.</h3>
        <Button to="/about">Learn More About Us</Button>
      </AboutSection>
      
      <NewsletterFooter />
      <Footer />
    </HomeContainer>
  );
}

export default Home; 