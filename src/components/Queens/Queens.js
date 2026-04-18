import React, { useState } from 'react';
import styled from 'styled-components';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';
import { useCart } from '../../context/CartContext';

const QUEEN_PRICE = 55;
const MIN_QTY = 1;
const MAX_QTY = 5;

const QUEEN_IMAGES = [
  '/assets/queens/queen1.jpg',
  '/assets/queens/queen2.jpg',
];

const FAQ_ITEMS = [
  {
    q: 'When can I pick up?',
    a: 'May through September. You\'ll get an email once a batch is laying and ready.',
  },
  {
    q: 'Where?',
    a: 'Our apiary in Vestal, NY, just outside Binghamton. We don\'t ship live queens.',
  },
  {
    q: 'What genetics?',
    a: 'Italian x Carniolan hybrid, open-mated to our drones. Same stock as our nucs. Color varies between queens; some lean Italian (lighter), some lean Carniolan (darker).',
  },
  {
    q: 'Do you mark queens?',
    a: 'No. Queens are sold unmarked.',
  },
  {
    q: 'What\'s the guarantee?',
    a: 'We guarantee a healthy, laying queen at handoff. Introduction is the customer\'s responsibility. Any concerns must be raised within 3 days of pickup.',
  },
];

export default function Queens() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(MIN_QTY);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const increment = () => setQuantity(q => Math.min(q + 1, MAX_QTY));
  const decrement = () => setQuantity(q => Math.max(q - 1, MIN_QTY));

  const handleAddToCart = () => {
    addToCart({
      id: 'queen',
      name: 'Mated Queen Bee',
      size: 'Mated',
      price: QUEEN_PRICE,
      image: QUEEN_IMAGES[0],
      pickup: true,
    }, quantity);
  };

  return (
    <PageWrapper announcement="2026 Queens · Local Pickup · Reserve Yours" announcementLink="/queens">
      <SEO
        title="Mated Queen Bees for Sale 2026 | Binghamton & Southern Tier, NY"
        description="Italian x Carniolan hybrid queens from Irek's Apiary in Vestal, NY. Locally raised and open-mated. $55 per queen, pickup in the Southern Tier."
        path="/queens"
        image="/assets/queens/queen1.jpg"
      >
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Mated Honeybee Queen - 2026",
          "description": "Italian x Carniolan hybrid honeybee queen from Irek's Apiary in Vestal, NY. Locally raised and open-mated to our drones. Available for pickup May through September 2026.",
          "image": "https://ireksapiary.com/assets/queens/queen1.jpg",
          "brand": { "@type": "Brand", "name": "Irek's Apiary" },
          "offers": {
            "@type": "Offer",
            "price": "55.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/PreOrder",
            "url": "https://ireksapiary.com/queens",
            "seller": { "@type": "Organization", "name": "Irek's Apiary" },
            "validFrom": "2026-01-01",
            "priceValidUntil": "2026-09-30"
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
          <MainImage
            src={QUEEN_IMAGES[activeImage]}
            alt={`Mated honeybee queen, photo ${activeImage + 1}`}
          />
          {QUEEN_IMAGES.length > 1 && (
            <ThumbRow>
              {QUEEN_IMAGES.map((src, i) => (
                <Thumb
                  key={src}
                  $active={i === activeImage}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View queen photo ${i + 1}`}
                >
                  <img src={src} alt="" />
                </Thumb>
              ))}
            </ThumbRow>
          )}
        </ImageCol>

        <PurchaseCol>
          <Tag>2026 Season · Local Pickup</Tag>
          <ProductName>Mated Queen Bee</ProductName>
          <PriceMain>${QUEEN_PRICE}</PriceMain>
          <PriceSub>Open-mated · Unmarked</PriceSub>
          <Description>
            Locally raised, locally mated. Descendants of our 14-year lineage,
            open-mated to drones from colonies that have overwintered in the
            Southern Tier for generations.
          </Description>

          <OptionLabel>Quantity</OptionLabel>
          <StepperRow>
            <StepperBtn onClick={decrement} disabled={quantity <= MIN_QTY}>−</StepperBtn>
            <StepperValue>{quantity}</StepperValue>
            <StepperBtn onClick={increment} disabled={quantity >= MAX_QTY}>+</StepperBtn>
          </StepperRow>

          <AddToCartBtn onClick={handleAddToCart}>
            Reserve {quantity > 1 ? `${quantity} Queens` : 'Your Queen'}
          </AddToCartBtn>

          <Fine>
            ${QUEEN_PRICE * quantity} due today for {quantity} {quantity > 1 ? 'queens' : 'queen'}.
            Non-refundable once the queen leaves our apiary.
          </Fine>
          <Fine>
            We guarantee a healthy, laying queen at the time of handoff.
            Introduction to your colony is the customer's responsibility.
            We recommend slow-release and a 7-day undisturbed period. Any
            concerns must be raised within 3 days of pickup.
          </Fine>
        </PurchaseCol>
      </HeroGrid>

      <StorySection>
        <SectionTitle>Our Queens</SectionTitle>
        <StoryTag>Raised here. Mated here.</StoryTag>
        <StoryProse>
          Every queen is grafted from our own breeder colonies and open-mated
          to our drones in Vestal. Each one carries the same hybrid lineage
          we've kept since 2012, with roots in stock from a beekeeper who
          kept bees in the Southern Tier for over 35 years.
        </StoryProse>
        <StoryProse>
          Our drones come from colonies that have overwintered in Upstate
          New York under local mite and weather pressure.
        </StoryProse>
      </StorySection>

      <PickupSection>
        <SectionTitle>Pickup Day</SectionTitle>
        <PickupGrid>
          <PickupCard>
            <PickupLabel>When</PickupLabel>
            <PickupText>
              May through September. We'll email you once your queen is
              laying and ready, and schedule pickup within a few days.
            </PickupText>
          </PickupCard>
          <PickupCard>
            <PickupLabel>Where</PickupLabel>
            <PickupText>
              Our apiary in Vestal, NY, just outside Binghamton. Serving
              the Southern Tier and Upstate NY. We don't ship live queens.
            </PickupText>
          </PickupCard>
          <PickupCard>
            <PickupLabel>Bring</PickupLabel>
            <PickupText>
              Queens go home in a JZ-BZ cage with a few attendants and a
              candy plug. Keep her warm, out of direct sun, and out of
              A/C during transport. Introduce within 24 to 48 hours.
            </PickupText>
          </PickupCard>
        </PickupGrid>
      </PickupSection>

      <IntroSection>
        <SectionTitle>Introducing Your Queen</SectionTitle>
        <IntroProse>
          Most queen losses happen at introduction, not handoff. Follow these
          steps.
        </IntroProse>
        <IntroList>
          <IntroItem>
            <IntroStep>01</IntroStep>
            <div>
              <IntroTitle>Confirm the old queen is gone</IntroTitle>
              <IntroText>
                Dequeen at least 24 hours before introducing. If you're not
                certain the colony is queenless, she will not be accepted.
              </IntroText>
            </div>
          </IntroItem>
          <IntroItem>
            <IntroStep>02</IntroStep>
            <div>
              <IntroTitle>Slow release</IntroTitle>
              <IntroText>
                Pull the cork on the candy end of the cage and place her
                between two frames of brood. Let the workers chew through
                the candy plug to release her over 2 to 4 days.
              </IntroText>
            </div>
          </IntroItem>
          <IntroItem>
            <IntroStep>03</IntroStep>
            <div>
              <IntroTitle>Close the hive</IntroTitle>
              <IntroText>
                Give the colony a full 7 days to accept her. Opening the
                hive early is the single biggest cause of rejection.
              </IntroText>
            </div>
          </IntroItem>
          <IntroItem>
            <IntroStep>04</IntroStep>
            <div>
              <IntroTitle>Verify eggs, not the queen</IntroTitle>
              <IntroText>
                After 7 days, look for fresh eggs and young larvae.
              </IntroText>
            </div>
          </IntroItem>
        </IntroList>
      </IntroSection>

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
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ImageCol = styled.div`
  background: ${({ theme }) => theme.colors.creamDark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space['2xl']};
  min-height: 500px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 360px;
    padding: ${({ theme }) => theme.space.xl};
  }
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 480px;
  width: auto;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.md};

  @media (max-width: 768px) {
    max-height: 340px;
  }
`;

const ThumbRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  justify-content: center;
`;

const Thumb = styled.button`
  width: 64px;
  height: 64px;
  padding: 0;
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.brown : theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};

  &:hover { opacity: 1; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
  font-weight: 600;
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
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const StepperRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const StepperBtn = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.brownLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.cream};
    border-color: ${({ theme }) => theme.colors.brown};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const StepperValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  min-width: 48px;
  text-align: center;
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

const StorySection = styled.section`
  max-width: 640px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const StoryTag = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const StoryProse = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  opacity: 0.85;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.space.lg};

  &:last-child {
    margin-bottom: 0;
  }
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

const IntroSection = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['4xl']} ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.md};
  }
`;

const IntroProse = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  opacity: 0.85;
  text-align: center;
  max-width: 560px;
  margin: 0 auto ${({ theme }) => theme.space['2xl']};
`;

const IntroList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const IntroItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.space.lg};
  align-items: start;
`;

const IntroStep = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};
  letter-spacing: 0.05em;
  padding-top: 4px;
`;

const IntroTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const IntroText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  opacity: 0.8;
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
