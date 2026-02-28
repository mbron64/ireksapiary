import React, { useState } from 'react';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import { useCart } from '../../context/CartContext';

const NUC_PRICE = 190;
const BOX_DEPOSIT = 50;
const TOTAL_PER_NUC = NUC_PRICE + BOX_DEPOSIT;

const SPECS = [
  { label: '5 Deep Frames', value: 'Drawn comb, ready to work' },
  { label: 'Laying Queen', value: 'Locally adapted, mixed genetics' },
  { label: '~5,000 Bees', value: 'Foragers, nurses, the whole crew' },
  { label: 'Inspected', value: 'Healthy and verified before handoff' },
];

const FAQ_ITEMS = [
  {
    q: 'When do I pick up?',
    a: 'Late April through May, depending on weather and when the colonies are ready. We schedule pickups at dawn or dusk so the foragers are back in the box. You\'ll get an email to coordinate your window.',
  },
  {
    q: 'Where?',
    a: 'Our apiary in Vestal, NY, just outside Binghamton. We serve the Southern Tier and broader Upstate New York area. We don\'t ship live bees.',
  },
  {
    q: 'What should I bring?',
    a: 'Something to strap the box down in your car. That\'s it. We seal the nuc before handoff, so you just load and go. Once you\'re home, suit up and transfer the frames into your hive body within a few days. We\'ll send a guide before pickup day.',
  },
  {
    q: 'What about the $50 box deposit?',
    a: 'Fully refundable. Bring the box back to us before the end of the year and you get it all back. The $190 nuc purchase itself is non-refundable.',
  },
  {
    q: 'Can I order more than one?',
    a: 'Up to 5 per order. Need more? Get in touch.',
  },
];

export default function Nucs() {
  const { addToCart } = useCart();
  const [payNow, setPayNow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddToCart = () => {
    addToCart({
      id: 'nuc-box-deposit',
      name: 'Nuc Box Deposit',
      variant: 'nuc-box-deposit',
      size: 'Refundable',
      price: BOX_DEPOSIT,
      image: '/assets/nucs/nucs2.jpg',
      stripePriceId: process.env.REACT_APP_STRIPE_NUC_BOX_DEPOSIT_PRICE_ID || '',
      pickup: true,
    }, quantity);
    if (payNow) {
      addToCart({
        id: 'nuc',
        name: '5-Frame Nuc',
        variant: 'nuc',
        size: '5-frame',
        price: NUC_PRICE,
        image: '/assets/nucs/nucsFrame.jpg',
        stripePriceId: process.env.REACT_APP_STRIPE_NUC_PRICE_ID || '',
        pickup: true,
      }, quantity);
    }
  };

  return (
    <PageWrapper announcement="Spring 2026 Nucs · Limited Availability · Reserve Yours" announcementLink="/nucs">
      <SEO
        title="5-Frame Honeybee Nucs for Sale 2026 | Binghamton & Southern Tier, NY"
        description="Pre-order 5-frame honeybee nucs for spring 2026. Locally adapted queens, ~5,000 bees, $190 + refundable box deposit. Pickup in Vestal, NY. Limited availability."
        path="/nucs"
        image="/assets/nucs/nucsFrame.jpg"
      >
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "5-Frame Honeybee Nuc - Spring 2026",
          "description": "A ready-to-go 5-frame nucleus colony from Irek's Apiary in Vestal, NY. Locally adapted queen, ~5,000 bees. Available for pickup spring 2026. Serving the Binghamton, Southern Tier, and Upstate New York area.",
          "image": "https://ireksapiary.com/assets/nucs/nucsFrame.jpg",
          "brand": { "@type": "Brand", "name": "Irek's Apiary" },
          "offers": {
            "@type": "Offer",
            "price": "190.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/PreOrder",
            "url": "https://ireksapiary.com/nucs",
            "seller": { "@type": "Organization", "name": "Irek's Apiary" },
            "validFrom": "2026-01-01",
            "priceValidUntil": "2026-06-30"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a,
            }
          }))
        })}</script>
      </SEO>
      <HeroGrid>
        <ImageCol>
          <HeroImg src="/assets/nucs/nucsFrame.jpg" alt="Beekeeper inspecting a nuc frame" />
        </ImageCol>

        <PurchaseCol>
          <Tag>Spring 2026 · Local Pickup</Tag>
          <ProductName>5-Frame Honeybee Nuc</ProductName>
          <PriceMain>${NUC_PRICE}</PriceMain>
          <PriceSub>+ $50 refundable box deposit</PriceSub>
          <Description>
            A ready-to-go colony from our apiary in Vestal, NY, serving
            the Binghamton and Southern Tier area. Locally adapted queen,
            healthy brood, ~5,000 bees, and enough stores to hit the ground
            running. Whether you're starting your first hive or adding
            another, this is the way to do it.
          </Description>

          <OptionLabel>Payment</OptionLabel>
          <ToggleRow>
            <ToggleBtn $active={!payNow} onClick={() => setPayNow(false)}>
              <span>${BOX_DEPOSIT} deposit now</span>
              <small>Pay ${NUC_PRICE} at pickup</small>
            </ToggleBtn>
            <ToggleBtn $active={payNow} onClick={() => setPayNow(true)}>
              <span>${TOTAL_PER_NUC} pay in full</span>
              <small>Nothing due at pickup</small>
            </ToggleBtn>
          </ToggleRow>

          <OptionLabel>Quantity</OptionLabel>
          <QuantityRow>
            {[1, 2, 3, 4, 5].map(n => (
              <QtyBtn
                key={n}
                $active={quantity === n}
                onClick={() => setQuantity(n)}
              >
                {n}
              </QtyBtn>
            ))}
          </QuantityRow>

          <AddToCartBtn onClick={handleAddToCart}>
            Reserve {quantity > 1 ? `${quantity} Nucs` : 'Nuc'}
          </AddToCartBtn>

          <Fine>
            {payNow
              ? 'Nuc purchase is non-refundable. Return the box before Dec 31 and the $50 deposit is yours again.'
              : `$50 secures your spot. $${NUC_PRICE}${quantity > 1 ? ' per nuc' : ''} due at pickup. Return the box before Dec 31 and the deposit is yours again.`
            }
          </Fine>
        </PurchaseCol>
      </HeroGrid>

      <SpecSection>
        <SectionTitle>Inside the Box</SectionTitle>
        <SpecGrid>
          {SPECS.map(s => (
            <SpecItem key={s.label}>
              <SpecLabel>{s.label}</SpecLabel>
              <SpecValue>{s.value}</SpecValue>
            </SpecItem>
          ))}
        </SpecGrid>
      </SpecSection>

      <PhotoSection>
        <PhotoImg src="/assets/nucs/nucs2.jpg" alt="Nuc boxes ready for pickup" />
      </PhotoSection>

      <PickupSection>
        <SectionTitle>Pickup Day</SectionTitle>
        <PickupGrid>
          <PickupCard>
            <PickupLabel>When</PickupLabel>
            <PickupText>
              Late April through May. We schedule at dawn or dusk so the
              foragers are home. You'll get an email once colonies are ready.
            </PickupText>
          </PickupCard>
          <PickupCard>
            <PickupLabel>Where</PickupLabel>
            <PickupText>
              Our apiary in Vestal, NY, just outside Binghamton. Serving
              the Southern Tier and Upstate NY. We don't ship live bees.
            </PickupText>
          </PickupCard>
          <PickupCard>
            <PickupLabel>Bring</PickupLabel>
            <PickupText>
              Straps to secure the box in your car. We seal it up, you
              load and go. Transfer frames into your hive within a few days.
            </PickupText>
          </PickupCard>
        </PickupGrid>
      </PickupSection>

      <FaqSection>
        <SectionTitle>Questions</SectionTitle>
        <FaqList>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i}>
              <FaqQuestion
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                role="button"
                tabIndex={0}
              >
                <span>{item.q}</span>
                <FaqToggle>{openFaq === i ? '−' : '+'}</FaqToggle>
              </FaqQuestion>
              {openFaq === i && <FaqAnswer>{item.a}</FaqAnswer>}
            </FaqItem>
          ))}
        </FaqList>
      </FaqSection>
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
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 360px;
    padding: ${({ theme }) => theme.space.xl};
  }
`;

const HeroImg = styled.img`
  max-width: 100%;
  max-height: 520px;
  width: auto;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};

  @media (max-width: 768px) {
    max-height: 360px;
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

const PriceMain = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 500;
`;

const PriceSub = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
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

const ToggleRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const ToggleBtn = styled.button`
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
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const QtyBtn = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.brown : theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brown : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.cream : theme.colors.brown};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
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

const Fine = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-top: ${({ theme }) => theme.space.md};
  line-height: 1.5;
`;

const SpecSection = styled.section`
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

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space.lg};
  max-width: 560px;
  margin: 0 auto;
`;

const SpecItem = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.creamDark};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const SpecLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const SpecValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const PhotoSection = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['2xl']};
`;

const PhotoImg = styled.img`
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};
`;

const PickupSection = styled.section`
  background: ${({ theme }) => theme.colors.creamDark};
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const PickupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PickupCard = styled.div`
  text-align: center;
`;

const PickupLabel = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const PickupText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  opacity: 0.75;
`;

const FaqSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const FaqList = styled.div``;

const FaqItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const FaqQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.lg} 0;
  cursor: pointer;

  span {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  &:hover { opacity: 0.85; }
`;

const FaqToggle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.brownMedium};
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.space.md};
`;

const FaqAnswer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  opacity: 0.8;
  padding: 0 0 ${({ theme }) => theme.space.lg};
`;
